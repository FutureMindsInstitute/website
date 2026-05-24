import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Future Minds Institute — Build Skills for the AI Era",
  description: "Hands-on AI training for working professionals and students. Learn from industry leaders at Google, Amazon, Microsoft and beyond. Powered by Women in Product India.",
  metadataBase: new URL("https://futuremindsinstitute.com"),
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    shortcut: "/logo.jpeg",
  },
  openGraph: {
    title: "Future Minds Institute — Build Skills for the AI Era",
    description: "Hands-on AI training for working professionals and students. 1000+ trained. Powered by Women in Product India.",
    url: "https://futuremindsinstitute.com",
    siteName: "Future Minds Institute",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Future Minds Institute — AI Training Workshop",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Minds Institute — Build Skills for the AI Era",
    description: "Hands-on AI training for working professionals and students. 1000+ trained. Powered by Women in Product India.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
