# HSDB Product Deep-Dive — US Patent 12,664,142

Researched Aug 7, 2026

**Patent:** US 12,664,142 B2, "Hierarchical Script Database and Database Applications"
**Inventor:** Kyle MacLean Smith ("bestape"), Victoria BC, Canada. Music-business BBA (Belmont University, 2006) + JD; former music-industry IP lawyer; ERC author; founder of SeedTree DB, Ixian.tech, IxVenture.studio, LESA.law.
**Timeline:** Provisional filed Jan 30, 2019 ("Non-Halting Software Objects and Applications") → PCT filed Jan 28, 2020 → US grant June 23, 2026. Prosecuted by Klarquist Sparkman (patent counsel to Microsoft and Amazon, per Belmont University coverage).

---

## 1. Mechanics (plain language)

### The core idea in one paragraph

A Hierarchical Script Database (HSDB) is a database where every record is a small, human-readable script file — and those script files aren't just storage, they're *alive*. Each node in a tree contains both **data properties** (the stuff you'd normally put in a database row, e.g. a JSON key-value) and **function properties** (executable JavaScript that says what that node can *do*). The database is never "queried" in the SQL sense; instead it **reacts to events**. When an event arrives (an SMS, a phone call, a royalty report, a quiz answer), it gets routed to the right node, and that node's script *grows a new child node* containing the event's data. The tree literally builds itself out of the history of things that happened to it. The patent's stated motivation is **transparency for lay stakeholders**: because everything is plain-text script sitting in ordinary files and folders, a non-programmer (a musician, a contract party) can open the files and read both the data and the logic that operates on it.

### The environment and interpreter

- Everything runs inside an **interpreter environment** — canonically **Node.js** (standalone JavaScript interpreter), though the patent explicitly says any interpreted language works (Python, Lua, Ruby, etc.). A browser's JS engine also qualifies.
- The environment (patent FIG. 1) hosts: the tree database(s), **script modules** (per-node code+data), a **kernel** (shared functions), **application logic** (app-specific functions like "call logic" or "royalty logic"), **boot loaders**, configuration data, and optional **console interface** implemented as a REPL (read-evaluate-print loop).
- Because the interpreter executes text at runtime, **scripts can be modified while the program keeps running** — the patent's definition of "interpreter" explicitly calls this out. This is the "non-halting" property from the provisional's title: the running object never stops; it just keeps absorbing new script.

### Parent/child scripts and the kernel

- A **parent node** is an event handler. Its script receives an event carrying a data item, formats the item (typically as JSON), calls a **constructor** to instantiate a **child node** holding that data, then hands the parent and child handles to the **kernel**.
- The **kernel** is the small set of functions common to all nodes: assign the child a **namespace address**, write link metadata into both parent and child, save the child's script files. The patent's example kernel is two functions with alchemical names:
  - **`syn()`** ("synthesis") — constructs one or more child nodes from a parent and updates the parent's key-values (FIGS. 13A-13B).
  - **`tie()`** ("linking") — stamps metadata into parent and child: timestamps, the child's address, the parent's scope, so the two are bidirectionally findable (FIGS. 14A-14B).
- A parent's `makeChild()` function property calls `syn()`/`tie()` plus Node.js's `fs.writeFile()` to persist. Crucially, **the parent's function properties don't change when children are added — only its data properties (child count, child links) get updated.** Code stays stable; data accretes.

### Event routing

- Routing uses stock Node.js machinery: **event listeners registered to Node.js's `EventEmitter`**, optionally cascaded. Example (communication appliance): a first router matches the destination phone number and forwards to the right tree; a **routing node inside the tree** then matches the communication mode (voice/SMS/fax/email) or event type (insert vs. query) and forwards to the specific handler node.
- Two broad event classes: **mutation events** (grow the tree) and **query events** (read the tree). Events can also be internal (clock ticks, low-storage monitors), cascaded (one event triggers another — an entire tree can be generated as a cascade from a single seed event), or even **audio** (routed through external speech-to-text/AI classification).

### How queries work

- A query is just another event, routed to a **query-handler node** in the tree. Example from the patent: typing `User1.Find(Call, 'John')` at the console REPL routes to Tree-1's query node, which invokes a `Find()` function from query logic to **traverse the call subtree** and return matches. Queries can optionally be **logged as child nodes themselves** (result + timestamp), so the audit trail includes reads, not just writes.

### Namespace addressing — the "DNS for data" trick

- Every node has an address of the form `Root.Parent.#N` — e.g. the third call ever received is `Tree-1.Call_Event_Handler.#3`. Sequential ordinals (`#1, #2, #3…`) distinguish siblings; **scope prefixes** (ancestor addresses) disambiguate identically named nodes in different trees. The address's field count equals the node's depth.
- The patent explicitly proposes a **DNS extension**: a fully-qualified node address like `Root.L2.L3.SongTitle` can resolve to a URL (e.g. one that plays the song), the way DNS resolves domain names to IPs.

### Files and directories mirror the tree

- Each node's script lives in text files inside a **directory whose path mirrors the tree path**: the quiz example stores a child at `./rootQuiz/parent/child_1/`, with data properties in a timestamp-named **JSON file** (`2020-01-21T19-56-13.195Z.json` holding the question/answer pair plus infrastructure metadata: filesystem address, creation time, `#1` relative address, `rootQuiz.parent` scope) and function properties in a sibling **JavaScript file** (`isAnswerCorrect()`, `getParent()`). Siblings share a directory level; the filesystem *is* a readable rendering of the database.
- Binary payloads (e.g. a voicemail `.mp3`) live in separate files with the child script holding a link.

### Persistence and boot loaders

- Persistence is simply the script files on disk; the tree can be **saved, restored, and survive power cycles**, or be deliberately transient. A **boot loader** (script or binary, driven by configuration data, invoked from the console) constructs the root node plus the permanent skeleton — routing nodes, event handlers, query handlers, scope-defining nodes — after which events grow everything else. One environment can run multiple boot loaders / multiple independent trees. A **reset event** can delete a tree and re-boot it.
- **Purging:** a console command like `purge Jan 1, 2019` traverses and deletes old nodes (permanent nodes are flagged do-not-delete); nodes can also self-monitor child counts and trigger their own purges; the patent even suggests **logging changes with an external version control system, i.e. Git** — an explicit acknowledgment that git is complementary infrastructure, not the invention itself.

### The three worked examples

1. **Communication appliance** (FIGS. 7-9): A Twilio-style edge device holds phone numbers/addresses. Tree-1 organizes one *user's* communications (router node → call handler and email handler → child nodes 941A-C per incoming call, 943A-B per email). Tree-2 organizes one *phone number's* traffic (voice/SMS/fax handlers). Handlers invoke shared application logic (call logic, SMS logic). A query node answers things like "find the last call from Joe," "total international minutes," "list texts from the last 3 days." This is the demo he actually built (see §2).
2. **Music database / smart document** (FIGS. 10-12): One root, three subtrees — (a) the **licensing contract text** as a hierarchy of sections/subsections, with **definitions and external references as child nodes of the clauses that use them**; (b) the **song catalog** as child nodes with industry-standard metadata; (c) a **write-only transaction log**. The killer sequence: a reporting entity notifies the tree "song X played 345 times" → the event handler logs it as a child node **and, per the contract's own terms, automatically triggers payment events at a linked bank** — debit the station's account, initiate royalty payments to publisher/performer/songwriter. Contract text trees can be locked when parties agree and unlocked to amend; the same pattern is claimed for health records, securities agreements, and product catalogs. Documents can link to other document-trees, statutes, and regulations, with cross-tree queries following those links.
3. **Educational quiz** (FIGS. 15-16, the actual script listings): parent node holds a question; each user answer spawns a timestamped child holding the Q/A pair; the child's own script includes `isAnswerCorrect()`. This is the smallest end-to-end illustration of the file layout described above.

---

## 2. What actually exists (code and demos)

**Bottom line: the kernel is real but proprietary and unpublished. Public evidence of working software = video demos + one open-source app built *with* (but shipped *without*) the kernel + one NFT-hosted interactive runtime object. There is no public repo you can `npm install`.**

| Artifact | What it is | Status | URL |
|---|---|---|---|
| **demoplaylist.seedtreedb.com** | Redirects to a YouTube playlist "SeedTreeDB demo" | Live redirect; videos are the primary demo evidence | http://demoplaylist.seedtreedb.com → [YouTube playlist PLL0gyjXno6eihH_BNd5rtpglSyJnsgk5P](https://www.youtube.com/playlist?list=PLL0gyjXno6eihH_BNd5rtpglSyJnsgk5P) |
| **"2020-PAGER" demo video** | Programmable SMS pager: Twilio webhook → Raspberry Pi with e-ink display → running HSDB. Video shows an app "that retains its Hierarchical Script Database kernel & structure during runtime" | Video only; matches the patent's communication-appliance example almost exactly | https://www.youtube.com/watch?v=IaNc1jQLnX4 |
| **seedtreedb.com** | Marketing site with 7 embedded screen-capture demos of a live `x` tree-app: schema-validated inputs creating `x.tool.example.$1, $2…` child leaves, address lookups, metadata-header (`$0.show`) toggles, constructor inspection, and the Twilio SMS webhook (`x.twil.chat`) routing a text message into `x.tool.example` as a normal input | Live site; describes proprietary "kernel-module"; promises "sliding scale subscriber Git repositories… as soon as possible" — **which never publicly opened** | https://seedtreedb.com |
| **github.com/bestape/alchemy** | Open-source SVG math-art generator (32★, his most popular repo). README states he built `app.js` **using** the HSDB kernel as scaffolding, then **"removed the kernel as if it was a loom… I built a Hierarchical Script Database, then I threw out the database part and published the hierarchical script end product."** | Runnable code, but the kernel itself was stripped before publication | https://github.com/bestape/alchemy |
| **"uxNFT" SeedTree DOM object** | An NFT-hosted webpage (via OpenSea/IxVenture) containing a live SeedTree runtime object — "inspect and run `x` on console to interact with the SeedTree object" | Actually runnable in a browser console; the only publicly *touchable* SeedTree instance found | https://ixventure.studio/projects/this/ |
| **github.com/bestape (24 public repos)** | Full list checked via GitHub API. **No repo contains the HSDB kernel.** `alchemy` (kernel removed), `neowise`/`squareRootIntegers` (math), `besta.pe`/`cheerbot.org` (personal sites), `.0.sh` (dotfiles, 2014), various Ethereum forks (Aave, OpenZeppelin, ERCs) | Kernel absent from all public code | https://github.com/bestape?tab=repositories |
| **ERC-7827** | "JSON Contract with Value Version Control" — an Ethereum standard he co-authored (as @bestape / lex-clinic): a smart contract managing a JSON object on-chain with per-key version history (`json()`, `version(key)`, `write(keys, values, replace)`). Merged to ethereum/ERCs Nov 25, 2025 | Accepted draft standard; the on-chain philosophical sibling of HSDB (versioned, transparent JSON with behavior) | https://eips.ethereum.org/EIPS/eip-7827 |
| **bestape/memory + bestape/gem ("MetaGit")** | His 2025-26 work: "MetaGit Memory," a "Living Filesystem" for AI-agent swarms where nested Git repos serve as persistent, version-controlled agent memory ("digital DNA"), with `todo.md` files as machine-readable continuity bridges and the `json/` directory treated as ERC-7827-style "JSON smart contracts." Grew out of EthGlobal Buenos Aires (Nov 2025) and SensAI San Francisco (Dec 2025) hackathons | Public repos with docs/schemas/Python tooling; this is him **repositioning the HSDB philosophy directly into the AI-agent-memory space** | https://github.com/bestape/memory, https://github.com/bestape/gem |

**Corroborating the tech is real:** the seedtreedb.com demo narration precisely matches the patent's mechanics (numbered `$#` child leaves = the patent's `#N` sequential namespace; `$0` metadata header = the patent's `$0` infrastructure data property in FIG. 15/16; the Twilio webhook = claim 4-5's communication appliance). The demos, the patent script listings (timestamped Jan 2020), and the site all describe one coherent implementation. What does **not** exist publicly: an installable package, source code of `syn()`/`tie()`, benchmarks, third-party users, or documentation beyond the patent and the videos.

