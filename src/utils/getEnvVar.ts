export default function getEnvVar(envVarName: string): string {
  const envVar = process.env[envVarName];

  if (!envVar) {
    throw new Error(`Environment variable ${envVarName} is not set.`);
  }

  return envVar;
}
