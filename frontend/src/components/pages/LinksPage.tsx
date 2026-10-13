import { useEffect, type ComponentType, type SVGProps } from "react";
import {
  ArrowUpRight,
  Code2,
  FolderOpen,
  Globe2,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { images, socialLinks } from "@/data/site";
import "./LinksPage.css";

const siteUrl = "https://www.dotcodeagency.tech";

type LinkCardProps = {
  title: string;
  detail: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: string;
  variant?: string;
  external?: boolean;
};

function LinkCard({
  title,
  detail,
  href,
  Icon,
  tone = "links-tone-white",
  variant = "links-card-default",
  external = false,
}: LinkCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`links-card ${variant}`}
    >
      <span className="links-card-top">
        <Icon aria-hidden="true" className={`links-card-icon ${tone}`} />
        <ArrowUpRight aria-hidden="true" className="links-arrow" />
      </span>

      <span className="links-card-copy">
        <span className="links-card-title">
          <span className="links-title-label">{title}</span>
        </span>
        <span className="links-card-detail">{detail}</span>
      </span>
    </a>
  );
}

function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 7v11"
        stroke="#4285f4"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="m4 7 8 6"
        stroke="#ea4335"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="m12 13 8-6"
        stroke="#fbbc04"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 7v11"
        stroke="#34a853"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  WhatsApp: FaWhatsapp,
} as const;

const socialDetails = {
  Facebook: {
    detail: "Follow the studio",
    tone: "links-tone-facebook",
    variant: "links-card-facebook",
  },
  Instagram: {
    detail: "@dotcode.agency",
    tone: "links-tone-instagram",
    variant: "links-card-instagram",
  },
  LinkedIn: {
    detail: "DotCode Agency",
    tone: "links-tone-linkedin",
    variant: "links-card-linkedin",
  },
  WhatsApp: {
    detail: "Message our team",
    tone: "links-tone-whatsapp",
    variant: "links-card-whatsapp",
  },
} as const;

const socialOrder = [
  "LinkedIn",
  "Facebook",
  "Instagram",
  "WhatsApp",
] as const;

export default function LinksPage() {
  useEffect(() => {
    const title = "DotCode | Links";
    const description =
      "Explore DotCode's software, web and AI services, visit our website, or get in touch to start a project.";

    const previousTitle = document.title;
    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = descriptionMeta?.content;

    descriptionMeta?.setAttribute("content", description);

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    const createdCanonical = !canonical;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }

    const previousCanonical = canonical.href;
    canonical.href = `${siteUrl}/Links`;

    return () => {
      document.title = previousTitle;

      if (descriptionMeta && previousDescription !== undefined) {
        descriptionMeta.content = previousDescription;
      }

      if (createdCanonical) {
        canonical?.remove();
      } else if (canonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  const orderedSocials = socialOrder
    .map((name) => socialLinks.find((link) => link.name === name))
    .filter((link): link is (typeof socialLinks)[number] => Boolean(link));

  return (
    <main id="dotcode-links-page" className="links-page">
      <div className="links-content">
        <header className="links-hero">
          <span className="links-logo">
            <img
              src={images.group61}
              alt="DotCode logo"
              width="391"
              height="213"
              className="links-logo-image"
            />
          </span>

          <div className="links-intro">
            <h1>DotCode Agency</h1>
            <p>
              We transform ambitious ideas into powerful digital products. From
              modern websites and mobile applications to scalable SaaS platforms
              and intelligent AI solutions, DotCode combines strategy, design,
              and technology to build digital experiences that help businesses
              innovate, grow, and stand out.
            </p>
          </div>
        </header>

        <nav aria-label="DotCode links" className="links-grid">
          <LinkCard
            title="Website"
            detail="dotcodeagency.tech"
            href={siteUrl}
            Icon={Globe2}
            tone="links-tone-white"
            variant="links-card-portfolio"
            external
          />

          {orderedSocials.slice(0, 3).map(({ name, href }) => {
            const Icon = socialIcons[name as keyof typeof socialIcons];
            const detail = socialDetails[name as keyof typeof socialDetails];

            return (
              <LinkCard
                key={name}
                title={name}
                detail={detail.detail}
                href={href}
                Icon={Icon}
                tone={detail.tone}
                variant={detail.variant}
                external
              />
            );
          })}

          {orderedSocials.slice(3).map(({ name, href }) => {
            const Icon = socialIcons[name as keyof typeof socialIcons];
            const detail = socialDetails[name as keyof typeof socialDetails];

            return (
              <LinkCard
                key={name}
                title={name}
                detail={detail.detail}
                href={href}
                Icon={Icon}
                tone={detail.tone}
                variant={detail.variant}
                external
              />
            );
          })}

          <LinkCard
            title="Email"
            detail="dotcode.agency@gmail.com"
            href="mailto:dotcode.agency@gmail.com"
            Icon={GmailIcon}
            tone="links-tone-white"
            variant="links-card-email"
          />

          <section
            aria-label="Explore DotCode"
            className="links-feature"
          >
            <a href="/services" className="links-feature-link">
              <Code2
                aria-hidden="true"
                className="links-feature-icon"
              />
              <span className="links-feature-copy">
                <span className="links-feature-title">
                  Explore services
                </span>
                <span className="links-feature-detail">
                  Websites, apps, SaaS and AI
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="links-feature-arrow"
              />
            </a>

            <a
              href="/#contact"
              className="links-feature-link links-feature-link-secondary"
            >
              <MessageCircle
                aria-hidden="true"
                className="links-feature-icon"
              />
              <span className="links-feature-copy">
                <span className="links-feature-title">
                  Start a project
                </span>
                <span className="links-feature-detail">
                  Let's make something together
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="links-feature-arrow"
              />
            </a>
          </section>

          <LinkCard
            title="Call us"
            detail="+213 656 26 47 76"
            href="tel:+213656264776"
            Icon={Phone}
            tone="links-tone-whatsapp"
            variant="links-card-whatsapp"
          />

          <LinkCard
            title="Projects"
            detail="See what we're building"
            href="/projects"
            Icon={FolderOpen}
            tone="links-tone-lime"
            variant="links-card-projects"
          />
        </nav>
      </div>
    </main>
  );
}