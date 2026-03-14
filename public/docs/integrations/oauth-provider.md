> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# OAuth Provider

> Integrate with the Parallel OAuth Provider to get a Parallel API key on behalf of your users

Parallel provides an OAuth 2.0 provider that allows applications to securely access user API keys with explicit user consent. This enables building applications that can make API calls to Parallel on behalf of users without requiring them to manually share their API keys.

## Provider URL

**[https://platform.parallel.ai](https://platform.parallel.ai)**

## Quick Start

### 1. Start Authorization Flow

```javascript  theme={"system"}
// Generate PKCE parameters
function generatePKCE() {
  const codeVerifier = btoa(crypto.getRandomValues(new Uint8Array(32))).replace(
    /[+/=]/g,
    (m) => ({ "+": "-", "/": "_", "=": "" }[m])
  );

  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(codeVerifier))
    .then((hash) => ({
      codeVerifier,
      codeChallenge: btoa(String.fromCharCode(...new Uint8Array(hash))).replace(
        /[+/=]/g,
        (m) => ({ "+": "-", "/": "_", "=": "" }[m])
      ),
    }));
}

// Redirect user to authorization
const { codeVerifier, codeChallenge } = await generatePKCE();
localStorage.setItem("code_verifier", codeVerifier);

const authUrl = new URL("https://platform.parallel.ai/getKeys/authorize");
authUrl.searchParams.set("client_id", "yourapp.com");
authUrl.searchParams.set("redirect_uri", "https://yourapp.com/callback");
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", "key:read");
authUrl.searchParams.set("code_challenge", codeChallenge);
authUrl.searchParams.set("code_challenge_method", "S256");
authUrl.searchParams.set("state", "random-state-value");

window.location.href = authUrl.toString();
```

### 2. Handle Callback & Exchange Code

```javascript  theme={"system"}
// On your callback page
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const codeVerifier = localStorage.getItem("code_verifier");

const response = await fetch("https://platform.parallel.ai/getKeys/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    client_id: "yourapp.com",
    redirect_uri: "https://yourapp.com/callback",
    code_verifier: codeVerifier,
  }),
});

const { access_token } = await response.json();
// access_token is the user's Parallel API key
```

### 3. Use the API Key

```javascript  theme={"system"}
const response = await fetch("https://api.parallel.ai/v1/tasks/runs", {
  method: "POST",
  headers: {
    "x-api-key": access_token,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    input: "What was the GDP of France in 2023?",
    processor: "base",
  }),
});

const taskRun = await response.json();
console.log(taskRun.run_id);
```

## Authentication Flow

The OAuth flow follows these steps:

1. **Authorization Request**: Redirect user to Parallel's authorization endpoint
2. **User Consent**: User sees your application hostname and grants permission
3. **API Key Selection**: User selects an existing API key or generates a new one
4. **Authorization Code**: User is redirected back with an authorization code
5. **Token Exchange**: Exchange the code for the user's API key using PKCE

## Features

* **PKCE Required**: Code challenge/verifier mandatory for all clients
* **No Client Secret**: Public client design - no secrets to manage
* **User Consent**: Users explicitly approve each application by hostname
* **One-Time Codes**: Authorization codes can only be used once
* **Direct Access**: The `access_token` returned is the user's actual Parallel API key

## MCP Compatibility

This OAuth provider is fully compatible with the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) specification for authorization. MCP clients can discover and use this OAuth provider automatically through the well-known endpoints at `/.well-known/oauth-authorization-server`.

You can see an example of this OAuth provider being used in practice in the [Parallel Tasks SSE recipe](https://github.com/parallel-web/parallel-cookbook/blob/main/typescript-recipes/parallel-tasks-sse/index.html).
