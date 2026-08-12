import type { Metadata, Viewport } from "next";
import { Figtree, Manrope, Syne } from "next/font/google";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1210" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} ${figtree.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('portfolio-theme-mode')||'system';var h=localStorage.getItem('portfolio-accent-hue')||'168';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var r=m==='system'?(d?'dark':'light'):m;document.documentElement.dataset.theme=r;document.documentElement.style.setProperty('--accent-hue',h);document.documentElement.style.colorScheme=r;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>
          <AuroraBackground />
          <div className="site-shell">
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
