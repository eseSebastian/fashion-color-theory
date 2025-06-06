# 🎨 Fashion Color Theory

## 📝 Project Description
Fashion Color Theory is a web application that helps users find perfect color combinations for their outfits using professional color theory principles.

## 🚀 Features
- Interactive color picker
- Multiple color scheme generation (Complementary, Analogous, Triadic, Tetradic, Monochromatic)
- Color copying to clipboard
- Multilingual support (Spanish/English)
- Recent color combinations history

## 💻 Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Vite
- i18next
- Zustand (state management)

## 🔧 Prerequisites
- Node.js (v18+)
- npm (v9+)

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fashion-color-theory.git
cd fashion-color-theory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser

## 🧪 Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Build for Production
```bash
npm run build
```

## 📡 Deployment

### GitHub Pages
1. Update `vite.config.ts` base path if needed
2. Push to GitHub
3. Set up GitHub Pages in repository settings

### Deployment Workflow
A GitHub Actions workflow is included for automatic deployment to GitHub Pages.

## 🌐 Internationalization
- Default language: Spanish
- Toggle between Spanish and English
- Translations managed via i18next

## 🎨 Customization
- Modify color palettes in `src/components/ColorPicker.tsx`
- Update translations in `src/locales/es.json` and `src/locales/en.json`

## 📊 Performance Optimization
- Lazy loading
- Code splitting
- Minimal bundle size

## 🔒 Privacy
- No tracking
- No user data collection
- Runs entirely client-side

## 📝 License
[Your License Here - e.g., MIT]

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
