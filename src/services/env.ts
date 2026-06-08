const REQUIRED_VARS = [
  "VITE_MAPBOX_TOKEN",
  "VITE_MAPBOX_STYLE",
  "VITE_API_URL",
  "VITE_CLOUDINARY_CLOUD_NAME",
] as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const key of REQUIRED_VARS) {
    if (!import.meta.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno requeridas: ${missing.join(", ")}.\n` +
        "Crea un archivo .env en la raiz del proyecto basado en .env.example",
    );
  }
}
