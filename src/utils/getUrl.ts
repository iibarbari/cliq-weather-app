import getEnvVar from '@/utils/getEnvVar';

export default function getUrl(pathname: string, searchParams: Record<string, string | boolean> = {}): string {
  const apiKey = getEnvVar("NEXT_PUBLIC_ACCUWEATHER_API_KEY", "AJg38CE9mcLO3Op3qvsk9lLC5gLwPWX5");
  const host = getEnvVar("NEXT_PUBLIC_ACCUWEATHER_API_URL", "http://dataservice.accuweather.com");
  const searchParamsString = new URLSearchParams({
    apikey: apiKey,
    ...searchParams
  }).toString();

  return `${host}/${pathname}?${searchParamsString}`;
}
