import type { Metadata } from "next";
import "./globals.css";
import ParticlesBackground from "./components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Maleesha — Software Engineer",
  description: "Full-stack developer & AI enthusiast based in Sri Lanka.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ParticlesBackground />
        {children}
      </body>
    </html>
  );
}