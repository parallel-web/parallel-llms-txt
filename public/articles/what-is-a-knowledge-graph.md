# What is a knowledge graph? How it works and how AI agents use it

What is a knowledge graph, and when is it worth building one instead of leaning on a vector store or SQL tables? This guide covers the building blocks and data models, how graphs compare with vector and relational databases, where GraphRAG stands in 2026, and how teams populate and refresh a graph with facts from the web.

A knowledge graph is a database that stores facts as a network of entities (people, companies, products, places) connected by named relationships, so software can answer questions by following those connections. Instead of rows in a table or chunks of text, the basic unit is a fact such as "Neo4j _is a_ graph database" or "Satya Nadella _is CEO of_ Microsoft."

## How a knowledge graph is built: nodes, edges, and triples

Every knowledge graph is made of three parts.

- **Nodes** (also called vertices or entities) are the things: a company, a person, a drug, a city.
- **Edges** (relationships) connect two nodes and carry a type, such as `founded`, `acquired`, or `located_in`. Edges have direction: Microsoft acquired GitHub, and the reverse is a different claim.
- **Properties** are attributes attached to nodes or edges, like a founding year or the date an acquisition closed.

Written out, a single fact is a **triple**: subject, predicate, object. `(GitHub, acquired_by, Microsoft)` is one triple. A knowledge graph is millions or billions of these, all sharing the same node for "Microsoft," which is what makes the structure useful. Ask about Microsoft and you can reach everything connected to it in one or two hops.

