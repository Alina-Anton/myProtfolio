"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { siteConfig } from "@/lib/site";
import { haptic } from "@/lib/haptics";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          href="/"
          className="brand"
          onClick={() => haptic.tap()}
          aria-label={`${siteConfig.name} home`}
        >
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">{siteConfig.name}</span>
        </Link>

        <div className="header-actions">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