---

## 3. Honest technical assessment

### Genuinely novel / differentiated

1. **Data + logic co-located in the same human-readable node, at record granularity.** Stored procedures (SQL) put logic in the database but centrally and opaquely; document stores hold data without behavior; OOP co-locates them but in compiled, non-inspectable form. HSDB makes *each record* a readable script that carries its own behavior — and the on-disk form and runtime form mirror each other.
2. **Self-growing event trees as the storage model.** The write path *is* the event handler: schema (the parent's constructor), audit log (the ordinal children), and data all fall out of one mechanism. Insert-order ordinals + scoped namespace addresses give every datum a permanent, human-speakable address (`Tree-1.Call_Event_Handler.#3`).
3. **Lay-stakeholder transparency as a design axiom.** Uniquely credible given the inventor's background: a musician/lawyer wanting royalty contracts whose data *and* logic an artist can read in a text editor. The smart-document example (contract clause trees that log performances and auto-trigger royalty payments) is a real, underserved problem — "Ricardian contracts" without a blockchain.
4. **Priority date January 2019.** Filed years before the 2024-26 wave of file-first, plain-text, agent-legible data stores. The claims (script nodes + kernel linking + event-driven growth + query-by-script, in an interpreter) were granted, i.e. examined against prior art. A patent covering "records as executable script files organized as an event-grown tree" is potentially relevant to the AI-agent-memory category — and the inventor is *already* building in that category (MetaGit).
5. **Runtime self-modification ("non-halting").** Because the interpreter executes text, the database can rewrite its own scripts while running — the program and its persistent state are the same substance.

### Expected objections (and honest weight)

1. **Executing data as code — eval-class risk.** This is the big one. Every record insertion writes an executable file; any injection into node content becomes arbitrary code execution on next load. The patent's only security story is encryption-for-privacy and "transparency deters tampering." Mitigations exist (sandboxed interpreters, keeping data in pure JSON and functions in vetted templates — which the quiz example actually does), but a security reviewer will lead with this. *Weight: serious; must be answered architecturally, not rhetorically.*
2. **Performance and scale.** Node.js is single-threaded per event loop; one file (or two) per record means filesystem-bound writes and traversal-based queries with no indexes. The patent itself concedes the target is "**small to medium size**" databases and suggests locks/blocking waits for concurrency — i.e. it forfeits the concurrency benefits of the runtime it's built on. *Weight: real but honest — it's positioned as SQLite-class, not Postgres-class.*
3. **Schema drift and governance.** Every node can carry its own functions; nothing enforces consistency across millions of self-describing nodes. The demos show per-branch schemas with feedback on violations, which helps, but long-lived HSDBs risk becoming archaeology sites of mixed conventions. *Weight: moderate; the counterargument is that the tree address system localizes drift.*
4. **"Isn't this just files + git?"** Partially fair — the patent even recommends git for change logging. The differentiators are the live event loop (files that *react*), kernel-enforced parent/child metadata, and addressable query semantics. But a skeptic can approximate much of it with a directory of JSON + a Node watcher in a weekend; the defense is the coherent kernel grammar and the patent itself.
5. **Adoption/ecosystem risk.** Proprietary kernel, no public code, no known customers after ~6 years, one-person project. The patent is granted, but a patent on a paradigm nobody can try is hard to license. The most commercially interesting motion visible today is his pivot of the same ideas into open AI-agent-memory tooling (MetaGit) plus the Ethereum standard (ERC-7827) — those give the HSDB story living, third-party-verifiable anchors.

---

## 4. Comparisons vs. the four alternatives

| | **git + plain files** | **Event sourcing / CQRS** | **SQLite / JSON stores** | **File-first AI-agent memory (2025-26: agent-memory, MemoFS, fslite, MetaGit)** |
|---|---|---|---|---|
| What it shares with HSDB | Human-readable text on disk; history | Append-only events as source of truth; state derived from event history | Small-scale, embedded, low-ops | Plain-text, hierarchical, agent/human co-readable stores |
| What HSDB adds | Files are *live*: they route events, spawn children, execute queries; kernel-maintained parent/child metadata; addressable namespace | No separate projection layer: the tree *is* both the log and the queryable state; readable by non-engineers (no replay machinery); logic travels with each record | Records carry their own behavior; no schema migration (tree grows); every datum has a permanent human-speakable address; intrinsic audit trail | Priority date Jan 2019 — HSDB anticipated the pattern; adds an executable kernel and event loop on top of passive memory files; inventor is actively building in this space (bestape/memory, bestape/gem) |
| What HSDB loses | git's merge/branch/distribution model; massive tooling ecosystem | Mature frameworks, replayability guarantees, horizontal scale | Indexes, ACID transactions, SQL ecosystem, proven perf | Those tools are free/open and shipping; HSDB kernel is proprietary and unreleased |
| Verdict | HSDB ≈ "files that run themselves"; git is complementary (patent says so) | HSDB ≈ event sourcing for people who will never write a projection | HSDB trades query power for transparency + behavior; explicitly same size class | Closest strategic fit; the pitch is "the patented kernel under the file-first memory movement" |

---

## 5. Analogies & mental models (for smart non-engineers)

1. **A family tree that writes itself.** Every time something happens — a call, a payment, a quiz answer — a new descendant is born under the right ancestor, with the event's details written on its birth certificate. To know the history, you read the tree; the tree *is* the history.
2. **A filing cabinet where every folder is a tiny employee.** Normal databases are cabinets; a clerk (the app) does all the work. In HSDB each folder knows how to accept new documents, file them in sub-folders, and answer questions about its own contents. Fire the clerk; the cabinet runs itself.
3. **A contract that is also its own accountant.** The music example literally: the license agreement is stored as a tree of clauses, and when a radio station reports "we played your song 345 times," the contract logs it *and cuts the royalty checks itself*, following its own terms. A smart contract without a blockchain — readable by the artist in plain text.
4. **Street addresses for every fact.** Every piece of data gets a permanent address like `Tree-1.CallHandler.#3` ("the 3rd call ever received"), the way `mail.google.com` names a machine. You never ask "SELECT WHERE…"; you just go to the address. (The patent proposes extending actual DNS this way.)
5. **The recipe card kept in the same box as the ingredients.** Databases usually keep data (ingredients) in one system and logic (recipes) in another, and only the chef can read the recipes. HSDB staples the recipe to each ingredient, in plain language, so anyone opening the box sees both *what's there* and *what happens to it*.
6. **A tree, literally (the founder's own metaphor — "SeedTree").** You plant a seed (boot loader + config), which grows a trunk and permanent branches (routers, handlers). Every event is sunlight: it makes a new leaf grow at exactly the right branch. Pruning (purge) removes old leaves; the trunk is marked "permanent" and can't be cut.
7. **Ship's log vs. spreadsheet.** A spreadsheet shows only current state — history is overwritten. HSDB is a captain's log where every entry is appended in order, timestamped, and impossible to quietly alter — except the log entries can also *act* (an entry noting "storm damage" can itself file the insurance claim).
8. **Glass-box vs. black-box.** SQL/NoSQL are black boxes: data goes in, answers come out, and you trust the engineers. HSDB is a glass box: open any folder on disk and read, in near-English text, both the record and the rules that govern it. That's the pitch to lawyers, artists, and auditors — the patent's Background is explicitly an attack on the "trust me!" posture of database vendors.
9. **Scaffolding you can leave up or take down** (from his own alchemy README): he built an app using the kernel as a loom/scaffold, then removed it and shipped just the woven product — or you can leave the kernel in, and the app keeps its self-growing database nature at runtime. HSDB is both a construction method and a runtime.

---

## 6. Key quotes and facts with sources

**From the patent (US 12,664,142 B2; full text on file):**

- *"The nodes can be active, and not merely passive receptacles for data. Co-location of functions and data enhances the self-explanatory nature of the database."* (Detailed Description, Introduction)
- *"…other stakeholders (e.g. developers) may be reluctant to disclose requisite detail, preferring to adopt a 'trust me!' posture."* (Background — the transparency thesis)
- *"A tree database according to the disclosed technologies can grow without bound, limited only by the available hardware resources."* (Introduction)
- *"The disclosed technologies can benefit a wide range of database applications, particularly those of small to medium size."* (Introduction — the honest scale claim)
- *"…in a Node.js environment, multiple event listeners can be registered to Node.js' EventEmitter. Event listeners can be cascaded."* (Communication appliance, event routing)
- *"…the function makeChild( ) can use the kernel functions syn( ) and tie( )… as well as fs.writeFile( )…"* (FIG. 16 discussion — the actual kernel API surface)
- *"…upon notification from a reporting entity that a particular song has been played 345 times… royalty payments can automatically be initiated to rights holders…"* (Events Associated with a Document)
- *"…changes to a document or file directory can be logged by an event handler node using an external version control system (e.g. Git)."* (Write-Only and Modifiable Databases)
- *"The disclosed technologies are suitable for implementation on a single-board computer as a teaching tool."* (Introduction — matches the Raspberry Pi demo)
- Priority: US Provisional 62/798,801, *"Non-Halting Software Objects and Applications,"* filed **Jan 30, 2019**; PCT/US2020/015456 filed Jan 28, 2020; granted **June 23, 2026**.

**From the inventor's public materials:**

- *"I built a Hierarchical Script Database, then I threw out the database part and published the hierarchical script end product."* — [alchemy README](https://github.com/bestape/alchemy) (explains why no public kernel exists)
- *"SeedTree DB scripts are JavaScript Object Notation files/modules with working Function Objects; JSON document stores are JavaScript Object Notation files without Function Objects."* — [seedtreedb.com](https://seedtreedb.com)
- *"As soon as possible, we'll open up sliding scale subscriber Git repositories…"* — [seedtreedb.com](https://seedtreedb.com) (still unfulfilled)
- Motto: *"Automation literacy for all peoples."* — [seedtreedb.com](https://seedtreedb.com)
- Founder profile / LinkedIn: SeedTreeDB founded May 2020; *"a globally searchable tree-namespace environment that database-records function outputs"* — [linkedin.com/in/bestape](https://linkedin.com/in/bestape)
- Filed via Klarquist Sparkman; Belmont music-business alumnus — [Belmont University news](https://news.belmont.edu/alumnus-kyle-smith-launches-dynamic-database-programming-business/)
- Demo playlist: [demoplaylist.seedtreedb.com](http://demoplaylist.seedtreedb.com) → [YouTube "SeedTreeDB demo"](https://www.youtube.com/playlist?list=PLL0gyjXno6eihH_BNd5rtpglSyJnsgk5P); pager demo video: [IaNc1jQLnX4](https://www.youtube.com/watch?v=IaNc1jQLnX4)
- Interactive SeedTree NFT object (*"inspect and run 'x' on console"*): [ixventure.studio/projects/this](https://ixventure.studio/projects/this/)
- ERC-7827 (co-author, merged into ethereum/ERCs Nov 25, 2025): [eips.ethereum.org/EIPS/eip-7827](https://eips.ethereum.org/EIPS/eip-7827)
- Current AI-agent-memory work (MetaGit "Living Filesystem," nested-git agent memory, WeDo/todo.md continuity schema): [github.com/bestape/memory](https://github.com/bestape/memory), [github.com/bestape/gem](https://github.com/bestape/gem)
- Personal hub: [besta.pe](https://besta.pe) — current ventures Ixian.tech, IxVenture.studio, Make.diy, LESA.law, RicardiaOS (Ricardian contracts with Hats Protocol)

**One caution for the pitch:** the strongest single risk is the gap between a granted, well-drafted patent (real) and shipped, adoptable software (videos + a stripped-kernel repo). The strongest single opportunity is that the 2019 priority date and the "executable, transparent, file-native, event-grown records" claims land squarely under the now-booming file-first AI-agent-memory category — where the inventor is already personally active, and where the patent could anchor either a product or a licensing position.
