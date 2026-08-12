import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-links">
          <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