That shared identity matters more than the storage format. If your graph has "Microsoft," "Microsoft Corp.," and "MSFT" as three separate nodes, it can't connect the facts attached to each. Deciding that two records refer to the same real-world thing is called entity resolution, and it's the hardest part of running a knowledge graph. Our guide to [entity matching](https://parallel.ai/learn/entity-matching) covers the techniques in detail.

## Ontologies and schemas

An ontology is the vocabulary of a knowledge graph: which types of entities exist, which relationships are allowed between them, and what properties each type carries. It might say that a `Person` can be `employed_by` an `Organization`, and that `employed_by` has a `start_date`.

Ontologies range from strict to loose. Biomedical graphs often use formal ontologies with logical rules, so a reasoner can infer new facts (if every kinase is an enzyme and X is a kinase, X is an enzyme). Many product teams use a lighter schema that names the node and edge types and stops there. [Schema.org](https://schema.org/), the shared vocabulary that websites use to mark up organizations, products, events, and articles, is the most widely deployed example of a public schema.

The schema is also where most knowledge graph projects succeed or fail. Too strict, and every new data source requires a migration. Too loose, and the same relationship ends up under five names.

## RDF vs. property graphs

There are two main data models, and the choice shapes which tools you use.

**RDF (Resource Description Framework)** is the W3C standard. Every node and relationship is identified by a URI, every fact is a triple, and you query with SPARQL. RDF was designed for publishing linked data across organizations, so it's strong on shared identifiers and formal ontologies. Wikidata publishes its data as RDF, and RDF 1.2 is at the W3C [Candidate Recommendation](https://www.w3.org/TR/rdf12-concepts/) stage as of November 2026.

**Property graphs** attach key-value properties directly to nodes and edges, which makes them feel closer to application code. Neo4j popularized the model and its query language, Cypher. In April 2024 ISO published [GQL (ISO/IEC 39075:2024)](https://www.iso.org/standard/76120.html), the first international standard query language for property graphs, and Neo4j's Cypher manual says Cypher now supports [most mandatory GQL features](https://neo4j.com/docs/cypher-manual/current/appendix/gql-conformance).

You don't always have to choose. [Amazon Neptune Database](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html) supports both models on one cluster: property graphs through Apache TinkerPop Gremlin and openCypher, and RDF through SPARQL 1.1. AWS also offers Neptune Analytics, an in-memory engine for graph algorithms and vector search over graph data. Other common options include Neo4j's managed AuraDB, Stardog and GraphDB on the RDF side, and graph extensions for databases teams already run, such as PostgreSQL.

|  | RDF | Property graph |
| --- | --- | --- |
| Unit of data | Triple with URIs | Node and edge, each with properties |
| Query language | SPARQL | Cypher, openCypher, GQL, Gremlin |
| Standards body | W3C | ISO (GQL) |
| Strength | Shared identifiers, formal ontologies, data exchange | Developer ergonomics, traversal speed, application data |
| Typical tools | Wikidata, GraphDB, Stardog, Neptune | Neo4j, Neptune, Memgraph, FalkorDB |

## Google's Knowledge Graph: the canonical example

Most people have used a knowledge graph without knowing it. Google [introduced its Knowledge Graph](https://blog.google/products-and-platforms/products/search/introducing-knowledge-graph-things-not/) on May 16, 2012, under the line "things, not strings," with more than 500 million objects and 3.5 billion facts about them. The idea was that Search should understand that "Taj Mahal" can mean a monument or a musician, and show facts about the one you meant.

By 2020 Google said the graph had grown to [more than 500 billion facts about five billion entities](https://blog.google/products/search/about-knowledge-graph-and-knowledge-panels/), drawn from across the web and from open and licensed databases. It powers the knowledge panels beside search results, and it remains the clearest demonstration of what the technology does at scale: disambiguating entities, connecting facts from many sources, and answering questions directly.

## Knowledge graph vs. vector database vs. relational database

These three are often compared because all of them get pulled into AI retrieval systems. They store different things and answer different questions.

|  | Relational database | Vector database | Knowledge graph |
| --- | --- | --- | --- |
| Stores | Rows in fixed tables | Embeddings of text, images, or other data | Entities and typed relationships |
| Best question | "Sum revenue by region for Q3" | "Find passages that mean something like this" | "Which board members of X also sit on boards of X's competitors?" |
| Relationships | Foreign keys and joins | Implicit, through similarity | First-class, named, and traversable |
| Weak spot | Many-hop joins get slow and hard to write | Can't follow explicit links or count precisely | Building and maintaining it takes real work |

A relational database handles relationships through joins, which works well for a few hops across a known schema. A five-hop question across loosely related data turns into a query few people can write and fewer databases run quickly.

A vector database finds content by meaning. It's how [semantic search](https://parallel.ai/learn/semantic-search) works, and it's excellent at "find text like this." It has no notion that two chunks describe the same company, or that one company acquired another. Similarity isn't a relationship.

A knowledge graph makes relationships explicit, so multi-hop questions become traversals. The trade is upfront work: extracting entities, resolving duplicates, and keeping facts current. Many production systems use two or all three side by side: relational for transactions, vectors for fuzzy recall, and a graph for connected facts.

## GraphRAG: knowledge graphs in retrieval

[Retrieval-augmented generation](https://parallel.ai/learn/rag-retrieval-augmented-generation) usually means embedding documents, retrieving the closest chunks, and passing them to a model. It works when the answer sits in a few passages. It struggles with questions that need connections across many documents, like "what are the main themes in this archive?"

GraphRAG adds a graph to the retrieval step. Microsoft Research published its version in 2024: an LLM extracts entities and relationships from a corpus, the system clusters them into communities, and it writes summaries of each community that answer "global" questions about the whole dataset. The open-source [microsoft/graphrag](https://github.com/microsoft/graphrag) library reached v3.3.0 on October 8, 2026, and its README now describes the project as largely in maintenance mode.

The main criticism of the original approach was indexing cost, since every chunk goes through an LLM. Microsoft's successors went after that. LazyGraphRAG, announced in November 2024, defers LLM work to query time, and on November 17, 2026 Microsoft Research [introduced GraphRAG Zero](https://www.microsoft.com/en-us/research/story/the-evolution-of-graphrag-advancing-systems-and-evaluation-together/), which builds its graph from text embeddings with no LLM calls at index time and is available in Foundry IQ (Azure AI Search).

Outside Microsoft, the active open-source options include LightRAG, which pairs an LLM-extracted graph with vector search and supports incremental inserts and deletes; the official [neo4j-graphrag](https://pypi.org/project/neo4j-graphrag/) Python package, for teams whose graph already lives in Neo4j; and Zep's [Graphiti](https://github.com/getzep/graphiti), covered below.

## How AI agents use knowledge graphs

Agents put knowledge graphs to work in three main ways.

**Entity resolution.** Before an agent can reason about "Acme," it needs to know which Acme. A graph gives it a canonical node with an identifier, aliases, and attributes to match against. This is also the core of [data enrichment](https://parallel.ai/learn/data-enrichment), where you attach new facts to a known entity rather than creating a duplicate.

**Multi-hop reasoning.** Questions like "which of our suppliers share a parent company with a sanctioned entity?" require chaining facts. An agent can plan a traversal, run it as a Cypher or SPARQL query, and get an exact answer, rather than hoping the right three documents land in its context window.

**Memory.** Long-running agents need to remember what they've learned and notice when it changes. Graphiti, for example, builds what Zep calls temporal context graphs, where each fact carries a validity window. When a fact changes, the old one is marked invalid but kept, so the agent can answer both "what's true now?" and "what was true in March?" This is a specific case of [context engineering](https://parallel.ai/learn/context-engineering): deciding what structured facts an agent sees, and when.

## Building and refreshing a knowledge graph from the web

Internal data covers your own customers and products. Most graphs also need outside facts: who runs a company, what it acquired, which competitors launched what. That information lives on the open web, and it changes constantly. A graph built once and never refreshed starts drifting from reality within weeks.

A web-to-graph pipeline usually has four stages:

1. **Discover entities.** Find the companies, people, or products that belong in the graph.
2. **Extract facts.** Pull structured attributes and relationships from source pages.
3. **Resolve and merge.** Match each extracted entity to an existing node or create a new one.
4. **Monitor and refresh.** Re-check facts on a schedule and update edges when something changes, keeping the source URL on each fact.

Parallel's APIs map onto the first, second, and fourth stages. [Entity Search](https://docs.parallel.ai/findall-api/entity-search) is a synchronous people-and-company search: you describe what you want in plain language ("AI startups that raised a Series A in 2024") and get back a ranked list with a name, URL, and description for each match, in seconds. It's built for recall and speed and doesn't verify each result. When you need verification, [FindAll](https://docs.parallel.ai/findall-api/findall-quickstart) runs asynchronously, evaluates every candidate against explicit match conditions, and can add enrichment fields with citations. For pulling facts from specific pages, the [Extract API](https://docs.parallel.ai/extract/extract-quickstart) returns LLM-ready content from up to 20 URLs per request, including JavaScript-heavy pages and PDFs.

```bash
curl -X POST "https://api.parallel.ai/v1beta/findall/entity-search" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "entity_type": "companies",
    "objective": "Graph database vendors with a managed cloud offering",
    "match_limit": 50
  }'
```

Each result becomes a candidate node; the URL gives you a stable key for entity resolution and a source to extract from. As of November 2026, Entity Search costs $5 per 1,000 requests including 100 results each, and Extract costs $1 per 1,000 URLs ([pricing](https://docs.parallel.ai/getting-started/pricing)). For the refresh stage, the Monitor API runs a query on a schedule and sends a webhook with cited events when something new appears, which is a natural trigger for updating an edge. If your graph feeds a retrieval system, our guide to [building a RAG pipeline with live web data](https://parallel.ai/articles/how-to-build-a-rag-pipeline-with-live-web-data) shows how the pieces fit together.

## FAQ

### Is a knowledge graph the same as a graph database?

No. A graph database is the storage engine (Neo4j, Neptune, and so on). A knowledge graph is the data model and content: entities, relationships, and the ontology that defines them. You can store a knowledge graph in a graph database, a triple store, or even relational tables.

### Do I need a knowledge graph for RAG?

Not always. If answers sit in a few passages that read like the question, vector retrieval is simpler and cheaper. A graph earns its cost when questions require connecting facts across many documents or when you need exact answers about relationships.

### Can an LLM build a knowledge graph automatically?

LLMs are good at extracting candidate entities and relationships from text, and that's how GraphRAG and Graphiti build their graphs. The parts that still need engineering are entity resolution, keeping the schema consistent, and refreshing facts as sources change.

### What is the difference between an ontology and a knowledge graph?

The ontology is the schema: which entity types and relationships exist. The knowledge graph is the populated data that follows that schema, the actual nodes and edges.

Parallel gives agents and data pipelines web search, extraction, and entity discovery through one set of APIs. Start with up to $80 in free credits plus $5 a month with a card on file at [platform.parallel.ai](https://platform.parallel.ai), or connect an agent to the free [Parallel MCP](https://parallel.ai/mcp) server.
