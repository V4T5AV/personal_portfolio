# Personal Portfolio

A modern, interactive 3D portfolio website built with React, Three.js, and Framer Motion.

## Features

- 🎨 **Modern Dark Theme** - Sleek dark design with gradient accents
- 🌟 **3D Animations** - Interactive 3D scenes with Three.js
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Custom Cursor** - Magnetic cursor effects
- 📊 **Project Showcase** - Interactive project cards with 3D tilt
- 📧 **Contact Form** - Animated contact form with validation
- 🧭 **Navigation Dots** - Smooth section navigation

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **CSS3** - Modern styling with animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── core/                    # Framework-level setup
│   ├── config/             # Configuration files
│   └── providers/          # Context providers
├── features/               # Portfolio sections
│   ├── hero/              # Hero section with 3D background
│   ├── projects/          # Project showcase
│   └── contact/           # Contact form
├── systems/               # Global systems
│   ├── cursor/            # Custom cursor system
│   ├── loader/            # Loading system
│   └── scroll/            # Scroll management
├── ui/                    # Reusable components
│   ├── buttons/           # Button components
│   ├── navigation/        # Navigation components
│   └── transitions/       # Transition components
└── utilities/             # Helper functions
    ├── animation/         # Animation utilities
    ├── three/             # Three.js utilities
    └── helpers/           # General helpers
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors and Theme

The color scheme is defined in CSS custom properties. You can modify the colors in:
- `src/index.css` - Global colors
- Component-specific CSS files

### 3D Scenes

3D scenes are located in:
- `src/features/hero/Hero.scene.jsx` - Hero background scene
- Add new scenes in the `src/features/` directory

### Animations

Animation configurations are in:
- `src/utilities/animation/spring.config.js` - Spring configurations
- `src/utilities/animation/stagger.js` - Stagger animations

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to Netlify

## Performance Optimization

- Lazy loading for 3D models
- Code splitting with Vite
- Optimized Three.js scenes
- Responsive images
- Efficient animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Three.js community
- Framer Motion team
- React Three Fiber contributors 