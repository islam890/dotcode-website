import { SiInstagram } from "react-icons/si";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { images, socialLinks } from "@/data/site";
import { flaticonAttributions, flaticonIcons } from "@/data/flaticonIcons";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: SiInstagram,
  LinkedIn: FaLinkedinIn,
  WhatsApp: FaWhatsapp,
} as const;

export function Footer() {
  return (
    <footer
      id="site-footer"
      data-site-footer
      className="fixed inset-x-0 bottom-0 z-0 h-dvh max-h-dvh overflow-y-auto overflow-x-hidden bg-black px-4 py-8 text-white sm:px-8 xl:px-10 xl:py-6"
    >
      <img
        alt=""
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[743px] w-[746px] max-w-none -translate-y-1/2 object-cover opacity-35 lg:block"
        src={images.rectangle45}
      />

      <div className="relative z-10 mx-auto max-w-[1457px]">
        {/* Contact CTA */}
        <div
          data-reveal
          data-footer-cta
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start"
        >
          <h2 data-footer-heading className="max-w-[420px] font-sora text-[clamp(1.8rem,5.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white sm:text-[clamp(2.2rem,4vw,3.2rem)] lg:text-[48px]">
            Ready to elevate your idea to business ?
          </h2>

          <div data-footer-start className="flex flex-col items-start gap-6 pt-8 lg:items-end lg:pt-16 lg:text-right">
            <div className="flex flex-col gap-4 tracking-[-0.06em] sm:gap-5">
              <p className="font-inter text-[1rem] font-normal leading-none text-[#8d8d8d] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.2rem]">
                Let&rsquo;s start
              </p>

              <p data-footer-project className="font-sora text-[clamp(2.3rem,8vw,4.4rem)] font-bold leading-none sm:text-[clamp(2.8rem,8vw,5rem)] lg:text-[92px]">
                Your Project
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="mailto:hello@dotcode.agency"
                className="font-inter text-[11px]! font-extrabold! uppercase tracking-[0.08em] text-[#b7ff3c] underline decoration-2 underline-offset-4 transition-opacity duration-200 hover:opacity-80 sm:text-[12px]!"
              >
                get in touch
              </a>

              <span
                className="size-[22px] sm:size-[26px]"
                style={{
                  backgroundColor: "#b7ff3c",
                  maskImage: `url(${flaticonIcons.arrowUpRight})`,
                  WebkitMaskImage: `url(${flaticonIcons.arrowUpRight})`,
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Feature line */}
        <div data-footer-feature className="mt-8 flex items-center justify-between border-b border-white/15 pb-2 font-sora text-[13px] text-white/70 sm:text-[15px] lg:mt-6">
          <ul className="list-disc ps-6">
            <li>Impactful Creative</li>
          </ul>

          <ul className="list-disc ps-6">
            <li>Global Support</li>
          </ul>
        </div>

        {/* Footer content */}
        <div data-footer-content className="mt-10 flex flex-col gap-12 sm:gap-16 lg:mt-8 lg:gap-10">
          {/* Brand + socials */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <div data-footer-brand className="flex max-w-[250px] flex-col">
              <div data-footer-brand-logo className="h-[100px] w-[150px] sm:h-[110px] sm:w-[160px] lg:h-[120px] lg:w-[170px]">
                <img
                  alt="DotCode"
                  className="size-full object-contain"
                  src={images.group101}
                />
              </div>

              <p data-footer-brand-description className="mt-5 font-inter text-[12px] font-normal leading-[1.4] tracking-[-0.02em] text-white/80 sm:text-[13px] md:text-[14px]">
                We hope to empower user and simplify their everyday lives
              </p>
            </div>

            <div data-footer-socials className="flex max-w-[452px] flex-col gap-5 sm:gap-6">
              <p data-footer-social-title className="font-sora text-[clamp(1.6rem,5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-white sm:text-[2.1rem] lg:text-[2.5rem]">
                Explore the socials of dotcode
              </p>

              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map(({ name, href }) => {
                  const SocialIcon = socialIcons[name];

                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      data-footer-social-link
                      aria-label={name}
                      className="flex size-[48px] items-center justify-center rounded-full border border-white/20 bg-white/3 text-white/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b7ff3c] hover:bg-[#b7ff3c] hover:text-black hover:shadow-[0_8px_24px_rgba(183,255,60,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7ff3c] sm:size-[52px] lg:size-[56px]"
                    >
                      <SocialIcon
                        className="size-[18px] sm:size-[20px] lg:size-[22px]"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright + Newsletter */}
          <div data-footer-bottom className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="order-last font-inter text-[12px] font-normal text-white/80 sm:text-[13px] md:order-first">
              © 2026 DotCode Agency — Algérie. All Right Reserved.
            </p>

            <form
              className="order-first flex w-full max-w-[498px] flex-col gap-2 md:order-last"
              onSubmit={(event) => event.preventDefault()}
            >
              <label
                htmlFor="email"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:text-[12px]"
              >
                Email Address
              </label>

              <div className="flex h-[48px] items-center gap-2 rounded-full border border-white/20 bg-white/3 p-1.5 transition-colors duration-200 focus-within:border-white/40 sm:h-[52px] sm:p-1.5 lg:h-[54px]">
                <input
                  id="email"
                  type="email"
                  aria-label="Email address"
                  placeholder="your@email.com"
                  disabled
                  className="min-w-0 flex-1 bg-transparent px-3 font-sora text-[12px] text-white placeholder:text-white/30 focus:outline-none sm:px-4 sm:text-[13px]"
                />

                <button
                  type="submit"
                  disabled
                  className="flex h-full shrink-0 items-center justify-center rounded-full bg-[#b7ff3c] px-4 font-inter text-[9px]! font-extrabold! uppercase tracking-[0.06em] text-black disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c4ff62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7ff3c] sm:px-5 sm:text-[10px]!"
                >
                  Send
                </button>
              </div>

              <p data-footer-newsletter-note className="font-sora text-[12px] leading-[1.3] sm:text-[13px]">
                <span className="text-[#8d8d8d]">
                  Newsletter sign-ups are currently unavailable.{" "}
                </span>
                <span className="font-semibold uppercase underline">privacy policy</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
