[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Introducing the Parallel Chat API

Starting today, the Parallel Chat API is generally available in beta - bringing real-time web research to interactive AI applications using our rapidly growing web index.

Tags: [Product Release](/blog?tag=product-release)

Reading time: 1 min

The Chat API returns OpenAI ChatCompletions compatible streaming text and JSON with the low latency your interactive apps need. It is built with the same obsession for price-performance that we’ve demonstrated with the [Task API](https://parallel.ai/blog/parallel-task-api) [Task API]($https://parallel.ai/blog/parallel-task-api) .

\### Python Code Snippet

```
1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

17

18

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

from  openai  import  OpenAI

client = OpenAI(
    api_key= "PARALLEL_API_KEY" ,   # Your Parallel API key 
    base_url= "https://beta.parallel.ai" # Parallel's API beta endpoint 
)

response = client.chat.completions.create(
    model= "speed" ,  # Parallel model name 
    messages=[
        { "role" :  "user" ,  "content" :  "What does Parallel Web Systems do?" }
    ],
    response_format={
         "type" :  "json_schema" ,
         "json_schema" : {
             "name" :  "reasoning_schema" ,
             "schema" : {
                 "type" :  "object" ,
                 "properties" : {
                     "reasoning" : {
                         "type" :  "string" ,
                         "description" :  "Think step by step to arrive at the answer" ,
                    },
                     "answer" : {
                         "type" :  "string" ,
                         "description" :  "The direct answer to the question" ,
                    },
                     "citations" : {
                         "type" :  "array" ,
                         "items" : { "type" :  "string" },
                         "description" :  "Sources cited to support the answer" ,
                    },
                },
            },
        },
    },
)

 print (response.choices[ 0 ].message.content) ```  from openai import OpenAI   client = OpenAI( api_key="PARALLEL_API_KEY",  # Your Parallel API key base_url="https://beta.parallel.ai"  # Parallel's API beta endpoint )   response = client.chat.completions.create( model="speed", # Parallel model name messages=[ {"role": "user", "content": "What does Parallel Web Systems do?"} ], response_format={ "type": "json_schema", "json_schema": { "name": "reasoning_schema", "schema": { "type": "object", "properties": { "reasoning": { "type": "string", "description": "Think step by step to arrive at the answer", }, "answer": { "type": "string", "description": "The direct answer to the question", }, "citations": { "type": "array", "items": {"type": "string"}, "description": "Sources cited to support the answer", }, }, }, }, }, )   print(response.choices[0].message.content) ```
```

Last year, we started building our own web crawler and index, recognizing that AIs need native infrastructure to query and reason over the web. The Chat API answers instantly using our index, while the Task API combines our index with real-time web crawling for maximum accuracy and the freshest data. Both APIs return comprehensive citations so you can always verify responses.

![](https://cdn.sanity.io/images/5hzduz3y/production/dfe299127abfeba88c55260ef84f9a465d733a65-1572x1080.gif)

## \##  
**\*\* Start building. \*\***

Get started in our [Developer Platform](https://platform.parallel.ai/play/chat) [Developer Platform]($https://platform.parallel.ai/play/chat) or dive into the [documentation](https://docs.parallel.ai/chat-api/chat-quickstart) [documentation]($https://docs.parallel.ai/chat-api/chat-quickstart) .

By Parallel

May 30, 2025

![Company Logo](https://parallel.ai/parallel-logo-540.png)

### Contact

* [hello@parallel.ai](mailto:hello@parallel.ai) [hello@parallel.ai](mailto:hello@parallel.ai)

### Resources

* [About](/about) [About](https://parallel.ai/about)
* [Pricing](/pricing) [Pricing](https://parallel.ai/pricing)
* [Docs](https://docs.parallel.ai) [Docs](https://docs.parallel.ai)
* [Status](https://status.parallel.ai/) [Status](https://status.parallel.ai/)
* [Blog](/blog) [Blog](https://parallel.ai/blog)
* [Changelog](https://docs.parallel.ai/resources/changelog) [Changelog](https://docs.parallel.ai/resources/changelog)
* [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel)

### Info

* [Terms](/terms-of-service) [Terms](https://parallel.ai/terms-of-service)
* [Privacy](/privacy-policy) [Privacy](https://parallel.ai/privacy-policy)
* [Trust Center](https://trust.parallel.ai/) [Trust Center](https://trust.parallel.ai/)

![SOC 2 Compliant](https://parallel.ai/soc2.svg)

[LinkedIn](https://www.linkedin.com/company/parallel-web/about/) [LinkedIn] (https://www.linkedin.com/company/parallel-web/about/) [Twitter](https://x.com/p0) [Twitter] (https://x.com/p0)

Parallel Web Systems Inc. 2025
