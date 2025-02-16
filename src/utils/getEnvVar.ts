export default function getEnvVar(envVarName: string, defaultValue?: string): string {
  const envVar = process.env[envVarName];

  if (!envVar) {
    if (defaultValue) return defaultValue;

    throw new Error(`Environment variable ${envVarName} is not set.`);
  }

  return envVar;
}
