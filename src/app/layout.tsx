import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cynthia Yao | Cybersecurity & AI Developer",
  description:
    "Personal site of Cynthia Yao — Junior CS major at the University of Florida. Cybersecurity enthusiast, full-stack developer, and AI/ML engineer. Explore projects, writeups, and more.. at RaccFields.",
  openGraph: {
    title: "Cynthia Yao | Cybersecurity & AI Developer",
    description:
      "Junior CS major at UF — passionate about cybersecurity, full-stack development, and AI/ML. Portfolio, projects, and experiments at RaccFields.",
    url: "https://raccfields.dev",
    siteName: "RaccFields",
    images: [
      {
        url: "/og-image.png", // put this file inside /public
        width: 1200,
        height: 630,
        alt: "Cynthia Yao Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cynthia Yao | Cybersecurity & AI Developer",
    description:
      "CS major at UF. Cybersecurity enthusiast, full-stack developer, and AI/ML engineer. Projects & experiments at RaccFields.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="red"
          enableSystem
          value={{
            light: "light",
            dark: "dark",
            red: "red",
          }}
          disableTransitionOnChange
        >
          {children}
        <SpeedInsights />
        </ThemeProvider>
        
      </body>
    </html>
  );
}
