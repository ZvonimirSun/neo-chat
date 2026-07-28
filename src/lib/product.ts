const DEFAULT_PRODUCT_NAME = "Neo Chat";
const MAX_PRODUCT_NAME_LENGTH = 80;
const DEFAULT_FAVICON_URL = "/favicon.ico";

export function normalizeProductName(value: string | undefined): string {
  const normalized = value
    ?.replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, MAX_PRODUCT_NAME_LENGTH);
  return normalized || DEFAULT_PRODUCT_NAME;
}

export function normalizePublicAssetUrl(
  value: string | undefined,
): string | undefined {
  const normalized = value?.trim();
  if (!normalized || normalized.length > 2_048) return undefined;
  if (normalized.startsWith("/") && !normalized.startsWith("//")) {
    return normalized;
  }

  try {
    const url = new URL(normalized);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export const PRODUCT_NAME = normalizeProductName(
  process.env.NEXT_PUBLIC_APP_NAME,
);
export const PRODUCT_SHORT_NAME = PRODUCT_NAME.split(/\s+/)[0] || PRODUCT_NAME;
export const PRODUCT_COPYRIGHT = `Copyright (c) 2026 ${PRODUCT_NAME} contributors`;
export const PRODUCT_LOGO_URL = normalizePublicAssetUrl(
  process.env.NEXT_PUBLIC_APP_LOGO_URL,
);
export const PRODUCT_FAVICON_URL =
  normalizePublicAssetUrl(process.env.NEXT_PUBLIC_FAVICON_URL) ||
  DEFAULT_FAVICON_URL;
