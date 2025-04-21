import "./globals.css";
import { ThemeProvider } from "./theme-provider"; // ✅ named import!

export const metadata = {
  title: "St-Weather",
  description: "Simple Weather App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
