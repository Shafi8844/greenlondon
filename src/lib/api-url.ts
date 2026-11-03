const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export function apiUrl(path: string): string {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL must be set in the frontend environment.");
  }

  return `${apiBaseUrl}/${path.replace(/^\/+/, "")}`;
}
