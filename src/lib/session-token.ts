/**
 * Fetches a JWT for the current session from Better Auth's jwt() plugin.
 *
 * GET /api/auth/token requires the session cookie and returns { token }.
 * The token payload is the session user (email, name, …) with `sub` set to
 * the user id, signed against the JWKS keys published at /api/auth/jwks.
 *
 * Tokens are short-lived, so callers fetch a fresh one per request instead
 * of caching — authenticated actions are infrequent, correctness wins.
 */
export const getAuthToken = async (): Promise<string | null> => {
  const res = await fetch("/api/auth/token", { credentials: "same-origin" });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { token?: string };
  return data.token ?? null;
};
