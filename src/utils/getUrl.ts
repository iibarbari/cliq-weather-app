import getEnvVar from '@/utils/getEnvVar';

export default function getUrl(pathname: string, searchParams: Record<string, any> = {}): string {
  const apiKey = getEnvVar("NEXT_PUBLIC_ACCUWEATHER_API_KEY");
  const host = getEnvVar("NEXT_PUBLIC_ACCUWEATHER_API_URL");
  const searchParamsString = new URLSearchParams({
    apikey: apiKey,
    ...searchParams
  }).toString();

  return `${host}/${pathname}?${searchParamsString}`;
}
