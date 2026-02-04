import { buildRewriter } from "./rewriter";

type Env = {
  LEGACY_ORIGIN: string;
  NEW_APP_ORIGIN: string;
};

const HTML_REWRITE_PATHS = ["/home", "/node/2"];
const NEW_APP_PATHS = ["/home", "/node/2"];
const NEW_APP_PREFIXES = ["/assets", "/_static"];

const isHtmlRequest = (request: Request) => {
  const accept = request.headers.get("Accept") || "";
  return accept.includes("text/html");
};

const isHtmlResponse = (response: Response) => {
  const contentType = response.headers.get("Content-Type") || "";
  return contentType.includes("text/html");
};

const withSafeHeaders = (response: Response) => {
  const headers = new Headers(response.headers);
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self' https:; img-src 'self' https: data:; script-src 'self' https:; style-src 'self' https: 'unsafe-inline';"
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const shouldBypass = (url: URL) => {
  return (
    url.pathname.startsWith("/legacy") ||
    url.pathname.startsWith("/forms") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/paypal/pay") ||
    url.pathname.startsWith("/event")
  );
};

const handleProxy = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const origin = new URL(env.LEGACY_ORIGIN);
  const targetUrl = new URL(url.pathname + url.search, origin);
  const headers = new Headers(request.headers);
  headers.set("Host", origin.host);
  headers.set("Origin", origin.origin);

  const cacheKey = new Request(targetUrl.toString(), request);
  const cache = caches.default;

  if (request.method === "GET") {
    const cached = await cache.match(cacheKey);
    if (cached) {
      return withSafeHeaders(cached);
    }
  }

  const response = await fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.method === "GET" ? undefined : request.body,
    redirect: "manual",
  });

  const hasSetCookie = response.headers.has("Set-Cookie");
  if (request.method === "GET" && response.ok && !hasSetCookie) {
    const cacheResponse = new Response(response.body, response);
    cacheResponse.headers.set("Cache-Control", "public, max-age=300");
    await cache.put(cacheKey, cacheResponse.clone());
    return withSafeHeaders(cacheResponse);
  }

  return withSafeHeaders(response);
};

const handleNewApp = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname + url.search, env.NEW_APP_ORIGIN);
  const headers = new Headers(request.headers);
  headers.set("Host", targetUrl.host);
  headers.set("Origin", targetUrl.origin);

  const newRequest = new Request(targetUrl.toString(), {
    method: request.method,
    headers,
    body: request.method === "GET" ? undefined : request.body,
    redirect: "manual",
  });

  return fetch(newRequest);
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (shouldBypass(url)) {
      return handleProxy(request, env);
    }

    if (
      NEW_APP_PATHS.includes(url.pathname) ||
      NEW_APP_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
    ) {
      return handleNewApp(request, env);
    }

    const response = await handleProxy(request, env);

    if (
      HTML_REWRITE_PATHS.includes(url.pathname) &&
      isHtmlRequest(request) &&
      isHtmlResponse(response)
    ) {
      return buildRewriter().transform(response);
    }

    return response;
  },
};
