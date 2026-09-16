# Introducing the Parallel Chat API 

Starting today, the Parallel Chat API is generally available in beta - bringing real-time web research to interactive AI applications using our rapidly growing web index. 


The Chat API returns OpenAI ChatCompletions compatible streaming text and JSON with the low latency your interactive apps need. It is built with the same obsession for price-performance that we’ve demonstrated with the [Task API](https://parallel.ai/blog/parallel-task-api).

```python
from openai import OpenAI

client = OpenAI(
    api_key="PARALLEL_API_KEY",  # Your Parallel API key
    base_url="https://api.parallel.ai"  # Parallel's API beta endpoint
)

response = client.chat.completions.create(
    model="speed", # Parallel model name
    messages=[
        {"role": "user", "content": "What does Parallel Web Systems do?"}
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "reasoning_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "reasoning": {
                        "type": "string",
                        "description": "Think step by step to arrive at the answer",
                    },
                    "answer": {
                        "type": "string",
                        "description": "The direct answer to the question",
                    },
                    "citations": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Sources cited to support the answer",
                    },
                },
            },
        },
    },
)

print(response.choices[0].message.content)
```

Last year, we started building our own web crawler and index, recognizing that AIs need native infrastructure to query and reason over the web. The Chat API answers instantly using our index, while the Task API combines our index with real-time web crawling for maximum accuracy and the freshest data. Both APIs return comprehensive citations so you can always verify responses.

![](https://cdn.sanity.io/images/5hzduz3y/production/dfe299127abfeba88c55260ef84f9a465d733a65-1572x1080.gif)

## 
**Start building.**

Get started in our [Developer Platform](https://platform.parallel.ai/play/chat) or dive into the [documentation](https://docs.parallel.ai/chat-api/chat-quickstart).
