export const ASSETS_CONFIG = {
  logos: {
    main: '/assets/images/logos/logo-main.svg',
    white: '/assets/images/logos/logo-white.png',
    dark: '/assets/images/logos/logo-main.svg', // Usar el main como fallback para dark
    favicon: '/assets/images/logos/favicon.ico',
    appleTouchIcon: '/assets/images/logos/apple-touch-icon.png'
  },
  icons: {
    // Aquí puedes agregar iconos personalizados
    placeholder: '/assets/images/icons/placeholder.svg'
  },
  paymentMethods: {
    yape: '/assets/images/payment-methods/yape.svg',
    plin: '/assets/images/payment-methods/plin.svg',
    interbank: '/assets/images/payment-methods/interbank.svg',
    scotiabank: '/assets/images/payment-methods/scotiabank.svg',
    bcp: '/assets/images/payment-methods/bcp.svg',
    bbva: '/assets/images/payment-methods/bbva.svg',
    paypal: '/assets/images/payment-methods/paypal.svg'
  },
  backgrounds: {
    hero: '/assets/images/backgrounds/hero-bg.jpg',
    pattern: '/assets/images/backgrounds/pattern.svg'
  }
} as const;

// Helper function para verificar si un asset existe
export const checkAssetExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Helper function para obtener la ruta de un logo con fallback
export const getLogoPath = (variant: 'main' | 'white' | 'dark' = 'main'): string => {
  return ASSETS_CONFIG.logos[variant];
}; 