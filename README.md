# Cliq Weather App

A modern weather application built with Next.js that provides real-time weather information and forecasts. Users can
search for cities, view current weather conditions, and access 5-day forecasts with daily weather evolution charts.

- 🔗 Live Demo: [Weather App](https://cliq-weather-app-storybook.vercel.app/)
- 📚 Storybook: [Component Library](https://cliq-weather-app.vercel.app/)

## Features

- 🌍 Location-based weather detection on initial load
- 🔍 City search functionality
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 📊 5-day weather forecast
- 📈 Daily weather evolution charts
- 📱 Fully responsive design
- ♿ Accessibility focused

## Technologies

- Framework: [Next.js](https://nextjs.org/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: [PostCSS](https://postcss.org/)
- Testing: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Component Documentation: [Storybook](https://storybook.js.org/)
- State Management: Context API
- API: [Accuweather API](https://developer.accuweather.com/apis)

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/iibarbari/cliq-weather-app.git
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Accuweather API key

```bash
NEXT_PUBLIC_ACCUWEATHER_API_KEY=your_api_key
NEXT_PUBLIC_ACCUWEATHER_API_URL=https://dataservice.accuweather.com
```

4. Start the development server

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
src/
├── app/            # Main application layout
├── components/     # Reusable UI components 
├── contexts/       # Context providers
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Helper functions and utilities
```


### Testing

Run the following command to execute the test suite:

```bash
pnpm run test
```

### Code Quality

This project maintains high code quality standards through:

- ESLint for code linting
- Husky for pre-commit hooks
- Stylelint for CSS linting
- TypeScript for static type checking
- Storybook for component documentation and visual testing

```bash
pnpm run lint
```

```bash
pnpm run stylelint
```

### Storybook

Run the following command to start Storybook:

```bash
pnpm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser to view the Storybook documentation.

## License

This project is licensed under the MIT License
