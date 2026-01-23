/**
 * Utilidad para seleccionar la imagen Open Graph apropiada
 * según la plataforma o contexto de uso
 */

const BASE_URL = 'https://fisio-movimiento.com';

export const OG_IMAGE_HORIZONTAL = `${BASE_URL}/og-image-h.png`;
export const OG_IMAGE_VERTICAL = `${BASE_URL}/og-image-v.png`;

/**
 * Detecta si el User-Agent prefiere formato vertical
 * @param userAgent - User-Agent string del navegador/crawler
 * @returns true si prefiere vertical, false si prefiere horizontal
 */
export function prefersVerticalImage(userAgent: string): boolean {
  if (!userAgent) return false;

  // Plataformas que prefieren formato vertical (9:16 o 1:1)
  const verticalPlatforms = [
    /instagram/i, // Instagram (stories, posts)
    /whatsapp/i, // WhatsApp (previews)
    /tiktok/i, // TikTok
    /pinterest/i, // Pinterest (pins verticales)
    /snapchat/i, // Snapchat
  ];

  return verticalPlatforms.some((pattern) => pattern.test(userAgent));
}

/**
 * Detecta la plataforma específica del User-Agent
 */
export function detectPlatform(userAgent: string): string {
  if (!userAgent) return 'unknown';

  if (/facebookexternalhit|facebot/i.test(userAgent)) return 'facebook';
  if (/twitterbot|twitter/i.test(userAgent)) return 'twitter';
  if (/linkedinbot|linkedin/i.test(userAgent)) return 'linkedin';
  if (/instagram/i.test(userAgent)) return 'instagram';
  if (/whatsapp/i.test(userAgent)) return 'whatsapp';
  if (/tiktok/i.test(userAgent)) return 'tiktok';
  if (/pinterest/i.test(userAgent)) return 'pinterest';
  if (/redditbot/i.test(userAgent)) return 'reddit';
  if (/slackbot/i.test(userAgent)) return 'slack';
  if (/discordbot/i.test(userAgent)) return 'discord';

  return 'unknown';
}

/**
 * Selecciona la imagen OG apropiada según el User-Agent
 * @param userAgent - User-Agent string (opcional, se detecta automáticamente si no se provee)
 * @returns URL de la imagen OG apropiada
 */
export function selectOGImage(userAgent?: string): string {
  if (typeof window === 'undefined') {
    // Server-side: usar horizontal por defecto (mejor para la mayoría de crawlers)
    return OG_IMAGE_HORIZONTAL;
  }

  const ua = userAgent || window.navigator.userAgent;
  return prefersVerticalImage(ua) ? OG_IMAGE_VERTICAL : OG_IMAGE_HORIZONTAL;
}

/**
 * Obtiene las dimensiones apropiadas para la imagen OG seleccionada
 * @param isVertical - Si la imagen es vertical
 * @returns Objeto con width y height
 */
export function getOGImageDimensions(isVertical: boolean): {
  width: string;
  height: string;
} {
  if (isVertical) {
    return { width: '1080', height: '1350' }; // Formato 4:5 común en Instagram
  }
  return { width: '1200', height: '630' }; // Formato 1.91:1 estándar Open Graph
}
