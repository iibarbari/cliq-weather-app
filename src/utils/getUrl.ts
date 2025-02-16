export default function getUrl(pathname: string, searchParams: Record<string, string | boolean> = {}): string {
  const apiKey = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
  const host =  process.env.NEXT_PUBLIC_ACCUWEATHER_API_URL;

  if (!apiKey) throw new Error("API key is required");
  if (!host) throw new Error("API host is required");

  const searchParamsString = new URLSearchParams({
    apikey: apiKey,
    ...searchParams
  }).toString();

  const url = new URL(pathname, host);

  return `${url}?${searchParamsString}`;
}
