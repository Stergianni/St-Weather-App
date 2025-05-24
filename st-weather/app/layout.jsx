import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provide"
import ModeToggle from "@/components/ModeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "St-Weather",
  description: "Next.js app (API OpenWeatherMap)",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />

        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="w-full">
              {/* Top-left Mode Toggle */}
              <div className="absolute top-0 right-0 md:p-4">
                <ModeToggle />
              </div>
              {/* Centered Title */}              
              <h1 className="h1 flex justify-center mt-12 xl:mt-[300px]">Weather</h1>
            </header>
            <div>{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
