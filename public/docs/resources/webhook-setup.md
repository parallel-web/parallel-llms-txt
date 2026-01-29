> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhook Setup

> Guide to configuring and verifying webhooks for Parallel APIs

## Overview

Webhooks allow you to receive real-time notifications when events occur in your Parallel API operations, eliminating the need for constant polling. Our webhooks follow [standard webhook conventions](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md) to ensure security and interoperability.

## Setup

### 1. Record your webhook secret

Go to **Settings → Webhooks** to view your account webhook secret. You'll need this to verify webhook signatures.

<Note>
  Keep your webhook secret secure. Anyone with access to your secret can forge webhook requests.
</Note>

### 2. Configure webhook in API request

When creating a task run or FindAll run, include a `webhook` parameter in your request:

```json  theme={"system"}
{
  "webhook": {
    "url": "https://your-domain.com/webhooks/parallel",
    "event_types": ["event.type"]
  }
}
```

| Parameter     | Type           | Required | Description                                                                                     |
| ------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `url`         | string         | Yes      | Your webhook endpoint URL. Can be any domain.                                                   |
| `event_types` | array\[string] | Yes      | Array of event types to subscribe to. See API-specific documentation for available event types. |

### 3. Webhook request headers

Your webhook endpoint will receive requests with these headers:

* `webhook-id`: Unique identifier for each webhook event
* `webhook-timestamp`: Unix timestamp in seconds
* `webhook-signature`: One or more versioned signatures (e.g., `v1,<base64 signature>`)

```json  theme={"system"}
{
  "Content-Type": "application/json",
  "webhook-id": "whevent_abc123def456",
  "webhook-timestamp": "1751498975",
  "webhook-signature": "v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pj9o9NDN/H/pI4="
}
```

Signatures are space-delimited per the Standard Webhooks format. Under normal circumstances there will only be one signature, but there may be multiple if you rotate your webhook secret without immediately expiring the old secrets.

```text  theme={"system"}
webhook-signature: v1,BASE64SIG_A v1,BASE64SIG_B
```

## Security & Verification

### HMAC Signature Verification

Webhook requests are signed using HMAC-SHA256 with **standard Base64 (RFC 4648) encoding with padding**. The signature header is formatted as `v1,<base64 signature>` where `<base64 signature>` is computed over the payload below:

```text  theme={"system"}
<webhook-id>.<webhook-timestamp>.<payload>
```

Where:

* `<webhook-id>`: The value of the `webhook-id` header
* `<webhook-timestamp>`: The value of the `webhook-timestamp` header
* `<payload>`: The exact JSON body of the webhook request

You must parse the version and the signature before verifying. The `webhook-signature` header uses space-delimited signatures; check each signature until one matches.

### Verification Examples

