# Logos del BootCamp DevOps

Esta carpeta contiene los logos y elementos de marca del BootCamp DevOps.

## Estructura recomendada:

```
logos/
├── logo-main.png          # Logo principal (fondo transparente)
├── logo-main.svg          # Logo principal en formato vectorial
├── logo-white.png         # Logo para fondos oscuros
├── logo-white.svg         # Logo blanco en formato vectorial
├── logo-dark.png          # Logo para fondos claros
├── logo-dark.svg          # Logo oscuro en formato vectorial
├── favicon.ico            # Favicon para el navegador
├── favicon-16x16.png      # Favicon 16x16
├── favicon-32x32.png      # Favicon 32x32
└── apple-touch-icon.png   # Icono para dispositivos Apple
```

## Formatos recomendados:

- **SVG**: Para logos que necesiten escalarse sin perder calidad
- **PNG**: Para logos con transparencia
- **ICO**: Para favicons

## Tamaños recomendados:

- **Logo principal**: 200x60px (aproximadamente)
- **Logo para header**: 150x45px
- **Favicon**: 16x16, 32x32, 48x48px
- **Apple touch icon**: 180x180px

## Uso en el código:

```tsx
// En el Header
<img src="/assets/images/logos/logo-main.svg" alt="BootCamp DevOps" />

// En el Footer (fondo oscuro)
<img src="/assets/images/logos/logo-white.svg" alt="BootCamp DevOps" />
```

## Notas:

- Todos los logos deben mantener la identidad visual del BootCamp DevOps
- Usar colores de la paleta: #004e89 (primary), #007acc (secondary), #f5a623 (accent)
- Mantener proporciones y legibilidad en todos los tamaños 