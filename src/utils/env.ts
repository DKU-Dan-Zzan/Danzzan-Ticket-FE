export type ApiMode = "live" | "mock";

const resolveApiMode = (value?: string): ApiMode => {
  return value === "mock" ? "mock" : "live";
};

const normalizeEnv = (value?: string): string => {
  return value?.trim() ?? "";
};

const resolveApiBaseUrl = (): string => {
  const configured = normalizeEnv(
    import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL,
  );

  if (configured) {
    return configured;
  }

  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:8080`;
  }

  return "";
};

const apiBaseUrl = resolveApiBaseUrl();

export const env = {
  apiBaseUrl,
  ticketingApiBaseUrl:
    normalizeEnv(import.meta.env.VITE_TICKETING_API_BASE_URL) || apiBaseUrl,
  apiMode: resolveApiMode(import.meta.env.VITE_API_MODE),
  devAccessToken: import.meta.env.VITE_DEV_ACCESS_TOKEN ?? "",
  isDev: import.meta.env.DEV,
};

export const requireEnv = (value: string, name: string): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};
