import { usePageMetadata } from "@/hooks/usePageMetadata";

const sections = [
  {
    title: "Who we are",
    content: (
      <p>
        DotCode Agency ("DotCode", "we", "us") operates this website and is
        responsible for the personal information described here. We are based
        in Algeria. For privacy questions or requests, email{" "}
        <a className="text-[#455CE9] underline underline-offset-4" href="mailto:dotcode.agency@gmail.com">
          dotcode.agency@gmail.com
        </a>.
      </p>
    ),
  },
  {
    title: "Information we collect",
    content: (
      <>
        <p>We collect information you choose to send through this website:</p>
        <ul>
          <li>
            <strong>Project enquiries:</strong> name and email address, plus any
            phone number, company, project type, requested service, budget,
            currency, or message you provide.
          </li>
          <li>
            <strong>Newsletter requests:</strong> your email address when you
            submit the newsletter form.
          </li>
        </ul>
        <p>
          When the website or its API is requested, hosting and infrastructure
          providers may also process technical information such as an IP
          address, browser details, request time, and diagnostic logs to
          deliver and protect the service.
        </p>
      </>
    ),
  },
  {
    title: "How we use information",
    content: (
      <ul>
        <li>To read and respond to project enquiries and contact requests.</li>
        <li>To send newsletter updates when you submit the subscription form.</li>
        <li>To operate, maintain, secure, and improve this website and its forms.</li>
        <li>To meet legal obligations and handle legitimate business records.</li>
      </ul>
    ),
  },
  {
    title: "Our legal grounds",
    content: (
      <p>
        Where data-protection law requires a legal ground, we process enquiry
        details to take steps you request before a possible agreement and to
        communicate with you; newsletter details on the basis of your
        subscription request; and technical information where needed to operate
        and secure the website or comply with law. You can ask us to stop
        newsletter messages at any time.
      </p>
    ),
  },
  {
    title: "Service providers and international processing",
    content: (
      <>
        <p>
          We use service providers to run the website and process submissions.
          Contact and newsletter form requests are sent to our API hosted through
          Render. The site also loads fonts from Google Fonts and, where shown,
          flag and icon assets from FlagCDN and Flaticon. Those providers may
          receive technical connection information when your browser requests
          their services.
        </p>
        <p>
          Our social links take you to services such as Facebook, Instagram,
          LinkedIn, and WhatsApp. If you follow one, that service handles your
          activity under its own privacy terms. Some service providers may
          process information in countries other than the one where you live.
          Contact us if you need details about a particular provider or
          applicable transfer safeguards.
        </p>
        <p>
          We do not sell personal information. We share it only with providers
          needed to operate the site, when you ask us to, or when the law
          requires it.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep information",
    content: (
      <p>
        We keep enquiry information for as long as needed to respond, manage the
        resulting business relationship, and meet legal requirements. We keep
        newsletter details while your subscription is active and act on
        unsubscribe or deletion requests. Technical logs are kept according to
        the retention practices of the relevant hosting and infrastructure
        providers. We delete or de-identify information when it is no longer
        needed, subject to any legal retention duties.
      </p>
    ),
  },
  {
    title: "Cookies and browser storage",
    content: (
      <p>
        This website does not currently use advertising or analytics cookies.
        It stores your language preference in local browser storage and uses
        session storage for page-transition behavior. These items support site
        functions; you can clear or block them in your browser settings, though
        your saved language or some transitions may not work as expected.
      </p>
    ),
  },
  {
    title: "Your choices and privacy rights",
    content: (
      <>
        <p>
          You can email us to ask what personal information we hold about you,
          correct it, request deletion or restriction, object to certain uses,
          or withdraw a newsletter subscription. Rights and procedures depend
          on the law that applies to you. We may need to verify your identity
          before acting on a request.
        </p>
        <p>
          To unsubscribe, reply to a DotCode newsletter or email{" "}
          <a className="text-[#455CE9] underline underline-offset-4" href="mailto:dotcode.agency@gmail.com">
            dotcode.agency@gmail.com
          </a>.
        </p>
      </>
    ),
  },
  {
    title: "Children",
    content: (
      <p>
        This website is intended for businesses and adults. We do not knowingly
        ask children to provide personal information. If you believe a child
        has sent us information, contact us so we can review and remove it
        where appropriate.
      </p>
    ),
  },
  {
    title: "Security and updates",
    content: (
      <>
        <p>
          We and our service providers use reasonable measures designed to
          protect information. No website or transmission method can be
          guaranteed completely secure.
        </p>
        <p>
          We may update this policy when our practices or legal requirements
          change. The date below shows when it was last revised.
        </p>
      </>
    ),
  },
];

export function PrivacyPolicyPage() {
  usePageMetadata(
    "Privacy Policy | DotCode",
    "Learn how DotCode collects, uses, and protects information submitted through its website.",
  );

  return (
    <main className="relative z-10 min-h-dvh w-full bg-white px-4 py-10 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <article className="mx-auto max-w-[880px]">
        <p className="font-sora text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
          DotCode / Legal
        </p>
        <h1 className="mt-5 font-sora text-[clamp(2.7rem,8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-black">
          Privacy Policy<span className="text-[#455CE9]">.</span>
        </h1>
        <p className="mt-4 font-inter text-xs font-medium uppercase tracking-[0.08em] text-black/45">
          Last updated: October 9, 2026
        </p>
        <p className="mt-8 max-w-[720px] border-t border-black/10 pt-7 font-inter text-[15px] leading-7 text-black/65 sm:text-base sm:leading-8">
          This policy explains what information DotCode receives through this
          website, how we use it, and the choices you have.
        </p>

        <div className="mt-8">
          {sections.map(({ title, content }, index) => (
            <section key={title} className="border-b border-black/[0.08] py-6 first:pt-2 last:border-b-0 sm:py-7">
              <h2 className="flex items-baseline gap-3 font-sora text-lg font-semibold tracking-[-0.04em] text-black sm:text-xl">
                <span className="font-mono text-[11px] font-medium tracking-normal text-[#455CE9]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{title}</span>
              </h2>
              <div className="mt-3 space-y-4 font-inter text-sm leading-7 text-black/65 sm:ml-8 sm:text-[15px] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-black [&_ul]:space-y-2">
                {content}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
