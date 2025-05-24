Sure! Here's a professional and developer-friendly `README.md` file tailored to your St-Weather-App project built with Next.js, OpenWeatherMap, and ShadCN UI:

---

````markdown
# 🌤️ St-Weather-App

A sleek, responsive weather application built with **Next.js**, **Tailwind CSS**, and **ShadCN UI**. This app displays current weather, air quality, UV index, hourly forecast (slider), and a daily forecast list using data from the [OpenWeatherMap API](https://openweathermap.org/api).

---

## 🚀 Features

- 🌍 **Current Weather**: Location-based weather data including temperature, humidity, wind, and pressure.
- ☁️ **Hourly Forecast Slider**: Scrollable hourly data with temperature and icons.
- 📅 **Daily Forecast List**: Selectable list showing temperature and weather icons for upcoming days.
- 🌅 **Sunrise & Sunset**: Timezone-aware formatting.
- 🌬️ **Air Quality & UV Index**: Enriched environmental data.
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop.
- 🎨 **UI Components**: Built using [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), and [Lucide Icons](https://lucide.dev/).

---

## 🧪 Demo

https://st-weather-app.vercel.app

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Lucide Icons](https://lucide.dev/)
- [React](https://reactjs.org/)

---

## 🛠️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/st-weather-app.git
   cd st-weather-app


2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Create environment config**

   Create a `.env.local` file in the root:

   ```env
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   ```

   You can grab your API key from [https://openweathermap.org/api](https://openweathermap.org/api).

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
st-weather-app/
├── components/       # UI components (WeatherCard, ForecastSlider, etc.)
├── lib/              # Formatters and utility functions
├── app/              # Next.js app directory (pages, layouts)
├── public/           # Static assets
├── styles/           # Tailwind/global styles
├── .env.local        # Your API keys (ignored by git)
├── next.config.js    # Image domains + custom config
└── tailwind.config.js
```

---

## 🧼 Lint & Format

```bash
npm run lint
npm run format
```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* [OpenWeatherMap](https://openweathermap.org/)
* [ShadCN UI](https://ui.shadcn.com/)
* [Lucide Icons](https://lucide.dev/)