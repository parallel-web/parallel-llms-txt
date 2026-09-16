# The best ClawHub skills for OpenClaw in 2026

ClawHub hosts over 67,000 skills for OpenClaw, which is exactly why you need a short list and a vetting habit. The skills worth installing in 2026, the web-research stack, and the security rules the ClawHavoc attack taught everyone.

ClawHub (`hub.openclaw.ai`) hosts over 67,000 [skills](https://parallel.ai/articles/what-are-agent-skills) for OpenClaw: plain-text `SKILL.md` packages that teach your agent new capabilities, installed with a single `clawhub install` command. A registry that large is a blessing and an attack surface, so this guide does two jobs: the short list of skills that have earned their install counts, and the vetting habits that keep a skill registry from becoming your breach.

Disclosure: Parallel publishes four skills on ClawHub, they're in this list, and we mark them clearly so you can weigh our bias.

## The community heavyweights

### 1. Self-improving agent

The most-installed skill on ClawHub by a wide margin (hundreds of thousands of installs), and its several popular variants chase the same idea: the agent logs its own findings, critiques its output, and refines how it works over weeks of use. If you run OpenClaw continuously on recurring workflows, some form of self-improvement loop is usually the first install.

### 2. Skill Vetter

Security-first vetting for skills themselves: run it before installing anything else, and it reviews a candidate skill's source for suspicious permissions and behavior. That a vetting skill sits near the top of the install charts tells you the community learned its lesson (more on that below). Meta, and genuinely useful.

### 3. Gog (Google Workspace)

One install covers Gmail, Calendar, Drive, Docs, Sheets, and Contacts through a Google Workspace CLI. For a personal agent, this is the single highest-leverage productivity skill: summarize unread email, find the document, schedule the meeting, end to end. Notice the design: it's a skill wrapping a CLI, the pattern that dominates ClawHub's top charts.

### 4. Wacli (WhatsApp)

A CLI-based WhatsApp integration: send messages, sync and search conversation history, draft replies through plain conversation with your agent. If your work communication runs on WhatsApp, this one earns its slot immediately.

### 5. GitHub

Drives the `gh` CLI for PR descriptions, issue triage, and build monitoring. Worth noting against the [MCP-versus-skills question](https://parallel.ai/articles/mcp-vs-skills-vs-clis): for GitHub specifically, the skill-wrapping-gh approach is the one Hermes's maintainers also chose over the official MCP server, largely for context-cost reasons.

## The web research stack (ours)

Parallel publishes [four official skills](https://docs.parallel.ai/integrations/clawhub) that give OpenClaw web capabilities through the Parallel CLI: `parallel-search` (web search with domain and date filtering), `parallel-extract` (read any URL as clean markdown), `parallel-deep-research` (multi-source research reports with configurable depth), and `parallel-enrichment` (bulk data enrichment over lists). Install the ones you need:

```bash
# prerequisite: the Parallel CLI
pipx install "parallel-web-tools[cli]" && pipx ensurepath
parallel-cli login

# then the skills
clawhub install parallel-search
clawhub install parallel-extract
clawhub install parallel-deep-research
clawhub install parallel-enrichment
```

Two disclosures in the spirit of the vetting section below. First, ClawHub has no verified-publisher system, so our skills are published under the @NormallyGaussian account; the docs link above is the authoritative pointer to the real ones. Second, the skills wrap documented CLI commands, so you can run any of them yourself to see exactly what the skill does, which is the inspectability standard we'd suggest holding every skill to. Search and extract usage fits in the [free tier and the $5 monthly credit](https://parallel.ai/pricing); deep research and enrichment draw the credit down faster.

## The security section, because ClawHavoc happened

In early 2026, researchers uncovered a coordinated campaign, ClawHavoc, that published typosquatted skills on ClawHub: near-misspellings of popular names that installed backdoors stealing SSH keys, API tokens, and browser session cookies. ClawHub removed over 2,400 suspicious skills and now checks every published skill against VirusTotal. Better, but not airtight, so keep three habits:

1. Read the `SKILL.md` before installing; it's plain text, and suspicious commands are visible. 
2. Check the skill's scan report on its ClawHub page, and apply the 100/3 rule: prefer skills with 100+ installs and 3+ months of history.
3. Verify exact names before installing; typosquats are the whole attack. When a vendor documents its official skill names, as we do, install from those docs rather than search results.

## The picks side by side

| Skill | What it does | Needs | Cost |
| --- | --- | --- | --- |
| Self-improving agent | Agent refines itself over time | Nothing extra | Free |
| Skill Vetter | Security review of other skills | Nothing extra | Free |
| Gog | Gmail, Calendar, Drive, Docs, Sheets | Google auth | Free |
| Wacli | WhatsApp send, sync, search | WhatsApp link | Free |
| GitHub | PRs, issues, CI via gh | gh sign-in | Free |
| parallel-search / extract | Web search + page reading | Parallel CLI + login | Free tier |
| parallel-deep-research / enrichment | Reports + bulk enrichment | Parallel CLI + login | $5/month credit, then per request |

## Frequently asked questions

**Skills or MCP servers for OpenClaw?** Both have a place: skills for local, CLI-shaped capabilities (everything in this list), MCP for hosted OAuth services. Our [OpenClaw MCP guide](https://parallel.ai/articles/best-mcp-servers-for-openclaw) covers the other half.

**Do I need any skill for web search?** For basic search, no: OpenClaw ships free Parallel-powered web search by default. The `parallel-search` and `parallel-extract` skills add domain/date filtering, explicit URL reading, and structured JSON output; deep-research and enrichment add capabilities the default doesn't have at all.

**How many skills is too many?** Skills are cheaper than MCP servers (metadata only until used), but each one is also trusted code-adjacent text. Install what you use, uninstall what you don't, and re-vet after major updates.

## Start with two

Install Skill Vetter first, then let it vet everything else you add, starting with whichever skill matches your daily grind: Gog for Google-centric work, `parallel-search` and `parallel-extract` for research-heavy work. Read each `SKILL.md` as you go; at one page each, there's no excuse not to.
