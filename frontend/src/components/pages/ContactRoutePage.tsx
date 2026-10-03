import { Header } from "@/components/layout/Header";
import { FAQContact } from "@/components/sections/FAQContact";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export function ContactRoutePage() {
  usePageMetadata(
    "Contact | DotCode",
    "Tell DotCode about your project and get in touch with our team.",
  );

  return (
    <main data-light-page-header className="relative z-10 min-h-dvh w-full bg-white">
      <Header />
      <h1 className="sr-only">Contact DotCode</h1>
      <FAQContact />
    </main>
  );
}