<CodeGroup>
  ```typescript TypeScript (Node.js) theme={"system"}
  import crypto from "crypto";

  function computeSignature(
    secret: string,
    webhookId: string,
    webhookTimestamp: string,
    body: string | Buffer
  ): string {
    const payload = `${webhookId}.${webhookTimestamp}.${body.toString()}`;
    const digest = crypto.createHmac("sha256", secret).update(payload).digest();
    return digest.toString("base64"); // standard Base64 with padding
  }

  function isValidSignature(
    webhookSignatureHeader: string,
    expectedSignature: string
  ): boolean {
    // Header may contain multiple space-delimited entries; each is "v1,<sig>"
    const signatures = webhookSignatureHeader.split(" ");

    for (const part of signatures) {
      const [, sig] = part.split(",", 2);
      if (
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSignature))
      ) {
        return true;
      }
    }

    return false;
  }

  // Example usage in an Express endpoint
  import express from "express";

  const app = express();

  app.post(
    "/webhooks/parallel",
    express.raw({ type: "application/json" }),
    (req, res) => {
      const webhookId = req.headers["webhook-id"] as string;
      const webhookTimestamp = req.headers["webhook-timestamp"] as string;
      const webhookSignature = req.headers["webhook-signature"] as string;
      const secret = process.env.PARALLEL_WEBHOOK_SECRET!;

      const expectedSignature = computeSignature(
        secret,
        webhookId,
        webhookTimestamp,
        req.body
      );

      if (!isValidSignature(webhookSignature, expectedSignature)) {
        return res.status(401).send("Invalid signature");
      }

      // Parse and process the webhook payload
      const payload = JSON.parse(req.body.toString());
      console.log("Webhook received:", payload);

      // Your business logic here

      res.status(200).send("OK");
    }
  );
  ```

  ```typescript TypeScript (Web API / Cloudflare Workers) theme={"system"}
  // Example for environments without Node.js crypto module
  async function computeSignature(
    secret: string,
    webhookId: string,
    webhookTimestamp: string,
    body: string
  ): Promise<string> {
    const payload = `${webhookId}.${webhookTimestamp}.${body}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payload)
    );

    // Convert to base64
    const base64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return base64;
  }

  function isValidSignature(
    webhookSignatureHeader: string,
    expectedSignature: string
  ): boolean {
    const signatures = webhookSignatureHeader.split(" ");

    for (const part of signatures) {
      const [, sig] = part.split(",", 2);
      if (sig === expectedSignature) {
        return true;
      }
    }

    return false;
  }

  // Example Cloudflare Worker
  export default {
    async fetch(request: Request): Promise<Response> {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
      }

      const webhookId = request.headers.get("webhook-id")!;
      const webhookTimestamp = request.headers.get("webhook-timestamp")!;
      const webhookSignature = request.headers.get("webhook-signature")!;
      const secret = "your-webhook-secret";

      const body = await request.text();

      const expectedSignature = await computeSignature(
        secret,
        webhookId,
        webhookTimestamp,
        body
      );

      if (!isValidSignature(webhookSignature, expectedSignature)) {
        return new Response("Invalid signature", { status: 401 });
      }

      const payload = JSON.parse(body);
      console.log("Webhook received:", payload);

      return new Response("OK", { status: 200 });
    },
  };
  ```

  ```python Python theme={"system"}
  import base64
  import hashlib
  import hmac

  def compute_signature(secret: str, webhook_id: str, webhook_timestamp: str, body: bytes) -> str:
      payload = f"{webhook_id}.{webhook_timestamp}.{body.decode()}".encode()
      digest = hmac.new(secret.encode(), payload, hashlib.sha256).digest()
      return base64.b64encode(digest).decode()  # standard Base64 with padding

  def is_valid_signature(webhook_signature_header: str, expected_signature: str) -> bool:
      # Header may contain multiple space-delimited entries; each is "v1,<sig>"
      for part in webhook_signature_header.split():
          _, sig = part.split(",", 1)
          if hmac.compare_digest(sig, expected_signature):
              return True
      return False

  # Example usage
  webhook_secret = "your_webhook_secret_from_settings"
  webhook_id = request.headers.get("webhook-id")
  webhook_timestamp = request.headers.get("webhook-timestamp")
  signature_header = request.headers.get("webhook-signature")
  body = request.get_data()

  expected_sig = compute_signature(webhook_secret, webhook_id, webhook_timestamp, body)
  if is_valid_signature(signature_header, expected_sig):
      print("✓ Signature verified")
  else:
      print("✗ Signature verification failed")
  ```

  ```bash Bash theme={"system"}
  #!/bin/bash

  # Inputs: HEADER_SIGNATURE (e.g. "v1,BASE64..."), WEBHOOK_ID, WEBHOOK_TIMESTAMP, PAYLOAD (minified JSON), SECRET
  RECEIVED_SIGNATURE=$(printf "%s" "$HEADER_SIGNATURE" | cut -d',' -f2)
  TO_SIGN="$WEBHOOK_ID.$WEBHOOK_TIMESTAMP.$PAYLOAD"
  EXPECTED_SIGNATURE=$(printf "%s" "$TO_SIGN" | openssl dgst -sha256 -hmac "$SECRET" -binary | base64 | tr -d '\n')

  if [ "$EXPECTED_SIGNATURE" = "$RECEIVED_SIGNATURE" ]; then
    echo "✅ Signature verification successful"
  else
    echo "❌ Signature verification failed"
    exit 1
  fi
  ```
</CodeGroup>

## Retry Policy

Webhook delivery uses the following retry configuration:

* **Initial delay**: 5 seconds
* **Backoff strategy**: Exponential backoff (doubles per failed request)
* **Maximum retries**: Multiple attempts over 48 hours

After exhausting all retry attempts, webhook delivery for that event is terminated.

## Best Practices

### 1. Always Return 2xx Status

Your webhook endpoint should return a 2xx HTTP status code to acknowledge receipt. Any other status code will trigger retries.

### 2. Verify Signatures

Always verify HMAC signatures using your account webhook secret from **Settings → Webhooks** to ensure webhook authenticity. Ensure that you are calculating signatures using the proper process as shown above.

### 3. Handle Duplicates

Although not common, duplicate events may be sent to the configured webhook URL. Ensure your webhook handler can detect and safely ignore duplicate events using the `webhook-id` header.

### 4. Process Asynchronously

Process webhook events asynchronously to avoid timeouts and ensure quick response times. For example, immediately return a 200 response, then queue the event for background processing.

### 5. Rotate Secrets Carefully

When rotating webhook secrets in **Settings → Webhooks**, consider keeping the old secret active temporarily to avoid verification failures during the transition period.

### 6. Monitor Webhook Health

Track webhook delivery failures and response times. Set up alerts for repeated failures that might indicate issues with your endpoint.

## API-Specific Documentation

For details on specific webhook events and payloads for each API:

* **[Task API Webhooks](/task-api/webhooks)**: Task run completion events
* **[FindAll Webhooks](/findall-api/features/findall-webhook)**: Candidate and run events
* **[Monitor API Webhooks](/monitor-api/monitor-webhooks)**: Events and completions
