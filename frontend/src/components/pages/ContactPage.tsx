import { Header } from "@/components/layout/Header";
import { FAQContact } from "@/components/sections/FAQContact";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function ContactPage() {
  usePageMetadata(
    "Contact | DotCode",
    "Tell DotCode about your project and explore how our software, web, mobile, SaaS and AI team can help.",
  );

  return (
    <main
      data-light-page-header
      className="relative z-10 w-full bg-white"
    >
      <Header />
      <FAQContact />
    </main>
  );
}
