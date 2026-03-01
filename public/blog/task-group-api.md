[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# The Parallel Task Group API

Tags: [Product Release](/blog?tag=product-release)

Reading time: 1 min

[Parallel Tasks](https://parallel.ai/blog/parallel-task-api) [Parallel Tasks]($https://parallel.ai/blog/parallel-task-api) are designed for large-scale workloads. When your pipeline needs to launch hundreds or thousands of independent web research calls, the new **\*\* Task Group API \*\*** wraps those operations into a single batch - giving you one identifier to create, monitor, and collect results from large parallel workloads.

\### Create a Task Group

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

import  httpx
 from  parallel.types  import  TaskRunCreateParams

client = httpx.Client(
    base_url= "https://beta.parallel.ai" ,
    headers={ "x-api-key" :  "your-api-key" },
)

 # 1. Create a task-group shell 
group_resp = client.post( "/v1beta/tasks/groups" , json={}).json()
taskgroup_id = group_resp[ "taskgroup_id" ]

 # 2. Initiate runs in that group 
questions = [
     "What is the capital of France?" ,
     "What is the capital of Germany?" ,
]
run_resp = client.post(
     f"/v1beta/tasks/groups/ {taskgroup_id} /runs" ,
    json={
         "inputs" : [
            TaskRunCreateParams( input =q, processor= "lite" )
             for  q  in  questions
        ]
    },
).json()

 print ( "Initial status:" , run_resp[ "status" ])

 # 3. Stream live events for this run 
events_url =  f"/v1beta/tasks/groups/ {taskgroup_id} /events" with  client.stream( "GET" , events_url)  as  stream:
     for  chunk  in  stream.iter_text():
         if  chunk.strip():   # ignore keep-alive blanks print ( "Event:" , chunk) ```  import httpx from parallel.types import TaskRunCreateParams   client = httpx.Client( base_url="https://beta.parallel.ai", headers={"x-api-key": "your-api-key"}, )   # 1. Create a task-group shell group_resp = client.post("/v1beta/tasks/groups", json={}).json() taskgroup_id = group_resp["taskgroup_id"]   # 2. Initiate runs in that group questions = [ "What is the capital of France?", "What is the capital of Germany?", ] run_resp = client.post( f"/v1beta/tasks/groups/{taskgroup_id}/runs", json={ "inputs": [ TaskRunCreateParams(input=q, processor="lite") for q in questions ] }, ).json()   print("Initial status:", run_resp["status"])   # 3. Stream live events for this run events_url = f"/v1beta/tasks/groups/{taskgroup_id}/events"   with client.stream("GET", events_url) as stream: for chunk in stream.iter_text(): if chunk.strip():  # ignore keep-alive blanks print("Event:", chunk)   ```
```

## \## **\*\* Built for Production Scale \*\***

Whether you're enriching thousands of CRM records, conducting bulk due diligence, or processing large-scale competitive intelligence workflows - the Task Group API makes running Parallel Tasks in batch seamless.

**\*\* Unified monitoring \*\*** — Track queued, running, completed, and failed counts through a single endpoint instead of polling hundreds of individual Tasks.

**\*\* Real-time results streaming \*\*** — Open one connection and receive each Task's structured output the moment it completes, eliminating the need to orchestrate multiple polling loops.

**\*\* Dynamic expansion \*\*** — Add new Tasks to active groups without restarting batches, supporting workflows that discover additional research targets mid-execution.

## \## **\*\* Start Building at Scale \*\***

The Task Group API is available in public beta today. Get started in our [Developer Platform](https://platform.parallel.ai/) [Developer Platform]($https://platform.parallel.ai/) or dive directly into the [documentation](https://docs.parallel.ai/resources/group-api) [documentation]($https://docs.parallel.ai/resources/group-api) .

By Parallel

July 2, 2025

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
