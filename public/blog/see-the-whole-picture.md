# See the whole picture: A brand campaign built with Parallel

For our first out-of-home campaign, we used Parallel's own research APIs to build six collages, each grounded in a real Task API run with part of the response inside the artwork.

For our first major out-of-home campaign at Parallel, we wanted to do more than just “run ads.” The sea of “Your AI needs _this_” and “AGENTS” across billboards and buses felt deeply uninspiring for a moment with so much possibility. So we took a step back and asked: how can we build something beautiful?

What followed was a whole lot of references and iteration. The best part: we used Parallel’s own APIs to build the campaign. Each of the six compositions is grounded in a real research run, with part of the API response sitting inside the artwork.

At Parallel, we build web search APIs for AI agents. For our campaign, “See the whole picture,” we wanted to make the work of finding and connecting information visible.

![A See the whole picture collage on a digital billboard in New York City](https://cdn.sanity.io/images/5hzduz3y/production/344416dd5994af785725952e8ad02f33428513a5-1672x941.jpg)

From a distance, you see a mountain, a building, a living system. Up close, you find photographs, maps, documents, and research that open each one into a larger story. The pieces come from different times, places, and scales. Together, they show you something no single image could.

It’s a visual metaphor for what we build at Parallel: web search that brings together the context you need to see the whole picture.

![Grid of the six campaign compositions: a mountain, a classical building, a road, a globe with butterflies, a plant, and a bullet train](https://cdn.sanity.io/images/5hzduz3y/production/29204c569e6649ed54899df9577fc20778b13e8f-3840x2160.jpg)

## Finding the story

An AI model can describe a fragment of the world with total confidence, even when it's missing the source or observation that would change its answer. Parallel connects it to the live web to find that missing context.

We were drawn to hand-made collages, particularly David Hockney’s Joiners, which bring overlapping photographs into one scene. Each photograph holds a particular viewpoint and moment in time. Together, they give you a richer sense of the place, with the edges and overlaps showing how the picture was made.

![David Hockney's photographic joiner collage My Mother Sleeping, Los Angeles, 1982](https://cdn.sanity.io/images/5hzduz3y/production/b1b8332d9f5bb5b24e30a7513355df4c102b6506-3198x3199.jpg)

Our subjects needed a strong silhouette and enough depth to reward a closer look. As the compositions developed, we kept coming back to the meaning between the layers. An image might fit beautifully into the shape, but it also needed a reason to belong in the story.

So we turned to our [Task API](https://parallel.ai/products/task), built for web research. We wrote a research brief for each subject. Parallel searched the web and returned a summary and key facts in structured JSON, with links to the sources behind them.

Those outputs became part of the creative development. We'd follow a source, sharpen the story, and return to the composition with a better sense of what belonged there. The research gave us something specific to design around.

## Measuring Everest

![Measuring Everest composition: photographs, a radar image, tents, and a boundary map layered into the silhouette of a peak](https://cdn.sanity.io/images/5hzduz3y/production/e2bd777a1e3781d35ce212b1a6302a2c4359aba1-1920x1080.jpg)

For Everest, we asked Parallel to trace how people had measured the mountain over time. The [research](https://platform.parallel.ai/shared/deep-research/7f0c8485-c9fe-40c5-9598-258b3df20919) took us back to surveyors working more than a hundred miles away, calculating the height of a summit they couldn’t reach.

Later teams carried radar onto the summit to map the rock beneath the snow. In one survey, the highest point in the snow wasn’t even directly above the highest rock. A photograph of the peak couldn’t tell you that.

Those connections gave the pieces a reason to belong together. The photographs put rock and snow side by side. The radar image introduces remote observation, while the tents bring in the people and fieldwork behind the measurements. The boundary map records both the terrain and the line between Nepal and China, the two countries that jointly announced Everest’s height in 2020. Inside the orange browser window, the API response carries the research connecting it all.

A photograph freezes the mountain in a moment. A measurement carries its own moment too: the snow that was there, the instruments surveyors used, the surface they chose to measure. To understand the mountain now, we need those details and the observations that came after. That is the story we wanted the pieces to tell together.

## Six scenes, six research questions

Each subject gave us a different silhouette to build and a different research question to follow.

1/ **Measuring Everest** builds a peak from photographs, maps, and fieldwork imagery. The research follows generations of surveyors trying to answer one deceptively simple question: how tall is this mountain? Each layer offers a different way to measure and understand the same place. [Research report.](https://platform.parallel.ai/shared/deep-research/7f0c8485-c9fe-40c5-9598-258b3df20919)

2/ **Invisible foundations** aligns the Parthenon and the U.S. Supreme Court through their columns and triangular rooflines. The research asks how ancient temple forms became a language of civic authority, passed down through architects’ books and drawings. Inside the courtroom, a similar inheritance continues: new judgments build on earlier ones. [Research report.](https://platform.parallel.ai/shared/deep-research/2d26f44c-3dca-4df4-bf18-448d2a91f435)

3/ **Across Skeiðarársandur** follows Iceland's Ring Road through glacial floods and shifting rivers. Maps, surveys, and road imagery form a route across the page. The research asks how you keep a road open when the landscape keeps changing: the river can move after you've drawn the map. [Research report.](https://platform.parallel.ai/shared/deep-research/1f115731-1b77-48ef-a384-64f191309df2)

4/ **Assembling a migration** pairs a globe with butterflies and a branching migration diagram. Where do eastern monarchs go each winter? The research follows numbered wing tags, volunteer sightings, and fieldwork in Mexico to piece together a journey carried across generations. [Research report.](https://platform.parallel.ai/shared/deep-research/a691e31b-d78f-441b-9d8f-38e6e1cfc177)

5/ **Hidden networks** builds a plant from leaf veins, branches, roots, and fungi. Their branching forms lead underground, where fungal threads can connect different trees. But what actually travels between them? The research follows carbon tracers and fungal DNA to examine how these connections work, and whether they help neighboring trees. [Research report.](https://platform.parallel.ai/shared/deep-research/93068dec-05fe-426f-8726-6de6ce300c52)

6/ **The Shinkansen lineage** stretches railway imagery into one continuous train. A paper ticket sits alongside locomotives, a control room, and a modern Shinkansen bullet train, bringing some of the everyday systems behind its speed into view. The research follows the shared time, signaling, and coordination that make it possible. [Research report.](https://platform.parallel.ai/shared/deep-research/4ad119d0-3f8d-4d11-8518-50af7aed4789)

Across all six, we wanted the human and machine expressions of Parallel to sit together. Paper, photography, and handwritten marginalia carry the human layer. The orange browser windows contain the original Task API responses, with findings linked to their sources.

Slight angles, visible paper edges, and overlaps make the pieces feel handled, like sheets laid out on a light table. In motion, the fragments arrive as though someone were assembling them by hand.

## Opening the archive

A lot of this detail is hard to experience on a passing bus or a station screen. We built [Parallel Archives](https://archives.parallel.ai/) so people could spend time with each composition and follow the research behind it.

Within the Archives, you can move among the original artifacts, see how they assemble into the compositions, and open individual pieces to explore their connections and sources. We carried the paper treatment into the site and spent time on the feel of moving through it, from the panning motion to the way the pieces settle into place.

Each story includes an expanded Task API research report, the exact brief that produced it, and the full JSON output. For builders, the request and result are right there to inspect. You can follow the research behind the artwork, then open the API Playground and try a brief of your own.

You can also ask a follow-up through “Ask Parallel.” The [Search API](https://parallel.ai/products/search) retrieves fresh web evidence, and a model reads it alongside the archive context to compose a cited answer. It gives you another way to try Parallel, through whatever the story made you curious about.

## The whole picture

We started this campaign wanting to make something striking, something beautiful. The more we researched our subjects, the clearer the compositions became.

What I loved most about this project was finding a new way to use our search & research APIs. The same APIs that power millions of agent searches every day became part of our creative process: finding connections when we needed to go wide, and throughlines when we needed to tighten the story.

Everything Parallel returns is grounded in its sources. That grounding matters for trust: we could see the evidence behind an answer, check the facts, and know what we were building on.

We came away with work that carries the research all the way through: the methodology, the evidence, the citations. Behind each map, photograph, and field note is someone else’s work. We wanted the campaign to show our appreciation for that accumulated knowledge, and invite more people to explore it.

That is the spirit of research on the web, and the way we love to build at Parallel.

“See the whole picture” is rolling out across New York, the San Francisco Bay Area, and London this fall and winter.

Explore [archives.parallel.ai](https://archives.parallel.ai/). Pick a story, follow a source, and try a question of your own.

![See the whole picture campaign poster in a New York City subway station](https://cdn.sanity.io/images/5hzduz3y/production/1b1fca887cb606472b9d194a86a80805216db577-1093x1439.jpg)

The campaign visuals were developed in collaboration with Play Studio. Thank you to [Chris Reath](https://x.com/reathchris), [Travers Nisbet](https://x.com/travers00), [Willem Van Lancker](https://x.com/vanlancker) and [Terrain](https://x.com/terraincap), [Lukas Levert](https://x.com/lukaslevert), [Elain Szu](https://x.com/elain), [Loren Kim](https://x.com/lorenkvm), [Liam Mulcahy](https://x.com/StuffLiamTweets), and the Parallel team for all the work that went into this project.
