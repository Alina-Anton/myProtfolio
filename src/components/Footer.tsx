import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-brand">{siteConfig.name}</p>
          <p className="footer-copy">Built to showcase work clearly — demos first.</p>
        </div>
        <div className="footer-links">
          <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
