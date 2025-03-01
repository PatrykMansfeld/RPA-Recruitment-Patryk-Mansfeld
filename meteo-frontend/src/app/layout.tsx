import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Create and display weather reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
