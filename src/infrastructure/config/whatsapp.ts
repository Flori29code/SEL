export const WHATSAPP_CONFIG = {
  phoneNumber: "51900707304",
  baseUrl: "https://wa.me/",
  defaultMessage: "Hola, estoy interesado en el Bootcamp DevOps"
} as const;

export const generateWhatsAppUrl = (customMessage?: string): string => {
  const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_CONFIG.baseUrl}${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
}; 