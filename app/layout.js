import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.goldengrovecleaning.com"),
  title: {
    default: "Top Cleaning Services in Texas | House & Commercial | Golden Grove",
    template: "%s | Golden Grove Cleaning",
  },
  description:
    "Golden Grove Cleaning provides top-rated professional house cleaning, deep cleaning, move-out, and commercial janitorial services across Texas. Call (432) 218-1700.",
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-white">
        {children}
      </body>
    </html>
  );
}
