import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import FadeInObserver from "@/components/FadeInObserver";

const playfair = localFont({
  src: [
    { path: "./fonts/PlayfairDisplay.ttf", style: "normal", weight: "400 900" },
    { path: "./fonts/PlayfairDisplay-Italic.ttf", style: "italic", weight: "400 900" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = localFont({
  src: [{ path: "./fonts/SourceSans3.ttf", style: "normal", weight: "200 900" }],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://joankirera.com"),
  title: {
    default: "Joan Kirera - Therapist & Mental Health Educator",
    template: "%s | Joan Kirera",
  },
  description:
    "Joan Kirera is a professional therapist, speaker, and mental health educator.",
  icons: {
    icon: "/images/logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
        <FadeInObserver />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
