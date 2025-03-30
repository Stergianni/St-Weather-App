# St-Weather-App

St-Weather-App is a weather application built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Material-UI](https://mui.com). It allows users to search for weather information by city and toggle between light and dark themes.

## Features

- Fetch current weather data using the [OpenWeather API](https://openweathermap.org/api).
- Light and dark mode support with a theme toggle.
- Responsive design using Tailwind CSS and Material-UI components.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm, yarn, pnpm, or bun (any package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/St-Weather-App.git
   cd St-Weather-App/weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the `weather-app` directory and add your OpenWeather API key:

   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Project Structure

```
St-Weather-App/
├── app/                # Contains the main application files, including pages, components, and styles.
├── public/             # Static assets such as images and icons.
├── tailwind.config.js  # Tailwind CSS configuration.
├── postcss.config.mjs  # PostCSS configuration.
├── next.config.mjs     # Next.js configuration.
```

## License

This project is licensed under the Apache License 2.0.

