[Parallel](/)

[About](/about) [About](https://parallel.ai/about) [Pricing](/pricing) [Pricing](https://parallel.ai/pricing) [Careers](https://jobs.ashbyhq.com/parallel) [Careers](https://jobs.ashbyhq.com/parallel) [Blog](/blog) [Blog](https://parallel.ai/blog) [Docs](https://docs.parallel.ai/home) [Docs](https://docs.parallel.ai/home)

Start Building P [Start Building]

Menu [Menu]

Human Machine

# \# Building a market research platform with Parallel Deep Research

This guide walks through building a comprehensive market research platform that generates detailed industry reports using Parallel's Deep Research product. The application demonstrates how to create a production-ready system that handles real-time streaming, intelligent input validation, email notifications, and robust error handling for AI-powered research tasks.

Tags: [Cookbook](/blog?tag=cookbook)

Reading time: 4 min

[Try it](https://market-analysis-demo.parallel.ai) [Github](https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/market-analysis-demo)

## \## Key Features

* \- AI-Powered Research: Uses Parallel's Deep Research API with "ultra2x" processor for comprehensive market analysis
* \- Real-Time Progress Streaming: Server-Sent Events ( [SSE](https://docs.parallel.ai/task-api/task-sse) [SSE]($https://docs.parallel.ai/task-api/task-sse) ) for live task progress updates with source tracking
* \- Email Notifications: Optional email alerts via Resend API when reports are ready
* \- Public Report Library: Browse all generated reports without any authentication required
* \- Global Access: No authentication needed - anyone can generate and view reports
* \- Interactive Dashboard: Clean, modern web interface with real-time progress visualization
* \- Download Support: Export reports as Markdown files
* \- Shareable URLs: Each report gets a unique URL slug for easy sharing
* \- Input Validation: Low-latency validation of inputs via Parallel's [Chat API](https://docs.parallel.ai/chat-api/chat-quickstart) [Chat API]($https://docs.parallel.ai/chat-api/chat-quickstart)

## \## Platform Architecture

This market research platform is designed for production use with several key architectural decisions:

### \### Core Components

* \- Flask Backend: Python web framework handling API requests and task management
* \- PostgreSQL Database: Unified schema storing both running tasks and completed reports
* \- Real-time Streaming: Server-Sent Events for live progress updates during research
* \- AI Validation: Parallel's Chat API for intelligent input filtering
* \- Email System: Resend API for user notifications when reports complete
* \- Public Library: Persistent storage enabling report sharing and discovery

### \### Design Patterns

The platform implements two key production patterns that ensure reliability. First, **\*\* multi-layer task completion \*\*** – Tasks are monitored through background thread monitoring and each run ID is stored upon completion, allowing for state recovery if disconnected or on failure. This allows for the lower-latency ultra processors to complete gracefully and ensures reports can be tracked and kicked off concurrently.

Next, **\*\* intelligent input validation \*\*** – as a public application, it’s important to ensure the data quality to end-users is high. The Chat API is used for a low-latency verification system that checks that the inputs – market name, question, region – fit within the focus of the app, protecting against unrelated data populating the public library. This 2-step process (low-latency validation paired with high-latency deep research) is a helpful framework that can provide meaningful improvements to user experiences in other applications.

## \## Implementation Details

### \### Real-Time Progress Streaming

The market research platform uses Server-Sent Events (SSE) to provide live updates during report generation. This is crucial for user experience since research tasks can take 2-15 minutes to complete, and users need to understand what's happening.

The platform implements manual SSE handling rather than using the browser's built-in `EventSource` API because Parallel's API requires authentication via the `x-api-key` header, which `EventSource` doesn't support.

### \### SSE Implementation Challenges

SSE data arrives as a continuous stream that can be split across network packets. The implementation handles this with a robust buffering system:

[\### SSE setup ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 def stream_task_events ( task_id, api_key ): """ Stream events from SSE endpoint with proper parsing and error handling - Accept: text/event-stream header - Parse 'data: {json}' format - Yield events as generator - Handle connection errors """ headers = { 'x-api-key' : api_key, 'Accept' : 'text/event-stream' , 'Cache-Control' : 'no-cache' , 'parallel-beta' : 'events-sse-2025-07-24' } stream_url = f"https://api.parallel.ai/v1beta/tasks/runs/ {task_id} /events" try : # Use separate timeouts: (connection_timeout, read_timeout) # Connection: 10s (should be fast), Read: 300s (allow for natural gaps in task processing) with requests.get(stream_url, headers=headers, stream= True , timeout=( 10 , 300 )) as response: response.raise_for_status() current_event_type = None buffer = "" for line in response.iter_lines(decode_unicode= True ): if line is None : continue # Handle SSE format if line.startswith( 'event:' ): current_event_type = line[ 6 :].strip() elif line.startswith( 'data:' ): data_line = line[ 5 :].strip() if data_line: try : # Parse JSON data event_data = json.loads(data_line) # Process event based on type processed_event = process_task_event(current_event_type, event_data) if processed_event: yield processed_event except json.JSONDecodeError as e: print ( f"Failed to parse SSE event data: {data_line} , error: {e} " ) continue elif line == "" : # Empty line indicates end of event current_event_type = None except requests.RequestException as e: # Let the caller handle connection errors raise ConnectionError( f"SSE connection failed: { str (e)} " ) except Exception as e: raise RuntimeError( f"Unexpected error in SSE stream: { str (e)} " ) ``` def stream_task_events(task_id, api_key): """ Stream events from SSE endpoint with proper parsing and error handling - Accept: text/event-stream header - Parse 'data: {json}' format - Yield events as generator - Handle connection errors """ headers = { 'x-api-key': api_key, 'Accept': 'text/event-stream', 'Cache-Control': 'no-cache', 'parallel-beta': 'events-sse-2025-07-24' } stream_url = f"https://api.parallel.ai/v1beta/tasks/runs/{task_id}/events" try: # Use separate timeouts: (connection_timeout, read_timeout) # Connection: 10s (should be fast), Read: 300s (allow for natural gaps in task processing) with requests.get(stream_url, headers=headers, stream=True, timeout=(10, 300)) as response: response.raise_for_status() current_event_type = None buffer = "" for line in response.iter_lines(decode_unicode=True): if line is None: continue # Handle SSE format if line.startswith('event:'): current_event_type = line[6:].strip() elif line.startswith('data:'): data_line = line[5:].strip() if data_line: try: # Parse JSON data event_data = json.loads(data_line) # Process event based on type processed_event = process_task_event(current_event_type, event_data) if processed_event: yield processed_event except json.JSONDecodeError as e: print(f"Failed to parse SSE event data: {data_line}, error: {e}") continue elif line == "": # Empty line indicates end of event current_event_type = None except requests.RequestException as e: # Let the caller handle connection errors raise ConnectionError(f"SSE connection failed: {str(e)}") except Exception as e: raise RuntimeError(f"Unexpected error in SSE stream: {str(e)}") ``` ```]( )

This approach ensures reliable parsing of SSE events even when network packets split messages unpredictably.

### \### Connection Resilience

Since market research tasks can take 2-15 minutes, the platform implements robust reconnection logic to handle network interruptions:

[\### Monitoring and reconnection logic ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 def monitor_task_completion_robust ( task_id, api_key, max_reconnects= 10 ): """ Monitor task with robust reconnection using exponential backoff Returns: (task_completed: bool, final_status: str, error_msg: str) """ task_completed = False final_status = None error_msg = None reconnect_count = 0 print ( f"Starting robust monitoring for task {task_id} " ) while not task_completed and reconnect_count < max_reconnects: try : print ( f"Monitoring attempt {reconnect_count + 1 } / {max_reconnects} " ) # Stream events with timeout for event in stream_task_events(task_id, api_key): if event.get( 'type' ) == 'task.status' : final_status = event.get( 'status' ) task_completed = event.get( 'is_complete' , False ) if task_completed: print ( f"Task {task_id} completed with status: {final_status} " ) return task_completed, final_status, None elif event.get( 'type' ) == 'error' : error_msg = event.get( 'message' , 'Unknown error' ) print ( f"Task {task_id} error: {error_msg} " ) # Check if this is a recoverable error if is_recoverable_error(error_msg): break # Break to retry else : return False , 'failed' , error_msg except (ConnectionError, requests.RequestException) as e: # Network errors are recoverable print ( f"Connection error for task {task_id} : {e} " ) reconnect_count += 1 if reconnect_count < max_reconnects: # Exponential backoff: wait_time = min(2 ** retry_count, 30) wait_time = min ( 2 ** reconnect_count, 30 ) print ( f"Waiting {wait_time} s before reconnection attempt {reconnect_count + 1 } " ) time.sleep(wait_time) else : error_msg = f"Max reconnection attempts reached after {max_reconnects} tries" except Exception as e: # Unexpected errors error_msg = f"Unexpected monitoring error: { str (e)} " print ( f"Unexpected error for task {task_id} : {e} " ) break return task_completed, final_status, error_msg ``` def monitor_task_completion_robust(task_id, api_key, max_reconnects=10): """ Monitor task with robust reconnection using exponential backoff Returns: (task_completed: bool, final_status: str, error_msg: str) """ task_completed = False final_status = None error_msg = None reconnect_count = 0 print(f"Starting robust monitoring for task {task_id}") while not task_completed and reconnect_count < max_reconnects: try: print(f"Monitoring attempt {reconnect_count + 1}/{max_reconnects}") # Stream events with timeout for event in stream_task_events(task_id, api_key): if event.get('type') == 'task.status': final_status = event.get('status') task_completed = event.get('is_complete', False) if task_completed: print(f"Task {task_id} completed with status: {final_status}") return task_completed, final_status, None elif event.get('type') == 'error': error_msg = event.get('message', 'Unknown error') print(f"Task {task_id} error: {error_msg}") # Check if this is a recoverable error if is_recoverable_error(error_msg): break # Break to retry else: return False, 'failed', error_msg except (ConnectionError, requests.RequestException) as e: # Network errors are recoverable print(f"Connection error for task {task_id}: {e}") reconnect_count += 1 if reconnect_count < max_reconnects: # Exponential backoff: wait_time = min(2 ** retry_count, 30) wait_time = min(2 ** reconnect_count, 30) print(f"Waiting {wait_time}s before reconnection attempt {reconnect_count + 1}") time.sleep(wait_time) else: error_msg = f"Max reconnection attempts reached after {max_reconnects} tries" except Exception as e: # Unexpected errors error_msg = f"Unexpected monitoring error: {str(e)}" print(f"Unexpected error for task {task_id}: {e}") break return task_completed, final_status, error_msg ``` ```]( )

The reconnection system includes exponential backoff, attempt limiting, and status-based retry logic to ensure reliable task completion.

### \### Event Processing

The platform processes different types of events from Parallel's SSE stream, each serving specific purposes in the user interface. In the below code snippet, we demonstrated how each type of event was handled for display:

[\### Event processing ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 def process_task_event ( event_type, event_data ): """ Process different event types from Parallel API Returns standardized event format for frontend """ processed = { 'timestamp' : event_data.get( 'timestamp' ), 'raw_type' : event_data.get( 'type' , event_type) } # Handle different event types if event_data.get( 'type' ) == 'task_run.state' : run_info = event_data.get( 'run' , {}) status = run_info.get( 'status' , 'unknown' ) processed.update({ 'type' : 'task.status' , 'status' : status, 'is_complete' : status in [ 'completed' , 'failed' , 'cancelled' ], 'message' : f"Task status: {status} " , 'category' : 'status' }) elif event_data.get( 'type' ) == 'task_run.progress_stats' : # continue through each event type return processed ``` def process_task_event(event_type, event_data): """ Process different event types from Parallel API Returns standardized event format for frontend """ processed = { 'timestamp': event_data.get('timestamp'), 'raw_type': event_data.get('type', event_type) } # Handle different event types if event_data.get('type') == 'task_run.state': run_info = event_data.get('run', {}) status = run_info.get('status', 'unknown') processed.update({ 'type': 'task.status', 'status': status, 'is_complete': status in ['completed', 'failed', 'cancelled'], 'message': f"Task status: {status}", 'category': 'status' }) elif event_data.get('type') == 'task_run.progress_stats': # continue through each event type return processed ``` ```]( )

The system handles multiple event types:

* \- Task State Events: Lifecycle updates (queued → running → completed
* \- Progress Statistic\*: Quantitative metrics like sources processed and pages read
* \- Progress Messages: Qualitative updates showing AI reasoning and analysis steps
* \- Error Events: Detailed error information for troubleshooting

This event diversity enables rich UI updates including progress bars, reasoning displays, and comprehensive error handling.

### \### Email Notification System

When reports complete, the platform automatically notifies users via email using the Resend API:

[\### Email notification ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 def send_report_ready_email ( email, report_title, report_slug, task_id ): """Send email notification when report is ready using Resend API""" if not RESEND_API_KEY or not email: print ( f"Skipping email: RESEND_API_KEY= { 'present' if RESEND_API_KEY else 'missing' } , email= { 'present' if email else 'missing' } " ) return False try : # Build the report URL report_url = f" {BASE_URL} /report/ {report_slug} " # Render the email HTML template html_content = render_template( 'email_report_ready.html' , report_title=report_title, report_url=report_url, task_id=task_id ) # Prepare email data email_data = { "from" : "Market Research <updates@aimarketresearch.app>" , "to" : [email], "subject" : "Market Research report is now available" , "html" : html_content, "reply_to" : "updates@aimarketresearch.app" } # Send email via Resend API headers = { 'Authorization' : f'Bearer {RESEND_API_KEY} ' , 'Content-Type' : 'application/json' } ``` def send_report_ready_email(email, report_title, report_slug, task_id): """Send email notification when report is ready using Resend API""" if not RESEND_API_KEY or not email: print(f"Skipping email: RESEND_API_KEY={'present' if RESEND_API_KEY else 'missing'}, email={'present' if email else 'missing'}") return False try: # Build the report URL report_url = f"{BASE_URL}/report/{report_slug}" # Render the email HTML template html_content = render_template( 'email_report_ready.html', report_title=report_title, report_url=report_url, task_id=task_id ) # Prepare email data email_data = { "from": "Market Research <updates@aimarketresearch.app>", "to": [email], "subject": "Market Research report is now available", "html": html_content, "reply_to": "updates@aimarketresearch.app" } # Send email via Resend API headers = { 'Authorization': f'Bearer {RESEND_API_KEY}', 'Content-Type': 'application/json' } ``` ```]( )

### \### Database Design

The platform uses a unified PostgreSQL schema that efficiently stores both running tasks and completed reports in a single table:

[\### Database SQL ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 -- Unified reports table handling both running tasks and completed reports CREATE TABLE reports ( id VARCHAR PRIMARY KEY, task_run_id VARCHAR UNIQUE NOT NULL, title VARCHAR, slug VARCHAR UNIQUE, industry VARCHAR NOT NULL, geography VARCHAR, details TEXT, content TEXT, basis JSONB, status VARCHAR DEFAULT 'running', session_id VARCHAR, email VARCHAR, is_public BOOLEAN DEFAULT TRUE, error_message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, completed_at TIMESTAMP ); ``` -- Unified reports table handling both running tasks and completed reports CREATE TABLE reports ( id VARCHAR PRIMARY KEY, task_run_id VARCHAR UNIQUE NOT NULL, title VARCHAR, slug VARCHAR UNIQUE, industry VARCHAR NOT NULL, geography VARCHAR, details TEXT, content TEXT, basis JSONB, status VARCHAR DEFAULT 'running', session_id VARCHAR, email VARCHAR, is_public BOOLEAN DEFAULT TRUE, error_message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, completed_at TIMESTAMP ); ``` ```]( )

This design enables efficient querying of both active tasks and completed reports while supporting the public report library feature.

## \## Resources

* \- [Complete Source Code](https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/market-analysis-demo) [Complete Source Code]($https://github.com/parallel-web/parallel-cookbook/tree/main/python-recipes/market-analysis-demo)
* \- [Live Demo](https://market-analysis-demo.parallel.ai/) [Live Demo]($https://market-analysis-demo.parallel.ai/)
* \- [Parallel Deep Research](https://docs.parallel.ai/task-api/features/task-deep-research) [Parallel Deep Research]($https://docs.parallel.ai/task-api/features/task-deep-research)
* \- [Parallel SSE Documentation](https://docs.parallel.ai/task-api/features/task-sse) [Parallel SSE Documentation]($https://docs.parallel.ai/task-api/features/task-sse)

By Parallel

October 22, 2025

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
