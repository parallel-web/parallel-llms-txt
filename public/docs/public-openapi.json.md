{
  "openapi": "3.1.0",
  "info": {
    "title": "Parallel API",
    "description": "Parallel API",
    "contact": {
      "name": "Parallel Support",
      "url": "https://parallel.ai",
      "email": "support@parallel.ai"
    },
    "version": "0.1.2"
  },
  "paths": {
    "/v1beta/chat/completions": {
      "post": {
        "tags": [
          "Chat API (Beta)"
        ],
        "summary": "Chat Completions",
        "description": "Chat completions.\n\nThis endpoint can be used to get realtime chat completions. It can also be used\nwith the Task API processors to get structured, research outputs via a chat\ninterface.",
        "operationId": "chat_completions_v1beta_chat_completions_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChatCompletionRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Returns a ChatCompletion object for non-streaming requests (application/json), or a stream of ChatCompletionResponseChunk objects for streaming requests (text/event-stream) when `stream=true` is set in the request.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChatCompletion"
                }
              },
              "text/event-stream": {
                "schema": {
                  "$ref": "#/components/schemas/ChatCompletionResponseChunk"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1beta/extract": {
      "post": {
        "tags": [
          "Extract (Beta)"
        ],
        "summary": "Extract",
        "description": "Extracts relevant content from specific web URLs.\n\nTo access this endpoint, pass the `parallel-beta` header with the value\n`search-extract-2025-10-10`.",
        "operationId": "beta_extract_v1beta_extract_post",
        "parameters": [
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "type": "string",
              "default": "search-extract-2025-10-10",
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExtractRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ExtractResponse"
                },
                "example": {
                  "extract_id": "extract_8a911eb27c7a4afaa20d0d9dc98d07c0",
                  "results": [
                    {
                      "url": "https://www.example.com",
                      "title": "Example Title",
                      "excerpts": [
                        "Excerpted text ..."
                      ],
                      "full_content": "Full content ..."
                    }
                  ],
                  "errors": [
                    {
                      "url": "https://www.example.com",
                      "error_type": "fetch_error",
                      "http_status_code": 500,
                      "content": "Error fetching content from https://www.example.com"
                    }
                  ]
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "extract_8a911eb27c7a4afaa20d0d9dc98d07c0",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "cURL",
            "source": "curl --request POST \\\n    --url https://api.parallel.ai/v1beta/extract \\\n    --header 'Content-Type: application/json' \\\n    --header 'x-api-key: <api-key>' \\\n    --header 'parallel-beta: search-extract-2025-10-10' \\\n    --data '{\n    \"urls\": [\"https://www.example.com\"],\n    \"excerpts\": true,\n    \"full_content\": true\n}'"
          },
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nextract = client.beta.extract(\n    urls=[\"https://www.example.com\"],\n    excerpts=True,\n    full_content=True\n)\nprint(extract.results)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst extract = await client.beta.extract({\n    urls: [\"https://www.example.com\"],\n    excerpts: true,\n    full_content: true\n});\nconsole.log(extract.results);"
          }
        ]
      }
    },
    "/v1beta/search": {
      "post": {
        "tags": [
          "Search (Beta)"
        ],
        "summary": "Search",
        "description": "Searches the web.",
        "operationId": "web_search_v1beta_search_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SearchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SearchResponse"
                },
                "example": {
                  "search_id": "search_fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                  "results": [
                    {
                      "url": "https://www.example.com",
                      "title": "Sample webpage title",
                      "publish_date": "2024-01-15",
                      "excerpts": [
                        "Sample excerpt 1",
                        "Sample excerpt 2"
                      ]
                    }
                  ]
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "search_fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nsearch = client.beta.search(\n    objective=\"What was the GDP of France in 2023?\"\n)\nprint(search.results)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst search = await client.beta.search({\n    objective: \"What was the GDP of France in 2023?\"\n});\nconsole.log(search.results);"
          },
          {
            "lang": "cURL",
            "source": "curl --request POST \\\n    --url https://api.parallel.ai/v1beta/search \\\n    --header 'Content-Type: application/json' \\\n    --header 'x-api-key: <api-key>' \\\n    --header 'parallel-beta: search-extract-2025-10-10' \\\n    --data '{\n    \"objective\": \"What was the GDP of France in 2023?\"\n}'"
          }
        ]
      }
    },
    "/v1alpha/monitors": {
      "post": {
        "tags": [
          "Monitor"
        ],
        "summary": "Create Monitor",
        "description": "Create a web monitor.\n\nCreates a monitor that periodically runs the specified query over the web at the\nspecified cadence (hourly, daily, weekly, or every two weeks). The monitor runs once at\ncreation and then continues according to the specified frequency.\n\nUpdates will be sent to the webhook if provided. Use the `executions` endpoint\nto retrieve execution history for a monitor.",
        "operationId": "create_monitor_v1alpha_monitors_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateMonitorRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorResponse"
                },
                "example": {
                  "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
                  "query": "Extract recent news about AI",
                  "status": "active",
                  "cadence": "daily",
                  "metadata": {
                    "key": "value"
                  },
                  "webhook": {
                    "url": "https://example.com/webhook",
                    "event_types": [
                      "monitor.event.detected"
                    ]
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable content: request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unprocessable content: request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "Monitor"
        ],
        "summary": "List Monitors",
        "description": "List active monitors.\n\nReturns all monitors for the user, regardless of status. Each list item\ncontains the monitor configuration and current status.\n\nSupports pagination using `monitor_id` as a cursor and `limit` to control\nthe number of results returned.",
        "operationId": "list_monitors_v1alpha_monitors_get",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "description": "Monitor ID to start listing after (for pagination). Returns monitors starting with this ID in lexicographic order.",
              "title": "Monitor Id"
            },
            "description": "Monitor ID to start listing after (for pagination). Returns monitors starting with this ID in lexicographic order."
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer",
                  "maximum": 10000,
                  "minimum": 1
                },
                {
                  "type": "null"
                }
              ],
              "description": "Maximum number of monitors to return. Defaults to returning all monitors.",
              "title": "Limit"
            },
            "description": "Maximum number of monitors to return. Defaults to returning all monitors."
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/MonitorResponse"
                  },
                  "title": "Response 200 List Monitors V1Alpha Monitors Get"
                },
                "example": [
                  {
                    "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
                    "query": "Extract recent news about AI",
                    "status": "active",
                    "cadence": "daily",
                    "metadata": {
                      "key": "value"
                    },
                    "webhook": {
                      "url": "https://example.com/webhook",
                      "event_types": [
                        "monitor.event.detected"
                      ]
                    },
                    "created_at": "2025-04-23T20:21:48.037943Z"
                  },
                  {
                    "monitor_id": "monitor_b0179f70195e4258a3b982c1b6d8bd3a",
                    "query": "Extract recent news about AI",
                    "status": "canceled",
                    "cadence": "daily",
                    "metadata": {
                      "key": "value"
                    },
                    "webhook": {
                      "url": "https://example.com/webhook",
                      "event_types": [
                        "monitor.event.detected"
                      ]
                    },
                    "created_at": "2025-04-23T20:21:48.037943Z"
                  }
                ]
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v1alpha/monitors/{monitor_id}": {
      "get": {
        "tags": [
          "Monitor"
        ],
        "summary": "Retrieve Monitor",
        "description": "Retrieve a monitor.\n\nRetrieves a specific monitor by `monitor_id`. Returns the monitor\nconfiguration including status, cadence, input, and webhook settings.",
        "operationId": "retrieve_monitor_v1alpha_monitors__monitor_id__get",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorResponse"
                },
                "example": {
                  "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
                  "query": "Extract recent news about AI",
                  "status": "active",
                  "cadence": "daily",
                  "metadata": {
                    "key": "value"
                  },
                  "webhook": {
                    "url": "https://example.com/webhook",
                    "event_types": [
                      "monitor.event.detected"
                    ]
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Schedule not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Schedule not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Monitor"
        ],
        "summary": "Update Monitor",
        "description": "Update a monitor.\n\nAt least one field must be non-null to apply an update.",
        "operationId": "update_monitor_v1alpha_monitors__monitor_id__post",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateMonitorRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorResponse"
                },
                "example": {
                  "monitor_id": "monitor_b0079f70195e4258a3b982c1b6d8bd3a",
                  "query": "Extract recent news about AI",
                  "status": "active",
                  "cadence": "daily",
                  "metadata": {
                    "key": "value"
                  },
                  "webhook": {
                    "url": "https://example.com/webhook",
                    "event_types": [
                      "monitor.event.detected"
                    ]
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Schedule not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Schedule not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Monitor"
        ],
        "summary": "Delete Monitor",
        "description": "Delete a monitor.\n\nDeletes a monitor, stopping all future executions. Deleted monitors can no\nlonger be updated or retrieved.",
        "operationId": "delete_monitor_v1alpha_monitors__monitor_id__delete",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorResponse"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Schedule not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Schedule not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1alpha/monitors/{monitor_id}/event_groups/{event_group_id}": {
      "get": {
        "tags": [
          "Monitor"
        ],
        "summary": "Retrieve Event Group",
        "description": "Retrieve an event group for a monitor.\n\nEach list item in the response will have type `event`.",
        "operationId": "retrieve_event_group_v1alpha_monitors__monitor_id__event_groups__event_group_id__get",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          },
          {
            "name": "event_group_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Event Group Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorEventList"
                },
                "example": {
                  "events": [
                    {
                      "type": "event",
                      "event_group_id": "mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24",
                      "output": "New product launch announced",
                      "event_date": "2025-01-15",
                      "source_urls": [
                        "https://example.com/news"
                      ],
                      "result": {
                        "type": "text",
                        "content": "New product launch announced"
                      }
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Event group not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Event group not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v1alpha/monitors/{monitor_id}/events": {
      "get": {
        "tags": [
          "Monitor"
        ],
        "summary": "List Events",
        "description": "List events for a monitor from up to the last 300 event groups.\n\nRetrieves events from the monitor, including events with errors and\nmaterial changes. The endpoint checks up to the specified lookback period or the\nprevious 300 event groups, whichever is less.\n\nEvents will be returned in reverse chronological order, with the most recent event groups\nfirst. All events from an event group will be flattened out into individual entries\nin the list.",
        "operationId": "list_monitor_events_v1alpha_monitors__monitor_id__events_get",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          },
          {
            "name": "lookback_period",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Lookback period to fetch events from. Sample values: `10d`, `1w`. A minimum of 1 day is supported and with one day increments. Use `d` for days, `w` for weeks.",
              "default": "10d",
              "title": "Lookback Period"
            },
            "description": "Lookback period to fetch events from. Sample values: `10d`, `1w`. A minimum of 1 day is supported and with one day increments. Use `d` for days, `w` for weeks."
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonitorEventList"
                },
                "example": {
                  "events": [
                    {
                      "type": "event",
                      "event_group_id": "mevtgrp_b0079f70195e4258eab1e7284340f1a9ec3a8033ed236a24",
                      "output": "New product launch announced",
                      "event_date": "2025-01-15",
                      "source_urls": [
                        "https://example.com/news"
                      ],
                      "result": {
                        "type": "text",
                        "content": "New product launch announced"
                      }
                    },
                    {
                      "type": "completion",
                      "monitor_ts": "completed_2025-01-15T10:30:00Z"
                    },
                    {
                      "type": "error",
                      "error": "Error occurred while processing the event",
                      "id": "error_2025-01-15T10:30:00Z",
                      "date": "2025-01-15T10:30:00Z"
                    }
                  ]
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Schedule not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Schedule not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v1alpha/monitors/{monitor_id}/simulate_event": {
      "post": {
        "tags": [
          "Monitor"
        ],
        "summary": "Simulate Event",
        "description": "Simulate sending an event for a monitor.\n\nSimulates sending an event for the specified event_type.\nDefaults to `monitor.event.detected` if not specified.",
        "operationId": "simulate_event_v1alpha_monitors__monitor_id__simulate_event_post",
        "parameters": [
          {
            "name": "monitor_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Monitor Id"
            }
          },
          {
            "name": "event_type",
            "in": "query",
            "required": false,
            "schema": {
              "enum": [
                "monitor.event.detected",
                "monitor.execution.completed",
                "monitor.execution.failed"
              ],
              "type": "string",
              "description": "Event type to simulate.",
              "examples": [
                "monitor.event.detected",
                "monitor.execution.completed",
                "monitor.execution.failed"
              ],
              "default": "monitor.event.detected",
              "title": "Event Type"
            },
            "description": "Event type to simulate."
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "string",
                "format": "binary",
                "default": "",
                "title": " Body"
              }
            }
          }
        },
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "404": {
            "description": "Schedule not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Schedule not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "400": {
            "description": "Webhook not configured",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Webhook not configured"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/tasks/runs": {
      "post": {
        "tags": [
          "Tasks v1"
        ],
        "summary": "Create Task Run",
        "description": "Initiates a task run.\n\nReturns immediately with a run object in status 'queued'.\n\nBeta features can be enabled by setting the 'parallel-beta' header.",
        "operationId": "tasks_runs_post_v1_tasks_runs_post",
        "parameters": [
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BetaTaskRunInput"
              }
            }
          }
        },
        "responses": {
          "202": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskRun"
                },
                "example": {
                  "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "interaction_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "status": "queued",
                  "is_active": true,
                  "processor": "core",
                  "metadata": {
                    "my_key": "my_value"
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z",
                  "modified_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "402": {
            "description": "Payment required: insufficient credit in account",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Payment required: insufficient credit in account"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden: invalid processor in request",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Forbidden: invalid processor in request"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable content: request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unprocessable content: request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests: quota temporarily exceeded",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Too many requests: quota temporarily exceeded"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\nfrom parallel.types.beta import McpServerParam\nfrom parallel.types.beta.beta_run_input_param import BetaRunInputParam\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_run = client.beta.task_run.create(\n    input=\"What was the GDP of France in 2023?\",\n    processor='base',\n    enable_events=True,\n    mcp_servers=[\n        McpServerParam(\n            type='url',\n            name='parallel_web_search',\n            url='https://mcp.parallel.ai/v1beta/search_mcp',\n            headers={'x-api-key': 'API Key'}\n        )\n    ],\n    betas=['events-sse-2025-07-24','mcp-server-2025-07-17']\n)\nprint(task_run.run_id)",
            "label": "Beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskRun = await client.beta.taskRun.create({\n    input: 'What was the GDP of France in 2023?',\n    processor: 'base',\n    enable_events: true,\n    mcp_servers: [{\n            type: 'url',\n            name: 'parallel_web_search',\n            url: 'https://mcp.parallel.ai/v1beta/search_mcp',\n            headers: {'x-api-key': 'API Key'},\n        },\n    ],\n    betas: ['events-sse-2025-07-24','mcp-server-2025-07-17'],\n});\nconsole.log(taskRun.run_id);",
            "label": "Beta params"
          },
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_run = client.task_run.create(\n    input=\"What was the GDP of France in 2023?\",\n    processor=\"base\",\n)\nprint(task_run.run_id)",
            "label": "Non-beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskRun = await client.taskRun.create({\n    input: 'What was the GDP of France in 2023?',\n    processor: 'base',\n});\nconsole.log(taskRun.run_id);",
            "label": "Non-beta params"
          }
        ]
      }
    },
    "/v1/tasks/runs/{run_id}": {
      "get": {
        "tags": [
          "Tasks v1"
        ],
        "summary": "Retrieve Task Run",
        "description": "Retrieves run status by run_id.\n\nThe run result is available from the `/result` endpoint.",
        "operationId": "tasks_runs_get_v1_tasks_runs__run_id__get",
        "parameters": [
          {
            "name": "run_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Run Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskRun"
                },
                "example": {
                  "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "interaction_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "status": "running",
                  "is_active": true,
                  "processor": "core",
                  "metadata": {
                    "my_key": "my_value"
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z",
                  "modified_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Run id not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Run id not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_run = client.task_run.retrieve(\"run_id\")\nprint(task_run.status)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskRun = await client.taskRun.retrieve('run_id');\nconsole.log(taskRun.status);"
          }
        ]
      }
    },
    "/v1/tasks/runs/{run_id}/input": {
      "get": {
        "tags": [
          "Tasks v1"
        ],
        "summary": "Retrieve Task Run Input",
        "description": "Retrieves the input of a run by run_id.",
        "operationId": "tasks_runs_input_get_v1_tasks_runs__run_id__input_get",
        "parameters": [
          {
            "name": "run_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Run Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskRunInput"
                },
                "example": {
                  "processor": "core",
                  "metadata": {
                    "my_key": "my_value"
                  },
                  "task_spec": {
                    "output_schema": {
                      "json_schema": {
                        "type": "object",
                        "properties": {
                          "gdp": {
                            "type": "string",
                            "description": "GDP in USD for the year, formatted like '$3.1 trillion (2023)'"
                          }
                        },
                        "required": [
                          "gdp"
                        ],
                        "additionalProperties": false
                      },
                      "type": "json"
                    },
                    "input_schema": {
                      "json_schema": {
                        "type": "object",
                        "properties": {
                          "country": {
                            "type": "string"
                          },
                          "year": {
                            "type": "integer"
                          }
                        },
                        "required": [
                          "country",
                          "year"
                        ],
                        "additionalProperties": false
                      },
                      "type": "json"
                    }
                  },
                  "input": {
                    "country": "France",
                    "year": 2023
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Run id not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Run id not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v1/tasks/runs/{run_id}/result": {
      "get": {
        "tags": [
          "Tasks v1"
        ],
        "summary": "Retrieve Task Run Result",
        "description": "Retrieves a run result by run_id, blocking until the run is completed.",
        "operationId": "tasks_runs_result_get_v1_tasks_runs__run_id__result_get",
        "parameters": [
          {
            "name": "run_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Run Id"
            }
          },
          {
            "name": "timeout",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 600,
              "title": "Timeout"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/TaskRunResult"
                    },
                    {
                      "$ref": "#/components/schemas/BetaTaskRunResult"
                    }
                  ],
                  "title": "Response Tasks Runs Result Get V1 Tasks Runs  Run Id  Result Get"
                },
                "example": {
                  "run": {
                    "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                    "interaction_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                    "status": "completed",
                    "is_active": false,
                    "processor": "core",
                    "metadata": {
                      "my_key": "my_value"
                    },
                    "created_at": "2025-04-23T20:21:48.037943Z",
                    "modified_at": "2025-04-23T20:21:48.037943Z"
                  },
                  "output": {
                    "basis": [],
                    "type": "json",
                    "content": {
                      "gdp": "$3.1 trillion (2023)"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Run failed or run id not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Run failed or run id not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "408": {
            "description": "Request timed out; run still active",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request timed out; run still active"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\n# If task run has beta output fields\ntask_run_result = client.beta.task_run.result(\n    run_id=\"run_id\",\n    betas=[\"mcp-server-2025-07-17\"]\n)\nprint(task_run_result.output)",
            "label": "Beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\n// If taskRun has beta output fields\nconst taskRunResult = await client.beta.taskRun.result(\n    'run_id',\n    {\n        betas: ['mcp-server-2025-07-17'],\n    },\n);\nconsole.log(taskRunResult.output);",
            "label": "Beta params"
          },
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_run_result = client.task_run.result(run_id=\"run_id\")\nprint(task_run_result.output)",
            "label": "Non-beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskRunResult = await client.taskRun.result('run_id');\nconsole.log(taskRunResult.output);",
            "label": "Non-beta params"
          }
        ]
      }
    },
    "/v1beta/tasks/runs/{run_id}/events": {
      "get": {
        "tags": [
          "Tasks v1"
        ],
        "summary": "Stream Task Run Events",
        "description": "Streams events for a task run.\n\nReturns a stream of events showing progress updates and state changes for the task\nrun.\n\nFor task runs that did not have enable_events set to true during creation, the\nfrequency of events will be reduced.",
        "operationId": "tasks_runs_events_get_v1beta_tasks_runs__run_id__events_get",
        "parameters": [
          {
            "name": "run_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Run Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "text/event-stream": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/TaskRunProgressStatsEvent"
                    },
                    {
                      "$ref": "#/components/schemas/TaskRunProgressMessageEvent"
                    },
                    {
                      "$ref": "#/components/schemas/TaskRunEvent"
                    },
                    {
                      "$ref": "#/components/schemas/ErrorEvent"
                    }
                  ],
                  "discriminator": {
                    "propertyName": "type",
                    "mapping": {
                      "task_run.progress_stats": "#/components/schemas/TaskRunProgressStatsEvent",
                      "task_run.progress_msg.plan": "#/components/schemas/TaskRunProgressMessageEvent",
                      "task_run.progress_msg.search": "#/components/schemas/TaskRunProgressMessageEvent",
                      "task_run.progress_msg.result": "#/components/schemas/TaskRunProgressMessageEvent",
                      "task_run.progress_msg.tool_call": "#/components/schemas/TaskRunProgressMessageEvent",
                      "task_run.progress_msg.exec_status": "#/components/schemas/TaskRunProgressMessageEvent",
                      "task_run.state": "#/components/schemas/TaskRunEvent",
                      "error": "#/components/schemas/ErrorEvent"
                    }
                  },
                  "title": "Response 200 Tasks Runs Events Get V1Beta Tasks Runs  Run Id  Events Get"
                },
                "example": {
                  "type": "task_run.progress_msg.plan",
                  "message": "Planning task...",
                  "timestamp": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Run id not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Run id not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nevents = client.beta.task_run.events(run_id=\"run_id\")\nfor event in events:\n    print(event)\n"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst events = await client.beta.taskRun.events(\n    'run_id',\n);\nfor await (const event of events) {\n    console.log(event);\n}\n"
          }
        ]
      }
    },
    "/v1beta/tasks/groups": {
      "post": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Create Task Group",
        "description": "Initiates a TaskGroup to group and track multiple runs.",
        "operationId": "tasks_taskgroups_post_v1beta_tasks_groups_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTaskGroupRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskGroupResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_group = client.beta.task_group.create(metadata={\"key\": \"value\"})\nprint(task_group.task_group_id)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskGroup = await client.beta.taskGroup.create({\n    metadata: {'key': 'value'},\n});\nconsole.log(taskGroup.taskgroup_id);"
          }
        ]
      }
    },
    "/v1beta/tasks/groups/{taskgroup_id}": {
      "get": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Retrieve Task Group",
        "description": "Retrieves aggregated status across runs in a TaskGroup.",
        "operationId": "tasks_taskgroups_get_v1beta_tasks_groups__taskgroup_id__get",
        "parameters": [
          {
            "name": "taskgroup_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Taskgroup Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskGroupResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_group = client.beta.task_group.retrieve(\"taskgroup_id\")\nprint(task_group.status)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskGroup = await client.beta.taskGroup.retrieve(\n    'taskgroup_id',\n);\nconsole.log(taskGroup.status);"
          }
        ]
      }
    },
    "/v1beta/tasks/groups/{taskgroup_id}/runs": {
      "post": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Add Runs to Task Group",
        "description": "Initiates multiple task runs within a TaskGroup.",
        "operationId": "tasks_taskgroups_runs_post_v1beta_tasks_groups__taskgroup_id__runs_post",
        "parameters": [
          {
            "name": "taskgroup_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Taskgroup Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TaskGroupRunRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskGroupRunResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\nfrom parallel.types.beta import McpServerParam\nfrom parallel.types.beta.beta_run_input_param import BetaRunInputParam\n\nclient = Parallel(api_key=\"API Key\")\ngroup_status = client.beta.task_group.add_runs(\n    \"taskgroup_id\",\n    inputs=[\n        BetaRunInputParam(\n            input=\"What was the GDP of France in 2023?\",\n            processor=\"base\",\n            mcp_servers=[McpServerParam(\n                type=\"url\",\n                name=\"parallel_web_search\",\n                url=\"https://mcp.parallel.ai/v1beta/search_mcp\",\n                headers={\"x-api-key\": \"API Key\"}\n            )]\n        )\n    ],\n    betas=[\"mcp-server-2025-07-17\"]\n)\nprint(group_status.status)\n",
            "label": "Beta params"
          },
          {
            "lang": "Python",
            "source": "from parallel import Parallel\nfrom parallel.types.beta.beta_run_input_param import BetaRunInputParam\n\nclient = Parallel(api_key=\"API Key\")\ngroup_status = client.beta.task_group.add_runs(\n    \"taskgroup_id\",\n    inputs=[\n        BetaRunInputParam(\n            input=\"What was the GDP of France in 2023?\",\n            processor=\"base\"\n        )\n    ]\n)\nprint(group_status.status)\n",
            "label": "Non-beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst groupStatus = await client.beta.taskGroup.addRuns(\n    'taskgroup_id',\n    {\n        inputs: [\n            {\n                input: 'What was the GDP of France in 2023?',\n                processor: 'base',\n                mcp_servers: [{\n                    type: 'url',\n                    name: 'parallel_web_search',\n                    url: 'https://mcp.parallel.ai/v1beta/search_mcp',\n                    headers: {'x-api-key': 'API Key'}\n                }]\n            }\n        ],\n        betas: ['mcp-server-2025-07-17']\n    }\n);\nconsole.log(groupStatus.status);",
            "label": "Beta params"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst groupStatus = await client.beta.taskGroup.addRuns(\n    'taskgroup_id',\n    {\n        inputs: [\n            {\n                input: 'What was the GDP of France in 2023?',\n                processor: 'base',\n            }\n        ]\n    }\n);\nconsole.log(groupStatus.status);",
            "label": "Non-beta params"
          }
        ]
      },
      "get": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Fetch Task Group Runs",
        "description": "Retrieves task runs in a TaskGroup and optionally their inputs and outputs.\n\nAll runs within a TaskGroup are returned as a stream. To get the inputs and/or\noutputs back in the stream, set the corresponding `include_input` and\n`include_output` parameters to `true`.\n\nThe stream is resumable using the `event_id` as the cursor. To resume a stream,\nspecify the `last_event_id` parameter with the `event_id` of the last event in the\nstream. The stream will resume from the next event after the `last_event_id`.",
        "operationId": "tasks_taskgroups_runs_get_v1beta_tasks_groups__taskgroup_id__runs_get",
        "parameters": [
          {
            "name": "taskgroup_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Taskgroup Id"
            }
          },
          {
            "name": "last_event_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Last Event Id"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "queued",
                    "action_required",
                    "running",
                    "completed",
                    "failed",
                    "cancelling",
                    "cancelled"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Status"
            }
          },
          {
            "name": "include_input",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": false,
              "title": "Include Input"
            }
          },
          {
            "name": "include_output",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean",
              "default": false,
              "title": "Include Output"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "text/event-stream": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/TaskRunEvent"
                    },
                    {
                      "$ref": "#/components/schemas/ErrorEvent"
                    }
                  ],
                  "discriminator": {
                    "propertyName": "type",
                    "mapping": {
                      "task_run.state": "#/components/schemas/TaskRunEvent",
                      "error": "#/components/schemas/ErrorEvent"
                    }
                  },
                  "title": "Response 200 Tasks Taskgroups Runs Get V1Beta Tasks Groups  Taskgroup Id  Runs Get"
                },
                "example": {
                  "type": "task_run.state",
                  "event_id": "123",
                  "input": {
                    "processor": "core",
                    "metadata": {
                      "my_key": "my_value"
                    },
                    "input": {
                      "country": "France",
                      "year": 2023
                    }
                  },
                  "run": {
                    "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                    "interaction_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                    "status": "completed",
                    "is_active": false,
                    "processor": "core",
                    "metadata": {
                      "my_key": "my_value"
                    },
                    "created_at": "2025-04-23T20:21:48.037943Z",
                    "modified_at": "2025-04-23T20:21:48.037943Z"
                  }
                }
              }
            }
          },
          "404": {
            "description": "TaskGroup not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "TaskGroup not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_group_runs = client.beta.task_group.get_runs(\"taskgroup_id\")\nfor run in task_group_runs:\n    print(run)\n"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskGroupRuns = await client.beta.taskGroup.getRuns(\n    'taskgroup_id',\n);\nfor await (const run of taskGroupRuns) {\n    console.log(run);\n}\n"
          }
        ]
      }
    },
    "/v1beta/tasks/groups/{taskgroup_id}/events": {
      "get": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Stream Task Group Events",
        "description": "Streams events from a TaskGroup: status updates and run completions.\n\nThe connection will remain open for up to an hour as long as at least one run in the\ngroup is still active.",
        "operationId": "tasks_sessions_events_get_v1beta_tasks_groups__taskgroup_id__events_get",
        "parameters": [
          {
            "name": "taskgroup_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Taskgroup Id"
            }
          },
          {
            "name": "last_event_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Last Event Id"
            }
          },
          {
            "name": "timeout",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Timeout"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "text/event-stream": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/TaskGroupStatusEvent"
                    },
                    {
                      "$ref": "#/components/schemas/TaskRunEvent"
                    },
                    {
                      "$ref": "#/components/schemas/ErrorEvent"
                    }
                  ],
                  "discriminator": {
                    "propertyName": "type",
                    "mapping": {
                      "task_group_status": "#/components/schemas/TaskGroupStatusEvent",
                      "task_run.state": "#/components/schemas/TaskRunEvent",
                      "error": "#/components/schemas/ErrorEvent"
                    }
                  },
                  "title": "Response 200 Tasks Sessions Events Get V1Beta Tasks Groups  Taskgroup Id  Events Get"
                },
                "example": {
                  "type": "task_group_status",
                  "event_id": "123",
                  "status": {
                    "num_task_runs": 1,
                    "task_run_status_counts": {
                      "completed": 1
                    },
                    "is_active": false,
                    "status_message": "",
                    "modified_at": "2025-04-23T20:21:48.037943Z"
                  }
                }
              }
            }
          },
          "404": {
            "description": "TaskGroup not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "TaskGroup not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_group_events = client.beta.task_group.events(\"taskgroup_id\")\nfor event in task_group_events:\n    print(event)\n"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskGroupEvents = await client.beta.taskGroup.events(\n    'taskgroup_id',\n);\nfor await (const event of taskGroupEvents) {\n    console.log(event);\n}\n"
          }
        ]
      }
    },
    "/v1beta/tasks/groups/{taskgroup_id}/runs/{run_id}": {
      "get": {
        "tags": [
          "Tasks (Beta)"
        ],
        "summary": "Retrieve Task Group Run",
        "description": "Retrieves run status by run_id.\n\nThis endpiont is equivalent to fetching run status directly using the\n`retrieve()` method or the `tasks/runs` GET endpoint.\n\nThe run result is available from the `/result` endpoint.",
        "operationId": "tasks_taskgroups_runs_id_get_v1beta_tasks_groups__taskgroup_id__runs__run_id__get",
        "parameters": [
          {
            "name": "taskgroup_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Taskgroup Id"
            }
          },
          {
            "name": "run_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Run Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskRun"
                },
                "example": {
                  "run_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "interaction_id": "trun_9907962f83aa4d9d98fd7f4bf745d654",
                  "status": "running",
                  "is_active": true,
                  "processor": "core",
                  "metadata": {
                    "my_key": "my_value"
                  },
                  "created_at": "2025-04-23T20:21:48.037943Z",
                  "modified_at": "2025-04-23T20:21:48.037943Z"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized: invalid or missing credentials",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unauthorized: invalid or missing credentials"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Run id not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Run id not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\ntask_run = client.task_run.retrieve(\"run_id\")\nprint(task_run.status)"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst taskRun = await client.taskRun.retrieve('run_id');\nconsole.log(taskRun.status);"
          }
        ]
      }
    },
    "/v1beta/findall/ingest": {
      "post": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Ingest FindAll Run",
        "description": "Transforms a natural language search objective into a structured FindAll spec.\n\nNote: Access to this endpoint requires the parallel-beta header.\n\nThe generated specification serves as a suggested starting point and can be further\ncustomized by the user.",
        "operationId": "ingest_findall_run_v1beta_findall_ingest_post",
        "parameters": [
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IngestInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllSchema"
                },
                "example": {
                  "objective": "Find all AI companies that raised Series A funding in 2024",
                  "entity_type": "companies",
                  "match_conditions": [
                    {
                      "name": "developing_ai_products_check",
                      "description": "Company must be developing artificial intelligence (AI) products"
                    },
                    {
                      "name": "raised_series_a_2024_check",
                      "description": "Company must have raised Series A funding in 2024"
                    }
                  ],
                  "generator": "core"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nobjective = \"Find all portfolio companies of Khosla Ventures founded after 2020 and CEO names\"\n\ningest = client.beta.findall.ingest(\n    objective=objective,\n)\n\nprint(ingest.model_dump_json(indent=2))"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst objective = 'Find all portfolio companies of Khosla Ventures founded after 2020 and CEO names';\n\nconst ingest = await client.beta.findall.ingest({\n    objective: objective,\n});\n\nconsole.log(JSON.stringify(ingest, null, 2));"
          }
        ]
      }
    },
    "/v1beta/findall/runs": {
      "post": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Create FindAll Run",
        "description": "Starts a FindAll run.\n\nThis endpoint immediately returns a FindAll run object with status set to 'queued'.\nYou can get the run result snapshot using the GET /v1beta/findall/runs/{findall_id}/result endpoint.\nYou can track the progress of the run by:\n- Polling the status using the GET /v1beta/findall/runs/{findall_id} endpoint,\n- Subscribing to real-time updates via the /v1beta/findall/runs/{findall_id}/events\nendpoint,\n- Or specifying a webhook with relevant event types during run creation to receive\nnotifications.",
        "operationId": "findall_runs_v1_v1beta_findall_runs_post",
        "parameters": [
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FindAllRunInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllRun"
                },
                "example": {
                  "findall_id": "findall_56ccc4d188fb41a0803a935cf485c774",
                  "status": {
                    "status": "queued",
                    "is_active": true,
                    "metrics": {
                      "generated_candidates_count": 0,
                      "matched_candidates_count": 0
                    }
                  },
                  "generator": "base",
                  "metadata": {},
                  "created_at": "2025-09-10T21:02:08.626446Z",
                  "modified_at": "2025-09-10T21:02:08.627376Z"
                }
              }
            }
          },
          "402": {
            "description": "Payment required: insufficient credit in account",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Payment required: insufficient credit in account"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable content: request validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Unprocessable content: request validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests: quota temporarily exceeded",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Too many requests: quota temporarily exceeded"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nrun_input = {\n    \"objective\": ingest.objective,\n    \"entity_type\": ingest.entity_type,\n    \"match_conditions\": ingest.match_conditions,\n    \"generator\": \"base\",\n    \"match_limit\": 10,\n    \"metadata\": {\n        \"run_id\": \"123\",\n    },\n}\n\nrun = client.beta.findall.create(run_input)\n\nprint(f\"FindAll run {run.findall_id} created, response:\")\nprint(run.model_dump_json(indent=2))"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst runInput = {\n    objective: ingest.objective,\n    entity_type: ingest.entity_type,\n    match_conditions: ingest.match_conditions,\n    generator: \"base\",\n    match_limit: 10,\n    metadata: {\n        \"run_id\": \"123\",\n    },\n};\n\nconst run = await client.beta.findall.create(runInput);\n\nconsole.log(`FindAll run ${run.findallId} created, response:`);\nconsole.log(JSON.stringify(run, null, 2));"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}": {
      "get": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Retrieve FindAll Run Status",
        "description": "Retrieve a FindAll run.",
        "operationId": "findall_runs_v1_get_v1beta_findall_runs__findall_id__get",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllRun"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nrun = client.beta.findall.retrieve(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n)\n\nprint(f\"FindAll run {run.findall_id} status: {run.status.status}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst run = await client.beta.findall.retrieve(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n);\n\nconsole.log(`FindAll run ${run.findallId} status: ${run.status.status}`);"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/events": {
      "get": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Stream FindAll Events",
        "description": "Stream events from a FindAll run.\n\nArgs:\n    request: The Shapi request\n    findall_id: The FindAll run ID\n    last_event_id: Optional event ID to resume from.\n    timeout: Optional timeout in seconds. If None, keep connection alive\n    as long as the run is going. If set, stop after specified duration.",
        "operationId": "get_findall_events_v1beta_findall_runs__findall_id__events_get",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "last_event_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Last Event Id"
            }
          },
          {
            "name": "timeout",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "number"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Timeout"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "text/event-stream": {
                "schema": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/FindAllSchemaUpdatedEvent"
                    },
                    {
                      "$ref": "#/components/schemas/FindAllRunStatusEvent"
                    },
                    {
                      "$ref": "#/components/schemas/FindAllCandidateMatchStatusEvent"
                    },
                    {
                      "$ref": "#/components/schemas/ErrorEvent"
                    }
                  ],
                  "discriminator": {
                    "propertyName": "type",
                    "mapping": {
                      "findall.schema.updated": "#/components/schemas/FindAllSchemaUpdatedEvent",
                      "findall.status": "#/components/schemas/FindAllRunStatusEvent",
                      "findall.candidate.generated": "#/components/schemas/FindAllCandidateMatchStatusEvent",
                      "findall.candidate.matched": "#/components/schemas/FindAllCandidateMatchStatusEvent",
                      "findall.candidate.unmatched": "#/components/schemas/FindAllCandidateMatchStatusEvent",
                      "findall.candidate.discarded": "#/components/schemas/FindAllCandidateMatchStatusEvent",
                      "findall.candidate.enriched": "#/components/schemas/FindAllCandidateMatchStatusEvent",
                      "error": "#/components/schemas/ErrorEvent"
                    }
                  },
                  "title": "Response 200 Get Findall Events V1Beta Findall Runs  Findall Id  Events Get"
                },
                "example": {
                  "type": "findall.candidate.generated",
                  "timestamp": "2025-09-10T21:02:08.626446Z",
                  "event_id": "56cee734dbc84172bfc491327f2a0183",
                  "data": {
                    "candidate_id": "candidate_52e1e30b-4e0a-49d8-82eb-79e64e0ed015",
                    "name": "Pika",
                    "url": "pika.art",
                    "description": "Pika is an AI video generation platform that creates and edits videos from text prompts or images.",
                    "match_status": "generated"
                  }
                }
              }
            }
          },
          "404": {
            "description": "FindAll run not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "FindAll run not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nevents = client.beta.findall.events(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n)\n\nprint(f\"FindAll run {events.findall_id} events: {events.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst events = await client.beta.findall.events(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n);\n\nconsole.log(`FindAll run ${events.findallId} events: ${JSON.stringify(events, null, 2)}`);"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/result": {
      "get": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "FindAll Run Result",
        "description": "Retrieve the FindAll run result at the time of the request.",
        "operationId": "get_findall_result_v1beta_findall_runs__findall_id__result_get",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllRunResult"
                },
                "example": {
                  "run": {
                    "findall_id": "findall_56ccc4d188fb41a0803a935cf485c774",
                    "status": {
                      "status": "running",
                      "is_active": true,
                      "metrics": {
                        "generated_candidates_count": 1,
                        "matched_candidates_count": 1
                      }
                    },
                    "generator": "base",
                    "metadata": {},
                    "created_at": "2025-09-10T21:02:08.626446Z",
                    "modified_at": "2025-09-10T21:02:08.627376Z"
                  },
                  "candidates": [
                    {
                      "candidate_id": "candidate_7594eb7c-4f4a-487f-9d0c-9d1e63ec240c",
                      "name": "Cognition AI",
                      "url": "cognition.ai",
                      "match_status": "matched",
                      "output": {
                        "developing_ai_products_check": "yes",
                        "raised_series_a_2024_check": "yes"
                      },
                      "basis": [
                        {
                          "field": "developing_ai_products_check",
                          "citations": [
                            {
                              "title": "Cognition - Devin and Cognition AI",
                              "url": "https://cognition.ai/",
                              "excerpts": [
                                "We're the makers of Devin, a collaborative AI teammate that helps ambitious engineering teams achieve more.",
                                "An applied AI lab building the future of software engineering",
                                "Cognition"
                              ]
                            }
                          ],
                          "reasoning": "The search results repeatedly state that Cognition AI is an 'applied AI lab building the future of software engineering' and that they developed 'Devin AI', described as the 'world's first AI software engineer'. This directly confirms they are developing AI products.",
                          "confidence": "high"
                        },
                        {
                          "field": "raised_series_a_2024_check",
                          "citations": [
                            {
                              "title": "Cognition Labs Raises $21 Million Series A to Support AI Coding Products",
                              "url": "https://voicebot.ai/2024/04/25/cognition-labs-raises-21-million-series-a-to-support-ai-coding-products/",
                              "excerpts": [
                                "Cognition Labs Raises $21 Million Series A to Support AI Coding Products"
                              ]
                            }
                          ],
                          "reasoning": "The article from voicebot.ai, dated April 25, 2024, states that Founders Fund led a \"$21 million Series A investment\" for Cognition Labs. This confirms that Series A funding was raised in 2024.",
                          "confidence": "low"
                        }
                      ]
                    }
                  ]
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nrun_result = client.beta.findall.result(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n)\n\nprint(f\"FindAll run {run_result.run.findall_id} result: {run_result.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst runResult = await client.beta.findall.result(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n);\n\nconsole.log(`FindAll run ${runResult.run.findallId} result: ${JSON.stringify(runResult, null, 2)}`);"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/extend": {
      "post": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Extend FindAll Run",
        "description": "Extend a FindAll run by adding additional matches to the current match limit.",
        "operationId": "extend_findall_run_v1beta_findall_runs__findall_id__extend_post",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FindAllExtendInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllSchema"
                },
                "example": {
                  "objective": "Find all AI companies that raised Series A funding in 2024",
                  "entity_type": "companies",
                  "match_conditions": [
                    {
                      "name": "developing_ai_products_check",
                      "description": "Company must be developing artificial intelligence (AI) products"
                    }
                  ],
                  "enrichments": [
                    {
                      "processor": "core",
                      "output_schema": {
                        "json_schema": {
                          "type": "object",
                          "properties": {
                            "ceo_name": {
                              "type": "string",
                              "description": "Name of the current CEO of the company. If the CEO is not publicly known, provide the name of the highest-ranking executive or founder. If no information is available, return null."
                            }
                          }
                        },
                        "type": "json"
                      }
                    }
                  ],
                  "generator": "core",
                  "match_limit": 50
                }
              }
            }
          },
          "404": {
            "description": "FindAll run not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "FindAll run not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Additional match limit must be greater than 0",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Additional match limit must be greater than 0"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nrun = client.beta.findall.extend(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n    additional_match_limit=10,\n)\n\nprint(f\"FindAll run {run.findall_id} extended: {run.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst run = await client.beta.findall.extend(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n    additional_match_limit: 10,\n);\n\nconsole.log(`FindAll run ${run.findallId} extended: ${JSON.stringify(run, null, 2)}`);"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/enrich": {
      "post": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Add Enrichment to FindAll Run",
        "description": "Add an enrichment to a FindAll run.",
        "operationId": "enrich_findall_run_v1beta_findall_runs__findall_id__enrich_post",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FindAllEnrichInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllSchema"
                },
                "example": {
                  "objective": "Find all AI companies that raised Series A funding in 2024",
                  "entity_type": "companies",
                  "match_conditions": [
                    {
                      "name": "developing_ai_products_check",
                      "description": "Company must be developing artificial intelligence (AI) products"
                    }
                  ],
                  "enrichments": [
                    {
                      "processor": "core",
                      "output_schema": {
                        "json_schema": {
                          "type": "object",
                          "properties": {
                            "ceo_name": {
                              "type": "string",
                              "description": "Name of the current CEO of the company. If the CEO is not publicly known, provide the name of the highest-ranking executive or founder. If no information is available, return null."
                            }
                          }
                        },
                        "type": "json"
                      }
                    }
                  ],
                  "generator": "core",
                  "match_limit": 50
                }
              }
            }
          },
          "404": {
            "description": "FindAll run not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "FindAll run not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation error",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Validation error"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nclass CompanyEnrichment(BaseModel):\n    ceo_name: str = Field(\n        description=\"Name of the CEO\"\n    )\n    founding_year: str = Field(\n        description=\"Year the company was founded\"\n    )\n\nrun = client.beta.findall.enrich(\n    findall_id=\"findall_40e0ab8c10754be0b7a16477abb38a2f\",\n    processor=\"core\",\n    output_schema=CompanyEnrichment\n)\n\nprint(f\"FindAll run {run.findall_id} enriched: {run.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nawait client.beta.findall.enrich({\n    findallId: \"findall_40e0ab8c10754be0b7a16477abb38a2f\",\n    processor: \"core\",\n    output_schema: {\n        type: \"json\",\n        json_schema: {\n            type: \"object\",\n            properties: {\n                ceo_name: {\n                    type: \"string\",\n                    description: \"Name of the CEO\"\n                },\n                founding_year: {\n                    type: \"string\",\n                    description: \"Year the company was founded\"\n                }\n            },\n            required: [\"ceo_name\", \"founding_year\"],\n            additionalProperties: false\n        }\n    }\n});"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/cancel": {
      "post": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Cancel FindAll Run",
        "description": "Cancel a FindAll run.",
        "operationId": "cancel_findall_run_v1beta_findall_runs__findall_id__cancel_post",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "404": {
            "description": "FindAll run not found",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "FindAll run not found"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "409": {
            "description": "Cannot cancel a terminated FindAll run",
            "content": {
              "application/json": {
                "example": {
                  "type": "error",
                  "error": {
                    "ref_id": "fcb2b4f3-c75e-4186-87bc-caa1a8381331",
                    "message": "Cannot cancel a terminated FindAll run"
                  }
                },
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nrun = client.beta.findall.cancel(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n)\n\nprint(f\"FindAll run {run.findall_id} cancelled: {run.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nawait client.beta.findall.cancel(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n);\n\nconsole.log(`FindAll run ${run.findallId} cancelled: ${JSON.stringify(run, null, 2)}`);"
          }
        ]
      }
    },
    "/v1beta/findall/runs/{findall_id}/schema": {
      "get": {
        "tags": [
          "FindAll API (Beta)"
        ],
        "summary": "Get FindAll Run Schema",
        "operationId": "get_findall_schema_v1beta_findall_runs__findall_id__schema_get",
        "parameters": [
          {
            "name": "findall_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Findall Id"
            }
          },
          {
            "name": "parallel-beta",
            "in": "header",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Parallel-Beta",
              "x-stainless-override-schema": {
                "x-stainless-param": "betas",
                "x-stainless-extend-default": true,
                "type": "array",
                "description": "Optional header to specify the beta version(s) to enable.",
                "items": {
                  "$ref": "#/components/schemas/ParallelBeta"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FindAllSchema"
                },
                "example": {
                  "objective": "Find all AI companies that raised Series A funding in 2024",
                  "entity_type": "companies",
                  "match_conditions": [
                    {
                      "name": "developing_ai_products_check",
                      "description": "Company must be developing artificial intelligence (AI) products"
                    }
                  ],
                  "enrichments": [
                    {
                      "processor": "core",
                      "output_schema": {
                        "json_schema": {
                          "type": "object",
                          "properties": {
                            "ceo_name": {
                              "type": "string",
                              "description": "Name of the current CEO of the company. If the CEO is not publicly known, provide the name of the highest-ranking executive or founder. If no information is available, return null."
                            }
                          }
                        },
                        "type": "json"
                      }
                    }
                  ],
                  "generator": "core",
                  "match_limit": 50
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        },
        "x-code-samples": [
          {
            "lang": "Python",
            "source": "from parallel import Parallel\n\nclient = Parallel(api_key=\"API Key\")\n\nschema = client.beta.findall.schema(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n)\n\nprint(f\"FindAll run {schema.findall_id} schema: {schema.model_dump_json(indent=2)}\")"
          },
          {
            "lang": "TypeScript",
            "source": "import Parallel from \"parallel-web\";\n\nconst client = new Parallel({ apiKey: 'API Key' });\n\nconst schema = await client.beta.findall.schema(\n    findall_id=\"findall_56ccc4d188fb41a0803a935cf485c774\",\n);\n\nconsole.log(`FindAll run ${schema.findallId} schema: ${JSON.stringify(schema, null, 2)}`);"
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "AutoSchema": {
        "properties": {
          "type": {
            "type": "string",
            "const": "auto",
            "title": "Type",
            "description": "The type of schema being defined. Always `auto`.",
            "default": "auto"
          }
        },
        "type": "object",
        "title": "AutoSchema",
        "description": "Auto schema for a task input or output."
      },
      "BetaTaskRunInput": {
        "properties": {
          "processor": {
            "type": "string",
            "title": "Processor",
            "description": "Processor to use for the task.",
            "examples": [
              "base"
            ]
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the run. Keys and values must be strings with a maximum length of 16 and 512 characters respectively."
          },
          "source_policy": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SourcePolicy"
              },
              {
                "type": "null"
              }
            ],
            "description": "Optional source policy governing preferred and disallowed domains in web search results."
          },
          "task_spec": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/TaskSpec"
              },
              {
                "type": "null"
              }
            ],
            "description": "Task specification. If unspecified, defaults to auto output schema."
          },
          "input": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "additionalProperties": true,
                "type": "object"
              }
            ],
            "title": "Input",
            "description": "Input to the task, either text or a JSON object.",
            "examples": [
              "What was the GDP of France in 2023?",
              "{\"country\": \"France\", \"year\": 2023}"
            ]
          },
          "previous_interaction_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Previous Interaction Id",
            "description": "Interaction ID to use as context for this request."
          },
          "mcp_servers": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/McpServer"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mcp Servers",
            "description": "Optional list of MCP servers to use for the run.\nTo enable this feature in your requests, specify `mcp-server-2025-07-17` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          },
          "enable_events": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Enable Events",
            "description": "Controls tracking of task run execution progress. When set to true, progress events are recorded and can be accessed via the [Task Run events](https://platform.parallel.ai/api-reference) endpoint. When false, no progress events are tracked. Note that progress tracking cannot be enabled after a run has been created. The flag is set to true by default for premium processors (pro and above).\nTo enable this feature in your requests, specify `events-sse-2025-07-24` as one of the values in `parallel-beta` header (for API calls) or `betas` param (for the SDKs)."
          },
          "webhook": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Webhook"
              },
              {
                "type": "null"
              }
            ],
            "description": "Callback URL (webhook endpoint) that will receive an HTTP POST when the run completes. \nThis feature is not available via the Python SDK. To enable this feature in your API requests, specify the `parallel-beta` header with `webhook-2025-08-12` value."
          }
        },
        "type": "object",
        "required": [
          "processor",
          "input"
        ],
        "title": "BetaTaskRunInput",
        "description": "Task run input with additional beta fields."
      },
      "BetaTaskRunJsonOutput": {
        "properties": {
          "basis": {
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "type": "array",
            "title": "Basis",
            "description": "Basis for the output. To include per-list-element basis entries, send the `parallel-beta` header with the value `field-basis-2025-11-25` when creating the run."
          },
          "type": {
            "type": "string",
            "const": "json",
            "title": "Type",
            "description": "The type of output being returned, as determined by the output schema of the task spec."
          },
          "beta_fields": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Beta Fields",
            "description": "Always None."
          },
          "content": {
            "additionalProperties": true,
            "type": "object",
            "title": "Content",
            "description": "Output from the task as a native JSON object, as determined by the output schema of the task spec."
          },
          "output_schema": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Output Schema",
            "description": "Output schema for the Task Run. Populated only if the task was executed with an auto schema."
          },
          "mcp_tool_calls": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/McpToolCall"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mcp Tool Calls",
            "description": "MCP tool calls made by the task."
          }
        },
        "type": "object",
        "required": [
          "basis",
          "type",
          "content"
        ],
        "title": "BetaTaskRunJsonOutput",
        "description": "Output from a task that returns JSON."
      },
      "BetaTaskRunResult": {
        "properties": {
          "run": {
            "$ref": "#/components/schemas/TaskRun",
            "description": "Beta task run object with status 'completed'."
          },
          "output": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/BetaTaskRunTextOutput"
              },
              {
                "$ref": "#/components/schemas/BetaTaskRunJsonOutput"
              }
            ],
            "title": "Output",
            "description": "Output from the task conforming to the output schema.",
            "discriminator": {
              "propertyName": "type",
              "mapping": {
                "json": "#/components/schemas/BetaTaskRunJsonOutput",
                "text": "#/components/schemas/BetaTaskRunTextOutput"
              }
            }
          }
        },
        "type": "object",
        "required": [
          "run",
          "output"
        ],
        "title": "BetaTaskRunResult",
        "description": "Result of a beta task run. Available only if beta headers are specified."
      },
      "BetaTaskRunTextOutput": {
        "properties": {
          "basis": {
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "type": "array",
            "title": "Basis",
            "description": "Basis for the output. To include per-list-element basis entries, send the `parallel-beta` header with the value `field-basis-2025-11-25` when creating the run."
          },
          "type": {
            "type": "string",
            "const": "text",
            "title": "Type",
            "description": "The type of output being returned, as determined by the output schema of the task spec."
          },
          "beta_fields": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Beta Fields",
            "description": "Always None."
          },
          "content": {
            "type": "string",
            "title": "Content",
            "description": "Text output from the task."
          },
          "mcp_tool_calls": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/McpToolCall"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mcp Tool Calls",
            "description": "MCP tool calls made by the task."
          }
        },
        "type": "object",
        "required": [
          "basis",
          "type",
          "content"
        ],
        "title": "BetaTaskRunTextOutput",
        "description": "Output from a task that returns text."
      },
      "ChatCompletion": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id",
            "description": "The id of the chat completion."
          },
          "choices": {
            "items": {
              "$ref": "#/components/schemas/Choice"
            },
            "type": "array",
            "title": "Choices"
          },
          "created": {
            "type": "integer",
            "title": "Created"
          },
          "model": {
            "type": "string",
            "title": "Model"
          },
          "object": {
            "type": "string",
            "const": "chat.completion",
            "title": "Object"
          },
          "service_tier": {
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "auto",
                  "default",
                  "flex",
                  "scale",
                  "priority"
                ]
              },
              {
                "type": "null"
              }
            ],
            "title": "Service Tier"
          },
          "system_fingerprint": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "System Fingerprint"
          },
          "usage": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/CompletionUsage"
              },
              {
                "type": "null"
              }
            ]
          },
          "basis": {
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "type": "array",
            "title": "Basis",
            "description": "Basis for the chat completion, including citations and reasoning supporting the output.",
            "default": []
          }
        },
        "additionalProperties": true,
        "type": "object",
        "required": [
          "id",
          "choices",
          "created",
          "model",
          "object"
        ],
        "title": "ChatCompletion",
        "description": "Chat completion response."
      },
      "ChatCompletionRequest": {
        "properties": {
          "model": {
            "type": "string",
            "title": "Model",
            "description": "The model to use for chat completions."
          },
          "messages": {
            "items": {
              "$ref": "#/components/schemas/ChatMessage"
            },
            "type": "array",
            "title": "Messages",
            "description": "The messages to use for chat completions."
          },
          "stream": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Stream",
            "description": "Whether to stream the chat completions."
          },
          "response_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ResponseFormatText"
              },
              {
                "$ref": "#/components/schemas/ResponseFormatJSONSchema"
              },
              {
                "$ref": "#/components/schemas/ResponseFormatJSONObject"
              },
              {
                "type": "null"
              }
            ],
            "title": "Response Format",
            "description": "The response format to use for chat completions. OpenAI compatible."
          },
          "max_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Tokens",
            "description": "The maximum number of tokens to generate. Unsupported."
          },
          "temperature": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Temperature",
            "description": "The temperature to use for chat completions. Unsupported."
          },
          "top_p": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Top P",
            "description": "The top p to use for chat completions. Unsupported."
          },
          "n": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "N",
            "description": "The number of chat completions to generate. Unsupported."
          },
          "presence_penalty": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Presence Penalty",
            "description": "The presence penalty to use for chat completions. Unsupported."
          },
          "frequency_penalty": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Frequency Penalty",
            "description": "The frequency penalty to use for chat completions. Unsupported."
          }
        },
        "type": "object",
        "required": [
          "model",
          "messages"
        ],
        "title": "ChatCompletionRequest",
        "description": "Request for the chat completions endpoint.\n\nNote that all parameters except for `model`, `stream`, and `response_format`\nare ignored."
      },
      "ChatCompletionTokenLogprob": {
        "additionalProperties": true,
        "properties": {
          "token": {
            "title": "Token",
            "type": "string"
          },
          "bytes": {
            "anyOf": [
              {
                "items": {
                  "type": "integer"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Bytes"
          },
          "logprob": {
            "title": "Logprob",
            "type": "number"
          },
          "top_logprobs": {
            "items": {
              "$ref": "#/components/schemas/TopLogprob"
            },
            "title": "Top Logprobs",
            "type": "array"
          }
        },
        "required": [
          "token",
          "logprob",
          "top_logprobs"
        ],
        "title": "ChatCompletionTokenLogprob",
        "type": "object"
      },
      "ChatMessage": {
        "properties": {
          "role": {
            "type": "string",
            "enum": [
              "system",
              "user",
              "assistant"
            ],
            "title": "Role",
            "description": "The role of the chat message."
          },
          "content": {
            "type": "string",
            "title": "Content",
            "description": "The content of the chat message."
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name",
            "description": "An optional name for the participant. Provides the model information to differentiate between participants of the same role."
          }
        },
        "type": "object",
        "required": [
          "role",
          "content"
        ],
        "title": "ChatMessage",
        "description": "Chat message for OpenAI API."
      },
      "Choice": {
        "additionalProperties": true,
        "properties": {
          "delta": {
            "$ref": "#/components/schemas/ChoiceDelta"
          },
          "finish_reason": {
            "anyOf": [
              {
                "enum": [
                  "stop",
                  "length",
                  "tool_calls",
                  "content_filter",
                  "function_call"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Finish Reason"
          },
          "index": {
            "title": "Index",
            "type": "integer"
          },
          "logprobs": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ChoiceLogprobs"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          }
        },
        "required": [
          "delta",
          "index"
        ],
        "title": "Choice",
        "type": "object"
      },
      "ChoiceLogprobs": {
        "additionalProperties": true,
        "properties": {
          "content": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/ChatCompletionTokenLogprob"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Content"
          },
          "refusal": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/ChatCompletionTokenLogprob"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Refusal"
          }
        },
        "title": "ChoiceLogprobs",
        "type": "object"
      },
      "Citation": {
        "description": "A citation for a task output.",
        "properties": {
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Title of the citation.",
            "title": "Title"
          },
          "url": {
            "description": "URL of the citation.",
            "title": "Url",
            "type": "string"
          },
          "excerpts": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Excerpts from the citation supporting the output. Only certain processors provide excerpts.",
            "title": "Excerpts"
          }
        },
        "required": [
          "url"
        ],
        "title": "Citation",
        "type": "object"
      },
      "CompletionTokensDetails": {
        "additionalProperties": true,
        "properties": {
          "accepted_prediction_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Accepted Prediction Tokens"
          },
          "audio_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Audio Tokens"
          },
          "reasoning_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Reasoning Tokens"
          },
          "rejected_prediction_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Rejected Prediction Tokens"
          }
        },
        "title": "CompletionTokensDetails",
        "type": "object"
      },
      "CompletionUsage": {
        "additionalProperties": true,
        "properties": {
          "completion_tokens": {
            "title": "Completion Tokens",
            "type": "integer"
          },
          "prompt_tokens": {
            "title": "Prompt Tokens",
            "type": "integer"
          },
          "total_tokens": {
            "title": "Total Tokens",
            "type": "integer"
          },
          "completion_tokens_details": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/CompletionTokensDetails"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "prompt_tokens_details": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/PromptTokensDetails"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          }
        },
        "required": [
          "completion_tokens",
          "prompt_tokens",
          "total_tokens"
        ],
        "title": "CompletionUsage",
        "type": "object"
      },
      "CreateMonitorRequest": {
        "properties": {
          "query": {
            "type": "string",
            "title": "Query",
            "description": "Search query to monitor for material changes.",
            "examples": [
              "Extract recent news about AI"
            ]
          },
          "cadence": {
            "type": "string",
            "enum": [
              "daily",
              "weekly",
              "hourly",
              "every_two_weeks"
            ],
            "title": "Cadence",
            "description": "Cadence of the monitor.",
            "examples": [
              "daily",
              "weekly",
              "hourly",
              "every_two_weeks"
            ]
          },
          "webhook": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MonitorWebhook"
              },
              {
                "type": "null"
              }
            ],
            "description": "Webhook to receive notifications about the monitor's execution."
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "type": "string"
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the monitor. This field is returned in webhook notifications and GET requests, enabling you to map responses to corresponding objects in your application. For example, if you are building a Slackbot that monitors changes, you could store the Slack thread ID here to properly route webhook responses back to the correct conversation thread.",
            "examples": [
              {
                "slack_thread_id": "1234567890.123456",
                "user_id": "U123ABC"
              }
            ]
          },
          "output_schema": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/JsonSchema"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output schema for the monitor event."
          }
        },
        "type": "object",
        "required": [
          "query",
          "cadence"
        ],
        "title": "CreateMonitorRequest",
        "description": "Request to create a monitor."
      },
      "CreateTaskGroupRequest": {
        "properties": {
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the task group."
          }
        },
        "type": "object",
        "title": "CreateTaskGroupRequest",
        "description": "Request to create a task group."
      },
      "Error": {
        "properties": {
          "ref_id": {
            "type": "string",
            "title": "Reference ID",
            "description": "Reference ID for the error."
          },
          "message": {
            "type": "string",
            "title": "Message",
            "description": "Human-readable message."
          },
          "detail": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Detail",
            "description": "Optional detail supporting the error."
          }
        },
        "type": "object",
        "required": [
          "ref_id",
          "message"
        ],
        "title": "Error",
        "description": "An error message."
      },
      "ErrorEvent": {
        "properties": {
          "type": {
            "type": "string",
            "const": "error",
            "title": "Type",
            "description": "Event type; always 'error'."
          },
          "error": {
            "$ref": "#/components/schemas/Error",
            "description": "Error."
          }
        },
        "type": "object",
        "required": [
          "type",
          "error"
        ],
        "title": "ErrorEvent",
        "description": "Event indicating an error."
      },
      "ErrorResponse": {
        "properties": {
          "type": {
            "type": "string",
            "const": "error",
            "title": "Type",
            "description": "Always 'error'."
          },
          "error": {
            "$ref": "#/components/schemas/Error",
            "description": "Error."
          }
        },
        "type": "object",
        "required": [
          "type",
          "error"
        ],
        "title": "ErrorResponse",
        "description": "Response object used for non-200 status codes."
      },
      "ExcerptSettings": {
        "properties": {
          "max_chars_per_result": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Chars Per Result",
            "description": "Optional upper bound on the total number of characters to include per url. Excerpts may contain fewer characters than this limit to maximize relevance and token efficiency. Values below 1000 will be automatically set to 1000."
          },
          "max_chars_total": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Chars Total",
            "description": "Optional upper bound on the total number of characters to include across all urls. Results may contain fewer characters than this limit to maximize relevance and token efficiency. Values below 1000 will be automatically set to 1000. This overall limit applies in addition to max_chars_per_result."
          }
        },
        "type": "object",
        "title": "ExcerptSettings",
        "description": "Optional settings for returning relevant excerpts."
      },
      "ExcludeCandidate": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Name of the entity to exclude from results."
          },
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL of the entity to exclude from results."
          }
        },
        "type": "object",
        "required": [
          "name",
          "url"
        ],
        "title": "ExcludeCandidate",
        "description": "Exclude candidate input model for FindAll run."
      },
      "ExtractError": {
        "properties": {
          "url": {
            "type": "string",
            "title": "Url"
          },
          "error_type": {
            "type": "string",
            "title": "Error Type",
            "description": "Error type."
          },
          "http_status_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Status Code",
            "description": "HTTP status code, if available."
          },
          "content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Content",
            "description": "Content returned for http client or server errors, if any."
          }
        },
        "type": "object",
        "required": [
          "url",
          "error_type",
          "http_status_code",
          "content"
        ],
        "title": "ExtractError",
        "description": "Extract error details."
      },
      "ExtractRequest": {
        "properties": {
          "urls": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Urls"
          },
          "objective": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Objective",
            "description": "If provided, focuses extracted content on the specified search objective."
          },
          "search_queries": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Search Queries",
            "description": "If provided, focuses extracted content on the specified keyword search queries."
          },
          "fetch_policy": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/FetchPolicy"
              },
              {
                "type": "null"
              }
            ],
            "description": "Fetch policy: determines when to return cached content from the index (faster) vs fetching live content (fresher). Default is to use a dynamic policy based on the search objective and url."
          },
          "excerpts": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/components/schemas/ExcerptSettings"
              }
            ],
            "title": "Excerpts",
            "description": "Include excerpts from each URL relevant to the search objective and queries. Note that if neither objective nor search_queries is provided, excerpts are redundant with full content.",
            "default": true
          },
          "full_content": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "$ref": "#/components/schemas/FullContentSettings"
              }
            ],
            "title": "Full Content",
            "description": "Include full content from each URL. Note that if neither objective nor search_queries is provided, excerpts are redundant with full content.",
            "default": false
          }
        },
        "type": "object",
        "required": [
          "urls"
        ],
        "title": "ExtractRequest",
        "description": "Extract request."
      },
      "ExtractResponse": {
        "properties": {
          "extract_id": {
            "type": "string",
            "title": "Extract Id",
            "description": "Extract request ID, e.g. `extract_cad0a6d2dec046bd95ae900527d880e7`"
          },
          "results": {
            "items": {
              "$ref": "#/components/schemas/ExtractResult"
            },
            "type": "array",
            "title": "Results",
            "description": "Successful extract results."
          },
          "errors": {
            "items": {
              "$ref": "#/components/schemas/ExtractError"
            },
            "type": "array",
            "title": "Errors",
            "description": "Extract errors: requested URLs not in the results."
          },
          "warnings": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/Warning"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Warnings",
            "description": "Warnings for the extract request, if any."
          },
          "usage": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/UsageItem"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Usage",
            "description": "Usage metrics for the extract request."
          }
        },
        "type": "object",
        "required": [
          "extract_id",
          "results",
          "errors"
        ],
        "title": "ExtractResponse",
        "description": "Fetch result."
      },
      "ExtractResult": {
        "properties": {
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL associated with the search result."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Title",
            "description": "Title of the webpage, if available."
          },
          "publish_date": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Publish Date",
            "description": "Publish date of the webpage in YYYY-MM-DD format, if available."
          },
          "excerpts": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Excerpts",
            "description": "Relevant excerpted content from the URL, formatted as markdown."
          },
          "full_content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Full Content",
            "description": "Full content from the URL formatted as markdown, if requested."
          }
        },
        "type": "object",
        "required": [
          "url"
        ],
        "title": "ExtractResult",
        "description": "Extract result for a single URL."
      },
      "FetchPolicy": {
        "properties": {
          "max_age_seconds": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Age Seconds",
            "description": "Maximum age of cached content in seconds to trigger a live fetch. Minimum value 600 seconds (10 minutes).",
            "examples": [
              86400
            ]
          },
          "timeout_seconds": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timeout Seconds",
            "description": "Timeout in seconds for fetching live content if unavailable in cache.",
            "examples": [
              60.0
            ]
          },
          "disable_cache_fallback": {
            "type": "boolean",
            "title": "Disable Cache Fallback",
            "description": "If false, fallback to cached content older than max-age if live fetch fails or times out. If true, returns an error instead.",
            "default": false
          }
        },
        "type": "object",
        "title": "FetchPolicy",
        "description": "Policy for live fetching web results."
      },
      "FieldBasis": {
        "description": "Citations and reasoning supporting one field of a task output.",
        "properties": {
          "field": {
            "description": "Name of the output field.",
            "title": "Field",
            "type": "string"
          },
          "citations": {
            "default": [],
            "description": "List of citations supporting the output field.",
            "items": {
              "$ref": "#/components/schemas/Citation"
            },
            "title": "Citations",
            "type": "array"
          },
          "reasoning": {
            "description": "Reasoning for the output field.",
            "title": "Reasoning",
            "type": "string"
          },
          "confidence": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "description": "Confidence level for the output field. Only certain processors provide confidence levels.",
            "examples": [
              "low",
              "medium",
              "high"
            ],
            "title": "Confidence"
          }
        },
        "required": [
          "field",
          "reasoning"
        ],
        "title": "FieldBasis",
        "type": "object"
      },
      "FindAllCandidate": {
        "properties": {
          "candidate_id": {
            "type": "string",
            "title": "Candidate ID",
            "description": "ID of the candidate."
          },
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Name of the candidate."
          },
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL that provides context or details of the entity for disambiguation."
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description",
            "description": "Brief description of the entity that can help answer whether entity satisfies the query."
          },
          "match_status": {
            "type": "string",
            "enum": [
              "generated",
              "matched",
              "unmatched",
              "discarded"
            ],
            "title": "Match Status",
            "description": "Status of the candidate. One of generated, matched, unmatched, discarded."
          },
          "output": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Output",
            "description": "Results of the match condition evaluations for this candidate. This object contains the structured output that determines whether the candidate matches the overall FindAll objective."
          },
          "basis": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/FieldBasis"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Basis",
            "description": "List of FieldBasis objects supporting the output."
          }
        },
        "type": "object",
        "required": [
          "candidate_id",
          "name",
          "url",
          "match_status"
        ],
        "title": "FindAllCandidate",
        "description": "Candidate for a find all run that may end up as a match.\n\nContains all the candidate's metadata and the output of the match conditions.\nA candidate is a match if all match conditions are satisfied."
      },
      "FindAllCandidateMatchStatusEvent": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "findall.candidate.generated",
              "findall.candidate.matched",
              "findall.candidate.unmatched",
              "findall.candidate.discarded",
              "findall.candidate.enriched"
            ],
            "title": "Type",
            "description": "Event type; one of findall.candidate.generated, findall.candidate.matched, findall.candidate.unmatched, findall.candidate.discarded, findall.candidate.enriched."
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "title": "Timestamp",
            "description": "Timestamp of the event."
          },
          "event_id": {
            "type": "string",
            "title": "Event Id",
            "description": "Unique event identifier for the event."
          },
          "data": {
            "$ref": "#/components/schemas/FindAllCandidate",
            "description": "The candidate whose match status has been updated."
          }
        },
        "type": "object",
        "required": [
          "type",
          "timestamp",
          "event_id",
          "data"
        ],
        "title": "FindAllCandidateMatchStatusEvent",
        "description": "Event containing a candidate whose match status has changed."
      },
      "FindAllCandidateMetrics": {
        "properties": {
          "generated_candidates_count": {
            "type": "integer",
            "title": "Generated Candidates Count",
            "description": "Number of candidates that were selected.",
            "default": 0
          },
          "matched_candidates_count": {
            "type": "integer",
            "title": "Matched Candidates Count",
            "description": "Number of candidates that evaluated to matched.",
            "default": 0
          }
        },
        "type": "object",
        "title": "FindAllCandidateMetrics",
        "description": "Metrics object for FindAll run."
      },
      "FindAllEnrichInput": {
        "properties": {
          "processor": {
            "type": "string",
            "title": "Processor",
            "description": "Processor to use for the task.",
            "default": "core"
          },
          "output_schema": {
            "$ref": "#/components/schemas/JsonSchema",
            "description": "JSON schema for the enrichment output schema for the FindAll run."
          },
          "mcp_servers": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/McpServer"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mcp Servers",
            "description": "List of MCP servers to use for the task."
          }
        },
        "type": "object",
        "required": [
          "output_schema"
        ],
        "title": "FindAllEnrichInput",
        "description": "Input model for FindAll enrich."
      },
      "FindAllExtendInput": {
        "properties": {
          "additional_match_limit": {
            "type": "integer",
            "title": "Additional Match Limit",
            "description": "Additional number of matches to find for this FindAll run. This value will be added to the current match limit to determine the new total match limit. Must be greater than 0."
          }
        },
        "type": "object",
        "required": [
          "additional_match_limit"
        ],
        "title": "FindAllExtendInput",
        "description": "Input model for FindAll extend."
      },
      "FindAllRun": {
        "properties": {
          "findall_id": {
            "type": "string",
            "title": "FindAll ID",
            "description": "ID of the FindAll run."
          },
          "status": {
            "$ref": "#/components/schemas/FindAllRunStatus",
            "description": "Status object for the FindAll run."
          },
          "generator": {
            "type": "string",
            "enum": [
              "base",
              "core",
              "pro",
              "preview"
            ],
            "title": "Generator",
            "description": "Generator for the FindAll run."
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "Metadata for the FindAll run."
          },
          "created_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Created At",
            "description": "Timestamp of the creation of the run, in RFC 3339 format."
          },
          "modified_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Modified At",
            "description": "Timestamp of the latest modification to the FindAll run result, in RFC 3339 format."
          }
        },
        "type": "object",
        "required": [
          "findall_id",
          "status",
          "generator"
        ],
        "title": "FindAllRun",
        "description": "FindAll run object with status and metadata."
      },
      "FindAllRunInput": {
        "properties": {
          "objective": {
            "type": "string",
            "title": "Objective",
            "description": "Natural language objective of the FindAll run."
          },
          "entity_type": {
            "type": "string",
            "title": "Entity Type",
            "description": "Type of the entity for the FindAll run."
          },
          "match_conditions": {
            "items": {
              "$ref": "#/components/schemas/MatchCondition"
            },
            "type": "array",
            "title": "Match Conditions",
            "description": "List of match conditions for the FindAll run."
          },
          "generator": {
            "type": "string",
            "enum": [
              "base",
              "core",
              "pro",
              "preview"
            ],
            "title": "Generator",
            "description": "Generator for the FindAll run. One of base, core, pro, preview."
          },
          "match_limit": {
            "type": "integer",
            "title": "Match Limit",
            "description": "Maximum number of matches to find for this FindAll run. Must be between 5 and 1000 (inclusive)."
          },
          "exclude_list": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/ExcludeCandidate"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Exclude List",
            "description": "List of entity names/IDs to exclude from results."
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "Metadata for the FindAll run."
          },
          "webhook": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Webhook"
              },
              {
                "type": "null"
              }
            ],
            "description": "Webhook for the FindAll run."
          }
        },
        "type": "object",
        "required": [
          "objective",
          "entity_type",
          "match_conditions",
          "generator",
          "match_limit"
        ],
        "title": "FindAllRunInput",
        "description": "Input model for FindAll run."
      },
      "FindAllRunResult": {
        "properties": {
          "run": {
            "$ref": "#/components/schemas/FindAllRun",
            "description": "FindAll run object."
          },
          "candidates": {
            "items": {
              "$ref": "#/components/schemas/FindAllCandidate"
            },
            "type": "array",
            "title": "Candidates",
            "description": "All evaluated candidates at the time of the snapshot."
          },
          "last_event_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Event Id",
            "description": "ID of the last event of the run at the time of the request. This can be used to resume streaming from the last event."
          }
        },
        "type": "object",
        "required": [
          "run",
          "candidates"
        ],
        "title": "FindAllRunResult",
        "description": "Complete FindAll search results.\n\nRepresents a snapshot of a FindAll run, including run metadata and a list of\ncandidate entities with their match status and details at the time the snapshot was\ntaken."
      },
      "FindAllRunStatus": {
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "queued",
              "action_required",
              "running",
              "completed",
              "failed",
              "cancelling",
              "cancelled"
            ],
            "title": "Status",
            "description": "Status of the FindAll run."
          },
          "is_active": {
            "type": "boolean",
            "title": "Is Active",
            "description": "Whether the FindAll run is active"
          },
          "metrics": {
            "$ref": "#/components/schemas/FindAllCandidateMetrics",
            "description": "Candidate metrics for the FindAll run."
          },
          "termination_reason": {
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "low_match_rate",
                  "match_limit_met",
                  "candidates_exhausted",
                  "user_cancelled",
                  "error_occurred",
                  "timeout",
                  "insufficient_funds"
                ]
              },
              {
                "type": "null"
              }
            ],
            "title": "Termination Reason",
            "description": "Reason for termination when FindAll run is in terminal status."
          }
        },
        "type": "object",
        "required": [
          "status",
          "is_active",
          "metrics"
        ],
        "title": "FindAllRunStatus",
        "description": "Status object for FindAll run."
      },
      "FindAllRunStatusEvent": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "findall.status"
            ],
            "const": "findall.status",
            "title": "Type",
            "description": "Event type; always 'findall.status'."
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "title": "Timestamp",
            "description": "Timestamp of the event."
          },
          "event_id": {
            "type": "string",
            "title": "Event Id",
            "description": "Unique event identifier for the event."
          },
          "data": {
            "$ref": "#/components/schemas/FindAllRun",
            "description": "Updated FindAll run information."
          }
        },
        "type": "object",
        "required": [
          "type",
          "timestamp",
          "event_id",
          "data"
        ],
        "title": "FindAllRunStatusEvent",
        "description": "Event containing status update for FindAll run."
      },
      "FindAllSchema": {
        "properties": {
          "objective": {
            "type": "string",
            "title": "Objective",
            "description": "Natural language objective of the FindAll run.",
            "examples": [
              "Find all AI companies that raised Series A funding in 2024"
            ]
          },
          "entity_type": {
            "type": "string",
            "title": "Entity Type",
            "description": "Type of the entity for the FindAll run."
          },
          "match_conditions": {
            "items": {
              "$ref": "#/components/schemas/MatchCondition"
            },
            "type": "array",
            "title": "Match Conditions",
            "description": "List of match conditions for the FindAll run."
          },
          "enrichments": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/FindAllEnrichInput"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Enrichments",
            "description": "List of enrichment inputs for the FindAll run."
          },
          "generator": {
            "type": "string",
            "enum": [
              "base",
              "core",
              "pro",
              "preview"
            ],
            "title": "Generator",
            "description": "The generator of the FindAll run.",
            "default": "core"
          },
          "match_limit": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Match Limit",
            "description": "Max number of candidates to evaluate"
          }
        },
        "type": "object",
        "required": [
          "objective",
          "entity_type",
          "match_conditions"
        ],
        "title": "FindAllSchema",
        "description": "Response model for FindAll ingest."
      },
      "FindAllSchemaUpdatedEvent": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "findall.schema.updated"
            ],
            "const": "findall.schema.updated",
            "title": "Type",
            "description": "Event type; always 'findall.schema.updated'."
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "title": "Timestamp",
            "description": "Timestamp of the event."
          },
          "event_id": {
            "type": "string",
            "title": "Event Id",
            "description": "Unique event identifier for the event."
          },
          "data": {
            "$ref": "#/components/schemas/FindAllSchema",
            "description": "Updated FindAll schema."
          }
        },
        "type": "object",
        "required": [
          "type",
          "timestamp",
          "event_id",
          "data"
        ],
        "title": "FindAllSchemaUpdatedEvent",
        "description": "Event containing full snapshot of FindAll run state."
      },
      "FullContentSettings": {
        "properties": {
          "max_chars_per_result": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Chars Per Result",
            "description": "Optional limit on the number of characters to include in the full content for each url. Full content always starts at the beginning of the page and is truncated at the limit if necessary."
          }
        },
        "type": "object",
        "title": "FullContentSettings",
        "description": "Optional settings for returning full content."
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "IngestInput": {
        "properties": {
          "objective": {
            "type": "string",
            "title": "Objective",
            "description": "Natural language objective to create a FindAll run spec.",
            "examples": [
              "Find all AI companies that raised Series A funding in 2024"
            ]
          }
        },
        "type": "object",
        "required": [
          "objective"
        ],
        "title": "IngestInput",
        "description": "Input model for FindAll ingest."
      },
      "JSONSchema": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "schema": {
            "additionalProperties": false,
            "type": "object",
            "title": "Schema"
          },
          "strict": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Strict"
          }
        },
        "type": "object",
        "required": [
          "name"
        ],
        "title": "JSONSchema"
      },
      "JsonSchema": {
        "properties": {
          "json_schema": {
            "additionalProperties": true,
            "type": "object",
            "title": "Json Schema",
            "description": "A JSON Schema object. Only a subset of JSON Schema is supported.",
            "examples": [
              {
                "additionalProperties": false,
                "properties": {
                  "gdp": {
                    "description": "GDP in USD for the year, formatted like '$3.1 trillion (2023)'",
                    "type": "string"
                  }
                },
                "required": [
                  "gdp"
                ],
                "type": "object"
              }
            ]
          },
          "type": {
            "type": "string",
            "const": "json",
            "title": "Type",
            "description": "The type of schema being defined. Always `json`.",
            "default": "json"
          }
        },
        "type": "object",
        "required": [
          "json_schema"
        ],
        "title": "JsonSchema",
        "description": "JSON schema for a task input or output."
      },
      "MatchCondition": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Name of the match condition."
          },
          "description": {
            "type": "string",
            "title": "Description",
            "description": "Detailed description of the match condition. Include as much specific information as possible to help improve the quality and accuracy of Find All run results.",
            "examples": [
              "Company must have SOC2 Type II certification (not Type I). Look for evidence in: trust centers, security/compliance pages, audit reports, or press releases specifically mentioning 'SOC2 Type II'. If no explicit SOC2 Type II mention is found, consider requirement not satisfied."
            ]
          }
        },
        "type": "object",
        "required": [
          "name",
          "description"
        ],
        "title": "MatchCondition",
        "description": "Match condition model for FindAll ingest."
      },
      "McpServer": {
        "properties": {
          "type": {
            "type": "string",
            "const": "url",
            "title": "Type",
            "description": "Type of MCP server being configured. Always `url`.",
            "default": "url"
          },
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL of the MCP server."
          },
          "headers": {
            "anyOf": [
              {
                "additionalProperties": {
                  "type": "string",
                  "format": "password",
                  "writeOnly": true
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Headers",
            "description": "Headers for the MCP server."
          },
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Name of the MCP server."
          },
          "allowed_tools": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Allowed Tools",
            "description": "List of allowed tools for the MCP server."
          }
        },
        "type": "object",
        "required": [
          "url",
          "name"
        ],
        "title": "McpServer",
        "description": "MCP server configuration."
      },
      "McpToolCall": {
        "properties": {
          "tool_call_id": {
            "type": "string",
            "title": "Tool Call ID",
            "description": "Identifier for the tool call."
          },
          "server_name": {
            "type": "string",
            "title": "Server Name",
            "description": "Name of the MCP server."
          },
          "tool_name": {
            "type": "string",
            "title": "Tool Name",
            "description": "Name of the tool being called."
          },
          "arguments": {
            "type": "string",
            "title": "Arguments",
            "description": "Arguments used to call the MCP tool."
          },
          "content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Content",
            "description": "Output received from the tool call, if successful."
          },
          "error": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Error",
            "description": "Error message if the tool call failed."
          }
        },
        "type": "object",
        "required": [
          "tool_call_id",
          "server_name",
          "tool_name",
          "arguments"
        ],
        "title": "McpToolCall",
        "description": "Result of an MCP tool call."
      },
      "MonitorCompletion": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "completion"
            ],
            "const": "completion",
            "title": "Type",
            "description": "Type of the event.",
            "default": "completion"
          },
          "monitor_ts": {
            "type": "string",
            "title": "Monitor Ts",
            "description": "Identifier for the completed event.",
            "examples": [
              "completed_2025-01-15T10:30:00Z"
            ]
          }
        },
        "type": "object",
        "required": [
          "monitor_ts"
        ],
        "title": "MonitorCompletion",
        "description": "Completion event for a monitor run."
      },
      "MonitorEventDetail": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "event"
            ],
            "const": "event",
            "title": "Type",
            "description": "Type of the event.",
            "default": "event"
          },
          "event_group_id": {
            "type": "string",
            "title": "Event Group Id",
            "description": "Event group ID."
          },
          "output": {
            "type": "string",
            "title": "Output",
            "description": "Detected change or event. Deprecated: use 'result' field instead.",
            "deprecated": true
          },
          "event_date": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Event Date",
            "description": "Date when event occurred.",
            "examples": [
              "2025-01-15"
            ]
          },
          "source_urls": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Source Urls",
            "description": "List of source URLs supporting the event.",
            "examples": [
              [
                "https://example.com/news"
              ]
            ]
          },
          "result": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/MonitorEventTextResult"
              },
              {
                "$ref": "#/components/schemas/MonitorEventJsonResult"
              }
            ],
            "title": "Result",
            "description": "Output from the event. Either Text or JSON output.",
            "discriminator": {
              "propertyName": "type",
              "mapping": {
                "json": "#/components/schemas/MonitorEventJsonResult",
                "text": "#/components/schemas/MonitorEventTextResult"
              }
            }
          }
        },
        "type": "object",
        "required": [
          "event_group_id",
          "output",
          "source_urls",
          "result"
        ],
        "title": "MonitorEventDetail",
        "description": "Event response for a material change detected by a monitor."
      },
      "MonitorEventJsonResult": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "json"
            ],
            "const": "json",
            "title": "Type",
            "description": "Type of the result.",
            "default": "json"
          },
          "content": {
            "additionalProperties": true,
            "type": "object",
            "title": "Content",
            "description": "JSON content of the result."
          }
        },
        "type": "object",
        "required": [
          "content"
        ],
        "title": "MonitorEventJsonResult",
        "description": "JSON result for a monitor event."
      },
      "MonitorEventList": {
        "properties": {
          "events": {
            "items": {
              "oneOf": [
                {
                  "$ref": "#/components/schemas/MonitorEventDetail"
                },
                {
                  "$ref": "#/components/schemas/MonitorExecutionError"
                },
                {
                  "$ref": "#/components/schemas/MonitorCompletion"
                }
              ],
              "discriminator": {
                "propertyName": "type",
                "mapping": {
                  "completion": "#/components/schemas/MonitorCompletion",
                  "error": "#/components/schemas/MonitorExecutionError",
                  "event": "#/components/schemas/MonitorEventDetail"
                }
              }
            },
            "type": "array",
            "title": "Events",
            "description": "List of execution events for the monitor."
          }
        },
        "type": "object",
        "required": [
          "events"
        ],
        "title": "MonitorEventList",
        "description": "Response containing monitor execution history."
      },
      "MonitorEventTextResult": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "text"
            ],
            "const": "text",
            "title": "Type",
            "description": "Type of the result.",
            "default": "text"
          },
          "content": {
            "type": "string",
            "title": "Content",
            "description": "Text content of the result."
          }
        },
        "type": "object",
        "required": [
          "content"
        ],
        "title": "MonitorEventTextResult",
        "description": "Text result for a monitor event."
      },
      "MonitorExecutionError": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "error"
            ],
            "const": "error",
            "title": "Type",
            "description": "Type of the event.",
            "default": "error"
          },
          "error": {
            "type": "string",
            "title": "Error",
            "description": "Human-readable error message."
          },
          "id": {
            "type": "string",
            "title": "Id",
            "description": "Identifier for the error event."
          },
          "date": {
            "type": "string",
            "format": "date-time",
            "title": "Date",
            "description": "Timestamp when the error occurred."
          }
        },
        "type": "object",
        "required": [
          "error",
          "id",
          "date"
        ],
        "title": "MonitorExecutionError",
        "description": "Error event for a monitor run."
      },
      "MonitorResponse": {
        "properties": {
          "monitor_id": {
            "type": "string",
            "title": "Monitor ID",
            "description": "ID of the monitor."
          },
          "query": {
            "type": "string",
            "title": "Query",
            "description": "The query being monitored.",
            "examples": [
              "Recent news about LLM models."
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "active",
              "canceled"
            ],
            "title": "Status",
            "description": "Status of the monitor.",
            "examples": [
              "active",
              "canceled"
            ]
          },
          "cadence": {
            "type": "string",
            "enum": [
              "daily",
              "weekly",
              "hourly",
              "every_two_weeks"
            ],
            "title": "Cadence",
            "description": "Cadence of the monitor.",
            "examples": [
              "daily",
              "weekly",
              "hourly",
              "every_two_weeks"
            ]
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "type": "string"
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the monitor.",
            "examples": [
              {
                "key": "value"
              }
            ]
          },
          "webhook": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MonitorWebhook"
              },
              {
                "type": "null"
              }
            ],
            "description": "Webhook configuration for the monitor."
          },
          "output_schema": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/JsonSchema"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output schema for the monitor event."
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At",
            "description": "Timestamp of the creation of the monitor.",
            "examples": [
              "2025-01-15T10:30:00Z"
            ]
          },
          "last_run_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Run At",
            "description": "Timestamp of the last run for the monitor.",
            "examples": [
              "2025-01-15T10:30:00Z"
            ]
          }
        },
        "type": "object",
        "required": [
          "monitor_id",
          "query",
          "status",
          "cadence",
          "created_at"
        ],
        "title": "MonitorResponse",
        "description": "Response object for a monitor, including its status, cadence and metadata."
      },
      "MonitorWebhook": {
        "properties": {
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL for the webhook.",
            "examples": [
              "https://example.com/webhook"
            ]
          },
          "event_types": {
            "items": {
              "type": "string",
              "enum": [
                "monitor.event.detected",
                "monitor.execution.completed",
                "monitor.execution.failed"
              ]
            },
            "type": "array",
            "title": "Event Types",
            "description": "Event types to send the webhook notifications for."
          }
        },
        "type": "object",
        "required": [
          "url"
        ],
        "title": "MonitorWebhook",
        "description": "Webhook configuration for a monitor."
      },
      "PromptTokensDetails": {
        "additionalProperties": true,
        "properties": {
          "audio_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Audio Tokens"
          },
          "cached_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Cached Tokens"
          }
        },
        "title": "PromptTokensDetails",
        "type": "object"
      },
      "ResponseFormatJSONObject": {
        "properties": {
          "type": {
            "type": "string",
            "const": "json_object",
            "title": "Type"
          }
        },
        "type": "object",
        "required": [
          "type"
        ],
        "title": "ResponseFormatJSONObject"
      },
      "ResponseFormatJSONSchema": {
        "properties": {
          "json_schema": {
            "$ref": "#/components/schemas/JSONSchema"
          },
          "type": {
            "type": "string",
            "const": "json_schema",
            "title": "Type"
          }
        },
        "type": "object",
        "required": [
          "json_schema",
          "type"
        ],
        "title": "ResponseFormatJSONSchema"
      },
      "ResponseFormatText": {
        "properties": {
          "type": {
            "type": "string",
            "const": "text",
            "title": "Type"
          }
        },
        "type": "object",
        "required": [
          "type"
        ],
        "title": "ResponseFormatText"
      },
      "SearchRequest": {
        "properties": {
          "mode": {
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "one-shot",
                  "agentic",
                  "fast"
                ]
              },
              {
                "type": "null"
              }
            ],
            "title": "Mode",
            "description": "Presets default values for parameters for different use cases.\n - `one-shot` returns more comprehensive results and longer excerpts to answer questions from a single response\n- `agentic` returns more concise, token-efficient results for use in an agentic loop\n- `fast` trades some quality for lower latency, with best results when used with concise and high-quality objective and keyword queries",
            "default": "one-shot"
          },
          "objective": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Objective",
            "description": "Natural-language description of what the web search is trying to find. May include guidance about preferred sources or freshness. At least one of objective or search_queries must be provided."
          },
          "search_queries": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Search Queries",
            "description": "Optional list of traditional keyword search queries to guide the search. May contain search operators. At least one of objective or search_queries must be provided."
          },
          "processor": {
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "base",
                  "pro"
                ]
              },
              {
                "type": "null"
              }
            ],
            "title": "Processor",
            "description": "DEPRECATED: use `mode` instead.",
            "deprecated": true,
            "hidden": true
          },
          "max_results": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Results",
            "description": "Upper bound on the number of results to return. Defaults to 10 if not provided.",
            "default": 10
          },
          "max_chars_per_result": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Chars Per Result",
            "description": "DEPRECATED: Use `excerpts.max_chars_per_result` instead.",
            "deprecated": true,
            "hidden": true
          },
          "excerpts": {
            "$ref": "#/components/schemas/ExcerptSettings",
            "description": "Optional settings to configure excerpt generation."
          },
          "source_policy": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SourcePolicy"
              },
              {
                "type": "null"
              }
            ],
            "description": "Optional source policy governing domain and date preferences in search results."
          },
          "fetch_policy": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/FetchPolicy"
              },
              {
                "type": "null"
              }
            ],
            "description": "Fetch policy: determines when to return cached content from the index (faster) vs fetching live content (fresher). Default is to disable live fetch and return cached content from the index."
          }
        },
        "type": "object",
        "title": "SearchRequest",
        "description": "Request to Search API."
      },
      "SearchResponse": {
        "properties": {
          "search_id": {
            "type": "string",
            "title": "Search Id",
            "description": "Search ID. Example: `search_cad0a6d2dec046bd95ae900527d880e7`"
          },
          "results": {
            "items": {
              "$ref": "#/components/schemas/WebSearchResult"
            },
            "type": "array",
            "title": "Results",
            "description": "A list of WebSearchResult objects, ordered by decreasing relevance."
          },
          "warnings": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/Warning"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Warnings",
            "description": "Warnings for the search request, if any."
          },
          "usage": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/UsageItem"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Usage",
            "description": "Usage metrics for the search request."
          }
        },
        "type": "object",
        "required": [
          "search_id",
          "results"
        ],
        "title": "SearchResponse",
        "description": "Output for the Search API."
      },
      "SourcePolicy": {
        "properties": {
          "include_domains": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Include Domains",
            "description": "List of domains to restrict the results to. If specified, only sources from these domains will be included. Accepts plain domains (e.g., example.com, subdomain.example.gov) or bare domain extension starting with a period (e.g., .gov, .edu, .co.uk).",
            "examples": [
              [
                "wikipedia.org",
                "usa.gov",
                ".edu"
              ]
            ]
          },
          "exclude_domains": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Exclude Domains",
            "description": "List of domains to exclude from results. If specified, sources from these domains will be excluded. Accepts plain domains (e.g., example.com, subdomain.example.gov) or bare domain extension starting with a period (e.g., .gov, .edu, .co.uk).",
            "examples": [
              [
                "reddit.com",
                "x.com",
                ".ai"
              ]
            ]
          },
          "after_date": {
            "anyOf": [
              {
                "type": "string",
                "format": "date"
              },
              {
                "type": "null"
              }
            ],
            "title": "After Date",
            "description": "Optional start date for filtering search results. Results will be limited to content published on or after this date. Provided as an RFC 3339 date string (YYYY-MM-DD).",
            "examples": [
              "2024-01-01"
            ]
          }
        },
        "type": "object",
        "title": "SourcePolicy",
        "description": "Source policy for web search results.\n\nThis policy governs which sources are allowed/disallowed in results."
      },
      "TaskGroupResponse": {
        "properties": {
          "taskgroup_id": {
            "type": "string",
            "title": "Taskgroup ID",
            "description": "ID of the group."
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the group."
          },
          "status": {
            "$ref": "#/components/schemas/TaskGroupStatus",
            "description": "Status of the group."
          },
          "created_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Created At",
            "description": "Timestamp of the creation of the group, as an RFC 3339 string.",
            "examples": [
              "2025-04-24T18:56:22.513132Z"
            ]
          }
        },
        "type": "object",
        "required": [
          "taskgroup_id",
          "status",
          "created_at"
        ],
        "title": "TaskGroupResponse",
        "description": "Response object for a task group, including its status and metadata."
      },
      "TaskGroupRunRequest": {
        "properties": {
          "default_task_spec": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/TaskSpec"
              },
              {
                "type": "null"
              }
            ],
            "description": "Default task spec to use for the runs. If task_spec is specified in a run, it overrides this default."
          },
          "inputs": {
            "items": {
              "$ref": "#/components/schemas/BetaTaskRunInput"
            },
            "type": "array",
            "title": "Inputs",
            "description": "List of task runs to execute. Up to 1,000 runs can be specified per request. If you'd like to add more runs, split them across multiple TaskGroup POST requests."
          }
        },
        "type": "object",
        "required": [
          "inputs"
        ],
        "title": "TaskGroupRunRequest",
        "description": "Request to initiate new task runs in a task group."
      },
      "TaskGroupRunResponse": {
        "properties": {
          "status": {
            "$ref": "#/components/schemas/TaskGroupStatus",
            "description": "Status of the group."
          },
          "run_ids": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Run IDs",
            "description": "IDs of the newly created runs."
          },
          "run_cursor": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Run Cursor",
            "description": "Cursor for these runs in the run stream at taskgroup/runs?last_event_id=<run_cursor>. Empty for the first runs in the group."
          },
          "event_cursor": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Event Cursor",
            "description": "Cursor for these runs in the event stream at taskgroup/events?last_event_id=<event_cursor>. Empty for the first runs in the group."
          }
        },
        "type": "object",
        "required": [
          "status",
          "run_ids",
          "run_cursor",
          "event_cursor"
        ],
        "title": "TaskGroupRunResponse",
        "description": "Response from adding new task runs to a task group."
      },
      "TaskGroupStatus": {
        "properties": {
          "num_task_runs": {
            "type": "integer",
            "title": "Num Task Runs",
            "description": "Number of task runs in the group."
          },
          "task_run_status_counts": {
            "additionalProperties": {
              "type": "integer"
            },
            "propertyNames": {
              "enum": [
                "queued",
                "action_required",
                "running",
                "completed",
                "failed",
                "cancelling",
                "cancelled"
              ]
            },
            "type": "object",
            "title": "Task Run Status Counts",
            "description": "Number of task runs with each status."
          },
          "is_active": {
            "type": "boolean",
            "title": "Is Active",
            "description": "True if at least one run in the group is currently active, i.e. status is one of {'cancelling', 'queued', 'running'}."
          },
          "status_message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status Message",
            "description": "Human-readable status message for the group."
          },
          "modified_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Modified At",
            "description": "Timestamp of the last status update to the group, as an RFC 3339 string.",
            "examples": [
              "2025-04-24T18:56:22.513132Z"
            ]
          }
        },
        "type": "object",
        "required": [
          "num_task_runs",
          "task_run_status_counts",
          "is_active",
          "status_message",
          "modified_at"
        ],
        "title": "TaskGroupStatus",
        "description": "Status of a task group."
      },
      "TaskGroupStatusEvent": {
        "properties": {
          "type": {
            "type": "string",
            "const": "task_group_status",
            "title": "Type",
            "description": "Event type; always 'task_group_status'."
          },
          "event_id": {
            "type": "string",
            "title": "Event ID",
            "description": "Cursor to resume the event stream."
          },
          "status": {
            "$ref": "#/components/schemas/TaskGroupStatus",
            "description": "Task group status object."
          }
        },
        "type": "object",
        "required": [
          "type",
          "event_id",
          "status"
        ],
        "title": "TaskGroupStatusEvent",
        "description": "Event indicating an update to group status."
      },
      "TaskRun": {
        "properties": {
          "run_id": {
            "type": "string",
            "title": "Run ID",
            "description": "ID of the task run.",
            "examples": [
              "trun_e0083b6aac0544eb8686e8d2a76533d2"
            ]
          },
          "interaction_id": {
            "type": "string",
            "title": "Interaction ID",
            "description": "Identifier for this interaction. Pass this value as `previous_interaction_id` to reuse context for a future request.",
            "examples": [
              "trun_e0083b6aac0544eb8686e8d2a76533d2"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "queued",
              "action_required",
              "running",
              "completed",
              "failed",
              "cancelling",
              "cancelled"
            ],
            "title": "Status",
            "description": "Status of the run.",
            "examples": [
              "queued",
              "action_required",
              "running",
              "completed",
              "failed",
              "cancelling",
              "cancelled"
            ]
          },
          "is_active": {
            "type": "boolean",
            "title": "Is Active",
            "description": "Whether the run is currently active, i.e. status is one of {'cancelling', 'queued', 'running'}."
          },
          "warnings": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/Warning"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Warnings",
            "description": "Warnings for the run, if any.",
            "examples": [
              []
            ]
          },
          "error": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Error"
              },
              {
                "type": "null"
              }
            ],
            "description": "Error for the run, present only if status is 'failed'."
          },
          "processor": {
            "type": "string",
            "title": "Processor",
            "description": "Processor used for the run.",
            "examples": [
              "base"
            ]
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the run.",
            "examples": [
              {}
            ]
          },
          "taskgroup_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Taskgroup ID",
            "description": "ID of the taskgroup to which the run belongs."
          },
          "created_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Created At",
            "description": "Timestamp of the creation of the task, as an RFC 3339 string.",
            "examples": [
              "2025-04-24T18:56:22.513132Z"
            ]
          },
          "modified_at": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Modified At",
            "description": "Timestamp of the last modification to the task, as an RFC 3339 string.",
            "examples": [
              "2025-04-24T18:56:22.513132Z"
            ]
          }
        },
        "type": "object",
        "required": [
          "run_id",
          "interaction_id",
          "status",
          "is_active",
          "processor",
          "created_at",
          "modified_at"
        ],
        "title": "TaskRun",
        "description": "Status of a task run."
      },
      "TaskRunEvent": {
        "properties": {
          "type": {
            "type": "string",
            "const": "task_run.state",
            "title": "Type",
            "description": "Event type; always 'task_run.state'."
          },
          "event_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Event ID",
            "description": "Cursor to resume the event stream. Always empty for non Task Group runs."
          },
          "input": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/BetaTaskRunInput"
              },
              {
                "type": "null"
              }
            ],
            "description": "Input to the run; included only if requested."
          },
          "run": {
            "$ref": "#/components/schemas/TaskRun",
            "description": "Task run object."
          },
          "output": {
            "anyOf": [
              {
                "oneOf": [
                  {
                    "$ref": "#/components/schemas/TaskRunTextOutput"
                  },
                  {
                    "$ref": "#/components/schemas/TaskRunJsonOutput"
                  }
                ],
                "discriminator": {
                  "propertyName": "type",
                  "mapping": {
                    "json": "#/components/schemas/TaskRunJsonOutput",
                    "text": "#/components/schemas/TaskRunTextOutput"
                  }
                }
              },
              {
                "type": "null"
              }
            ],
            "title": "Output",
            "description": "Output from the run; included only if requested and if status == `completed`."
          }
        },
        "type": "object",
        "required": [
          "type",
          "event_id",
          "run"
        ],
        "title": "TaskRunEvent",
        "description": "Event when a task run transitions to a non-active status.\n\nMay indicate completion, cancellation, or failure."
      },
      "TaskRunInput": {
        "properties": {
          "processor": {
            "type": "string",
            "title": "Processor",
            "description": "Processor to use for the task.",
            "examples": [
              "base"
            ]
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "integer"
                    },
                    {
                      "type": "number"
                    },
                    {
                      "type": "boolean"
                    }
                  ]
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "User-provided metadata stored with the run. Keys and values must be strings with a maximum length of 16 and 512 characters respectively."
          },
          "source_policy": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SourcePolicy"
              },
              {
                "type": "null"
              }
            ],
            "description": "Optional source policy governing preferred and disallowed domains in web search results."
          },
          "task_spec": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/TaskSpec"
              },
              {
                "type": "null"
              }
            ],
            "description": "Task specification. If unspecified, defaults to auto output schema."
          },
          "input": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "additionalProperties": true,
                "type": "object"
              }
            ],
            "title": "Input",
            "description": "Input to the task, either text or a JSON object.",
            "examples": [
              "What was the GDP of France in 2023?",
              "{\"country\": \"France\", \"year\": 2023}"
            ]
          },
          "previous_interaction_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Previous Interaction Id",
            "description": "Interaction ID to use as context for this request."
          }
        },
        "type": "object",
        "required": [
          "processor",
          "input"
        ],
        "title": "TaskRunInput",
        "description": "Request to run a task."
      },
      "TaskRunJsonOutput": {
        "properties": {
          "basis": {
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "type": "array",
            "title": "Basis",
            "description": "Basis for each top-level field in the JSON output. Per-list-element basis entries are available only when the `parallel-beta: field-basis-2025-11-25` header is supplied."
          },
          "type": {
            "type": "string",
            "const": "json",
            "title": "Type",
            "description": "The type of output being returned, as determined by the output schema of the task spec."
          },
          "beta_fields": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Beta Fields",
            "description": "Additional fields from beta features used in this task run. When beta features are specified during both task run creation and result retrieval, this field will be empty and instead the relevant beta attributes will be directly included in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta features were specified during task run creation but not during result retrieval, this field will contain the dump of fields from those beta features.\nEach key represents the beta feature version (one amongst parallel-beta headers) and the values correspond to the beta feature attributes, if any. For now, only MCP server beta features have attributes. For example, `{mcp-server-2025-07-17: [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`"
          },
          "content": {
            "additionalProperties": true,
            "type": "object",
            "title": "Content",
            "description": "Output from the task as a native JSON object, as determined by the output schema of the task spec."
          },
          "output_schema": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Output Schema",
            "description": "Output schema for the Task Run. Populated only if the task was executed with an auto schema."
          }
        },
        "type": "object",
        "required": [
          "basis",
          "type",
          "content"
        ],
        "title": "TaskRunJsonOutput",
        "description": "Output from a task that returns JSON."
      },
      "TaskRunProgressMessageEvent": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "task_run.progress_msg.plan",
              "task_run.progress_msg.search",
              "task_run.progress_msg.result",
              "task_run.progress_msg.tool_call",
              "task_run.progress_msg.exec_status"
            ],
            "title": "Type",
            "description": "Event type; always starts with 'task_run.progress_msg'."
          },
          "message": {
            "type": "string",
            "title": "Message",
            "description": "Progress update message."
          },
          "timestamp": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timestamp",
            "description": "Timestamp of the message."
          }
        },
        "type": "object",
        "required": [
          "type",
          "message",
          "timestamp"
        ],
        "title": "TaskRunProgressMessageEvent",
        "description": "A message for a task run progress update."
      },
      "TaskRunProgressStatsEvent": {
        "properties": {
          "type": {
            "type": "string",
            "const": "task_run.progress_stats",
            "title": "Type",
            "description": "Event type; always 'task_run.progress_stats'."
          },
          "source_stats": {
            "$ref": "#/components/schemas/TaskRunSourceStats",
            "description": "Source stats describing progress so far."
          },
          "progress_meter": {
            "type": "number",
            "title": "Progress Meter",
            "description": "Completion percentage of the task run. Ranges from 0 to 100 where 0 indicates no progress and 100 indicates completion."
          }
        },
        "type": "object",
        "required": [
          "type",
          "source_stats",
          "progress_meter"
        ],
        "title": "TaskRunProgressStatsEvent",
        "description": "A progress update for a task run."
      },
      "TaskRunResult": {
        "properties": {
          "run": {
            "$ref": "#/components/schemas/TaskRun",
            "description": "Task run object with status 'completed'."
          },
          "output": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/TaskRunTextOutput"
              },
              {
                "$ref": "#/components/schemas/TaskRunJsonOutput"
              }
            ],
            "title": "Output",
            "description": "Output from the task conforming to the output schema.",
            "discriminator": {
              "propertyName": "type",
              "mapping": {
                "json": "#/components/schemas/TaskRunJsonOutput",
                "text": "#/components/schemas/TaskRunTextOutput"
              }
            }
          }
        },
        "type": "object",
        "required": [
          "run",
          "output"
        ],
        "title": "TaskRunResult",
        "description": "Result of a task run."
      },
      "TaskRunSourceStats": {
        "properties": {
          "num_sources_considered": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Num Sources Considered",
            "description": "Number of sources considered in processing the task."
          },
          "num_sources_read": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Num Sources Read",
            "description": "Number of sources read in processing the task."
          },
          "sources_read_sample": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Sources Read Sample",
            "description": "A sample of URLs of sources read in processing the task."
          }
        },
        "type": "object",
        "required": [
          "num_sources_considered",
          "num_sources_read",
          "sources_read_sample"
        ],
        "title": "TaskRunSourceStats",
        "description": "Source stats for a task run."
      },
      "TaskRunTextOutput": {
        "properties": {
          "basis": {
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "type": "array",
            "title": "Basis",
            "description": "Basis for the output. The basis has a single field 'output'."
          },
          "type": {
            "type": "string",
            "const": "text",
            "title": "Type",
            "description": "The type of output being returned, as determined by the output schema of the task spec."
          },
          "beta_fields": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Beta Fields",
            "description": "Additional fields from beta features used in this task run. When beta features are specified during both task run creation and result retrieval, this field will be empty and instead the relevant beta attributes will be directly included in the `BetaTaskRunJsonOutput` or corresponding output type. However, if beta features were specified during task run creation but not during result retrieval, this field will contain the dump of fields from those beta features.\nEach key represents the beta feature version (one amongst parallel-beta headers) and the values correspond to the beta feature attributes, if any. For now, only MCP server beta features have attributes. For example, `{mcp-server-2025-07-17: [{'server_name':'mcp_server', 'tool_call_id': 'tc_123', ...}]}}`"
          },
          "content": {
            "type": "string",
            "title": "Content",
            "description": "Text output from the task."
          }
        },
        "type": "object",
        "required": [
          "basis",
          "type",
          "content"
        ],
        "title": "TaskRunTextOutput",
        "description": "Output from a task that returns text."
      },
      "TaskSpec": {
        "properties": {
          "output_schema": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/JsonSchema"
              },
              {
                "$ref": "#/components/schemas/TextSchema"
              },
              {
                "$ref": "#/components/schemas/AutoSchema"
              },
              {
                "type": "string"
              }
            ],
            "title": "Output Schema",
            "description": "JSON schema or text fully describing the desired output from the task. Descriptions of output fields will determine the form and content of the response. A bare string is equivalent to a text schema with the same description."
          },
          "input_schema": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/components/schemas/JsonSchema"
              },
              {
                "$ref": "#/components/schemas/TextSchema"
              },
              {
                "type": "null"
              }
            ],
            "title": "Input Schema",
            "description": "Optional JSON schema or text description of expected input to the task. A bare string is equivalent to a text schema with the same description."
          }
        },
        "type": "object",
        "required": [
          "output_schema"
        ],
        "title": "TaskSpec",
        "description": "Specification for a task.\n\nAuto output schemas can be specified by setting `output_schema={\"type\":\"auto\"}`. Not\nspecifying a TaskSpec is the same as setting an auto output schema.\n\nFor convenience bare strings are also accepted as input or output schemas."
      },
      "TextSchema": {
        "properties": {
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description",
            "description": "A text description of the desired output from the task.",
            "examples": [
              "GDP in USD for the year, formatted like '$3.1 trillion (2023)'"
            ]
          },
          "type": {
            "type": "string",
            "const": "text",
            "title": "Type",
            "description": "The type of schema being defined. Always `text`.",
            "default": "text"
          }
        },
        "type": "object",
        "title": "TextSchema",
        "description": "Text description for a task input or output."
      },
      "TopLogprob": {
        "additionalProperties": true,
        "properties": {
          "token": {
            "title": "Token",
            "type": "string"
          },
          "bytes": {
            "anyOf": [
              {
                "items": {
                  "type": "integer"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Bytes"
          },
          "logprob": {
            "title": "Logprob",
            "type": "number"
          }
        },
        "required": [
          "token",
          "logprob"
        ],
        "title": "TopLogprob",
        "type": "object"
      },
      "UpdateMonitorRequest": {
        "properties": {
          "query": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Query",
            "description": "Updated search query for the monitor. Use this for minor updates to prompts and instructions only. Major changes to the query may lead to unexpected results in change detection, as the monitor compares new results with what was previously seen.",
            "examples": [
              "Extract recent news about AI"
            ]
          },
          "cadence": {
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "daily",
                  "weekly",
                  "hourly",
                  "every_two_weeks"
                ]
              },
              {
                "type": "null"
              }
            ],
            "title": "Cadence",
            "description": "Updated cadence of the monitor.",
            "examples": [
              "daily",
              "weekly",
              "hourly",
              "every_two_weeks"
            ]
          },
          "webhook": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MonitorWebhook"
              },
              {
                "type": "null"
              }
            ],
            "description": "Updated webhook configuration."
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": {
                  "type": "string"
                },
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata",
            "description": "Updated user-provided metadata. This field is returned in webhook notifications, enabling you to map responses to corresponding objects in your application.",
            "examples": [
              {
                "slack_thread_id": "1234567890.123456",
                "user_id": "U123ABC"
              }
            ]
          }
        },
        "type": "object",
        "title": "UpdateMonitorRequest",
        "description": "Request to update a monitor's configuration."
      },
      "UsageItem": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name",
            "description": "Name of the SKU.",
            "examples": [
              "sku_search_additional_results",
              "sku_extract_excerpts"
            ]
          },
          "count": {
            "type": "integer",
            "title": "Count",
            "description": "Count of the SKU.",
            "examples": [
              1
            ]
          }
        },
        "type": "object",
        "required": [
          "name",
          "count"
        ],
        "title": "UsageItem",
        "description": "Usage item for a single operation."
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      },
      "Warning": {
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "spec_validation_warning",
              "input_validation_warning",
              "warning"
            ],
            "title": "Type",
            "description": "Type of warning. Note that adding new warning types is considered a backward-compatible change.",
            "examples": [
              "spec_validation_warning",
              "input_validation_warning"
            ]
          },
          "message": {
            "type": "string",
            "title": "Message",
            "description": "Human-readable message."
          },
          "detail": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Detail",
            "description": "Optional detail supporting the warning."
          }
        },
        "type": "object",
        "required": [
          "type",
          "message"
        ],
        "title": "Warning",
        "description": "Human-readable message for a task."
      },
      "WebSearchResult": {
        "properties": {
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL associated with the search result."
          },
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Title",
            "description": "Title of the webpage, if available."
          },
          "publish_date": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Publish Date",
            "description": "Publish date of the webpage in YYYY-MM-DD format, if available."
          },
          "excerpts": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Excerpts",
            "description": "Relevant excerpted content from the URL, formatted as markdown."
          }
        },
        "type": "object",
        "required": [
          "url"
        ],
        "title": "WebSearchResult",
        "description": "A single search result from the web search API."
      },
      "Webhook": {
        "properties": {
          "url": {
            "type": "string",
            "title": "Url",
            "description": "URL for the webhook."
          },
          "event_types": {
            "items": {
              "type": "string",
              "enum": [
                "task_run.status"
              ]
            },
            "type": "array",
            "title": "Event Types",
            "description": "Event types to send the webhook notifications for.",
            "default": []
          }
        },
        "type": "object",
        "required": [
          "url"
        ],
        "title": "Webhook",
        "description": "Webhooks for Task Runs."
      },
      "ParallelBeta": {
        "anyOf": [
          {
            "enum": [
              "mcp-server-2025-07-17",
              "events-sse-2025-07-24",
              "webhook-2025-08-12",
              "findall-2025-09-15",
              "search-extract-2025-10-10",
              "field-basis-2025-11-25"
            ],
            "type": "string"
          },
          {
            "type": "string"
          }
        ],
        "description": "Model for the parallel-beta header.",
        "title": "ParallelBeta"
      },
      "ChoiceDelta": {
        "additionalProperties": true,
        "properties": {
          "content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Content"
          },
          "function_call": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ChoiceDeltaFunctionCall"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "refusal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Refusal"
          },
          "role": {
            "anyOf": [
              {
                "enum": [
                  "developer",
                  "system",
                  "user",
                  "assistant",
                  "tool"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Role"
          },
          "tool_calls": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/ChoiceDeltaToolCall"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Tool Calls"
          }
        },
        "title": "ChoiceDelta",
        "type": "object"
      },
      "ChoiceDeltaFunctionCall": {
        "additionalProperties": true,
        "properties": {
          "arguments": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Arguments"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Name"
          }
        },
        "title": "ChoiceDeltaFunctionCall",
        "type": "object"
      },
      "ChoiceDeltaToolCall": {
        "additionalProperties": true,
        "properties": {
          "index": {
            "title": "Index",
            "type": "integer"
          },
          "id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Id"
          },
          "function": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ChoiceDeltaToolCallFunction"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "type": {
            "anyOf": [
              {
                "const": "function",
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Type"
          }
        },
        "required": [
          "index"
        ],
        "title": "ChoiceDeltaToolCall",
        "type": "object"
      },
      "ChoiceDeltaToolCallFunction": {
        "additionalProperties": true,
        "properties": {
          "arguments": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Arguments"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Name"
          }
        },
        "title": "ChoiceDeltaToolCallFunction",
        "type": "object"
      },
      "ChatCompletionResponseChunk": {
        "additionalProperties": true,
        "description": "Chat completion response chunk.",
        "properties": {
          "type": {
            "const": "chat.completion.chunk",
            "description": "The type of the chat completion chunk. Always `chat.completion.chunk`.",
            "title": "Type",
            "type": "string"
          },
          "id": {
            "description": "The id of the chat completion response chunk.",
            "title": "Id",
            "type": "string"
          },
          "choices": {
            "items": {
              "$ref": "#/components/schemas/Choice"
            },
            "title": "Choices",
            "type": "array"
          },
          "created": {
            "title": "Created",
            "type": "integer"
          },
          "model": {
            "title": "Model",
            "type": "string"
          },
          "object": {
            "const": "chat.completion.chunk",
            "title": "Object",
            "type": "string"
          },
          "service_tier": {
            "anyOf": [
              {
                "enum": [
                  "auto",
                  "default",
                  "flex",
                  "scale",
                  "priority"
                ],
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "Service Tier"
          },
          "system_fingerprint": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "default": null,
            "title": "System Fingerprint"
          },
          "usage": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/CompletionUsage"
              },
              {
                "type": "null"
              }
            ],
            "default": null
          },
          "basis": {
            "default": [],
            "description": "Basis for the chat completion chunk, including citations and reasoning supporting the output.",
            "items": {
              "$ref": "#/components/schemas/FieldBasis"
            },
            "title": "Basis",
            "type": "array"
          }
        },
        "required": [
          "type",
          "id",
          "choices",
          "created",
          "model",
          "object"
        ],
        "title": "ChatCompletionResponseChunk",
        "type": "object"
      }
    },
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "x-api-key"
      }
    }
  },
  "tags": [
    {
      "name": "Tasks v1",
      "description": "The Task API executes web research and extraction tasks. Clients submit a natural-language objective with an optional input schema; the service plans retrieval, fetches relevant URLs, and returns outputs that conform to a provided or inferred JSON schema. Supports deep research style queries and can return rich structured JSON outputs. Processors trade-off between cost, latency, and quality. Each processor supports calibrated confidences.\n- Output metadata: citations, excerpts, reasoning, and confidence per field"
    },
    {
      "name": "Tasks (Beta)",
      "description": "The Task Group API is currently in beta and enables batch execution of many independent Task runs with group-level monitoring and failure handling.\n- Submit hundreds or thousands of Tasks as a single group\n- Observe group progress and receive results as they complete\n- Real-time updates via Server-Sent Events (SSE)\n- Add tasks to an existing group while it is running\n- Group-level retry and error aggregation\nStatus: beta and subject to change."
    },
    {
      "name": "Search (Beta)",
      "description": "Search returns ranked URLs with extended excerpts suitable for LLM consumption. Inputs are a natural-language objective and optional keyword queries. Source policies allow including or excluding specific domains and have configurable output sizes. The returned extended snippets contain dense, relevant information from relevant pages.\n- Result: ranked list with URL, title, and long text excerpts"
    },
    {
      "name": "Extract (Beta)",
      "description": "Extract returns excerpts or full content from one or more URLs. Inputs are a list of URLs and an optional search objective and keyword queries. The returned excerpts or full content is formatted as markdown and suitable for LLM consumption.\n- Result: excerpts or full content from the URL formatted as markdown"
    },
    {
      "name": "FindAll API (Beta)",
      "description": "The FindAll API discovers and evaluates entities that match complex criteria from natural language objectives. Submit a high-level goal and the service automatically generates structured match conditions, discovers relevant candidates, and evaluates each against the criteria. Returns comprehensive results with detailed reasoning, citations, and confidence scores for each match decision. Streaming events and webhooks are supported."
    },
    {
      "name": "Chat API (Beta)",
      "description": "The Chat API provides a programmatic chat-style text generation interface. It accepts a sequence of messages and returns model responses. Intended for assistant-like interactions and evaluation. Streaming responses are supported."
    },
    {
      "name": "Monitor",
      "description": "Monitor"
    }
  ],
  "servers": [
    {
      "url": "https://api.parallel.ai",
      "description": "Parallel API"
    }
  ],
  "security": [
    {
      "ApiKeyAuth": []
    }
  ]
}
