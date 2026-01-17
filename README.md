# chibivue.land

chibivue.land is the official website for the chibivue community - a virtual kingdom on the internet where Vue.js enthusiasts gather to learn, build, and share.

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **3D Graphics**: [TresJS](https://tresjs.org/)
- **Styling**: [Lightning CSS](https://lightningcss.dev/)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Color Mode**: [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Deployment**: GitHub Pages

## Development

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Generate static site
bun generate

# Preview production build
bun preview
```

## Project Structure

```
chibivue.land/
├── app/
│   ├── app.vue
│   ├── assets/css/          # Global styles
│   ├── components/          # Vue components
│   │   ├── home/            # Home page sections
│   │   ├── kawaiko/         # Mascot components
│   │   ├── layout/          # Header, Footer, etc.
│   │   ├── tres/            # 3D scene components
│   │   └── ui/              # Reusable UI components
│   ├── composables/         # Vue composables
│   ├── layouts/             # Nuxt layouts
│   └── pages/               # Route pages
├── i18n/locales/            # Translation files (EN/JA)
├── public/                  # Static assets
└── .github/workflows/       # CI/CD
```

## Features

- Responsive design (mobile-first)
- Dark/Light mode support
- Multi-language support (English/Japanese)
- Interactive 3D scene with TresJS
- Static site generation for GitHub Pages

## Links

- [chibivue Book](https://ubugeeei.github.io/chibivue/)
- [GitHub Organization](https://github.com/chibivue-land)

## License

MIT
