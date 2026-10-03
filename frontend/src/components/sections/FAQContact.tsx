import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApiError } from "@/api/client";
import { createContactMessage } from "@/api/contact";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    question: "What happens after I share my idea?",
    answer:
      "We will review your goals and get back to you to arrange a quick conversation about the right next steps.",
  },
  {
    question: "What kind of projects does DotCode take on?",
    answer:
      "We work on websites, web and mobile applications, AI solutions, and custom digital products.",
  },
  {
    question: "Can you help shape an early-stage idea?",
    answer:
      "Yes. We can help define the product, map its key features, and plan a practical path from concept to launch.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Timelines depend on the scope. After we understand what you need, we will share a clear plan and schedule.",
  },
  {
    question: "Do you work with teams outside Algeria?",
    answer:
      "Yes. We collaborate remotely with teams and businesses wherever they are.",
  },
  {
    question: "Can we talk before deciding to work together?",
    answer:
      "Of course. Send a short note using the form and we will arrange an introductory conversation.",
  },
];

// ISO 3166 country codes with their international calling prefixes.
const countryRows = `
AF|93|Afghanistan
AX|358|Aland Islands
AL|355|Albania
DZ|213|Algeria
AS|1684|American Samoa
AD|376|Andorra
AO|244|Angola
AC|247|Ascension Island
AI|1264|Anguilla
AQ|672|Antarctica
AG|1268|Antigua and Barbuda
AR|54|Argentina
AM|374|Armenia
AW|297|Aruba
AU|61|Australia
AT|43|Austria
AZ|994|Azerbaijan
BS|1242|Bahamas
BH|973|Bahrain
BD|880|Bangladesh
BB|1246|Barbados
BY|375|Belarus
BE|32|Belgium
BZ|501|Belize
BJ|229|Benin
BM|1441|Bermuda
BT|975|Bhutan
BO|591|Bolivia
BQ|599|Bonaire, Sint Eustatius and Saba
BA|387|Bosnia and Herzegovina
BW|267|Botswana
BR|55|Brazil
IO|246|British Indian Ocean Territory
VG|1284|British Virgin Islands
BN|673|Brunei
BV|47|Bouvet Island
BG|359|Bulgaria
BF|226|Burkina Faso
BI|257|Burundi
KH|855|Cambodia
CM|237|Cameroon
CA|1|Canada
CV|238|Cape Verde
KY|1345|Cayman Islands
CF|236|Central African Republic
TD|235|Chad
CL|56|Chile
CN|86|China
CX|61|Christmas Island
CC|61|Cocos Islands
CO|57|Colombia
KM|269|Comoros
CG|242|Congo
CD|243|Congo, Democratic Republic
CK|682|Cook Islands
CR|506|Costa Rica
CI|225|Cote d'Ivoire
HR|385|Croatia
CU|53|Cuba
CW|599|Curacao
CY|357|Cyprus
CZ|420|Czechia
DK|45|Denmark
DJ|253|Djibouti
DM|1767|Dominica
DO|1809|Dominican Republic
EC|593|Ecuador
EG|20|Egypt
SV|503|El Salvador
GQ|240|Equatorial Guinea
ER|291|Eritrea
EE|372|Estonia
SZ|268|Eswatini
ET|251|Ethiopia
FK|500|Falkland Islands
FO|298|Faroe Islands
FJ|679|Fiji
FI|358|Finland
FR|33|France
GF|594|French Guiana
TF|262|French Southern Territories
PF|689|French Polynesia
GA|241|Gabon
GM|220|Gambia
GE|995|Georgia
DE|49|Germany
GH|233|Ghana
GI|350|Gibraltar
GR|30|Greece
GL|299|Greenland
GD|1473|Grenada
GS|500|South Georgia and South Sandwich Islands
GP|590|Guadeloupe
GU|1671|Guam
GT|502|Guatemala
GG|441481|Guernsey
GN|224|Guinea
GW|245|Guinea-Bissau
GY|592|Guyana
HT|509|Haiti
HN|504|Honduras
HK|852|Hong Kong
HM|672|Heard Island and McDonald Islands
HU|36|Hungary
IS|354|Iceland
IN|91|India
ID|62|Indonesia
IR|98|Iran
IQ|964|Iraq
IE|353|Ireland
IM|441624|Isle of Man
IT|39|Italy
JM|1876|Jamaica
JP|81|Japan
JE|441534|Jersey
JO|962|Jordan
KZ|7|Kazakhstan
KE|254|Kenya
KI|686|Kiribati
XK|383|Kosovo
KW|965|Kuwait
KG|996|Kyrgyzstan
LA|856|Laos
LV|371|Latvia
LB|961|Lebanon
LS|266|Lesotho
LR|231|Liberia
LY|218|Libya
LI|423|Liechtenstein
LT|370|Lithuania
LU|352|Luxembourg
MO|853|Macao
MG|261|Madagascar
MW|265|Malawi
MY|60|Malaysia
MV|960|Maldives
ML|223|Mali
MT|356|Malta
MH|692|Marshall Islands
MQ|596|Martinique
MR|222|Mauritania
MU|230|Mauritius
YT|262|Mayotte
MX|52|Mexico
FM|691|Micronesia
MD|373|Moldova
MC|377|Monaco
MN|976|Mongolia
ME|382|Montenegro
MS|1664|Montserrat
MA|212|Morocco
MZ|258|Mozambique
MM|95|Myanmar
NA|264|Namibia
NR|674|Nauru
NP|977|Nepal
NL|31|Netherlands
NC|687|New Caledonia
NZ|64|New Zealand
NI|505|Nicaragua
NE|227|Niger
NG|234|Nigeria
NU|683|Niue
NF|672|Norfolk Island
KP|850|North Korea
MK|389|North Macedonia
MP|1670|Northern Mariana Islands
NO|47|Norway
OM|968|Oman
PK|92|Pakistan
PW|680|Palau
PS|970|Palestine
PA|507|Panama
PG|675|Papua New Guinea
PY|595|Paraguay
PE|51|Peru
PH|63|Philippines
PN|64|Pitcairn Islands
PL|48|Poland
PT|351|Portugal
PR|1787|Puerto Rico
QA|974|Qatar
RE|262|Reunion
RO|40|Romania
RU|7|Russia
RW|250|Rwanda
BL|590|Saint Barthelemy
SH|290|Saint Helena
KN|1869|Saint Kitts and Nevis
LC|1758|Saint Lucia
MF|590|Saint Martin
PM|508|Saint Pierre and Miquelon
VC|1784|Saint Vincent and the Grenadines
WS|685|Samoa
SM|378|San Marino
ST|239|Sao Tome and Principe
SA|966|Saudi Arabia
SN|221|Senegal
RS|381|Serbia
SC|248|Seychelles
SL|232|Sierra Leone
SG|65|Singapore
SX|1721|Sint Maarten
SK|421|Slovakia
SI|386|Slovenia
SB|677|Solomon Islands
SO|252|Somalia
ZA|27|South Africa
KR|82|South Korea
SS|211|South Sudan
ES|34|Spain
LK|94|Sri Lanka
SD|249|Sudan
SR|597|Suriname
SJ|4779|Svalbard and Jan Mayen
SE|46|Sweden
CH|41|Switzerland
SY|963|Syria
TW|886|Taiwan
TJ|992|Tajikistan
TZ|255|Tanzania
TH|66|Thailand
TL|670|Timor-Leste
TG|228|Togo
TK|690|Tokelau
TA|290|Tristan da Cunha
TO|676|Tonga
TT|1868|Trinidad and Tobago
TN|216|Tunisia
TR|90|Turkey
TM|993|Turkmenistan
TC|1649|Turks and Caicos Islands
TV|688|Tuvalu
VI|1340|U.S. Virgin Islands
UG|256|Uganda
UA|380|Ukraine
AE|971|United Arab Emirates
GB|44|United Kingdom
US|1|United States
UM|1|U.S. Minor Outlying Islands
UY|598|Uruguay
UZ|998|Uzbekistan
VU|678|Vanuatu
VA|39|Vatican City
VE|58|Venezuela
VN|84|Vietnam
WF|681|Wallis and Futuna
EH|212|Western Sahara
YE|967|Yemen
ZM|260|Zambia
ZW|263|Zimbabwe
`.trim();

const countries = countryRows.split(/\r?\n/).map((row) => {
  const [iso, dial, name] = row.split("|");
  return { iso, dial, name };
}).sort((first, second) => first.name.localeCompare(second.name));

function CountryFlag({ iso }: { iso: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span aria-hidden="true" className="flex h-[14px] w-5 shrink-0 items-center justify-center rounded-[2px] bg-black/[0.06] font-inter text-[7px] font-bold leading-none text-black/55">
        {iso}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      alt=""
      aria-hidden="true"
      width="20"
      height="14"
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-[14px] w-5 shrink-0 rounded-[2px] object-cover"
    />
  );
}

const fieldClassName =
  "h-10 w-full rounded-md border border-black/[0.08] bg-white px-3 font-inter text-xs font-normal normal-case tracking-normal text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/40";

function CountryPhoneField() {
  const [country, setCountry] = useState(countries.find((item) => item.iso === "DZ") ?? countries[0]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const filteredCountries = countries.filter((item) =>
    `${item.name} ${item.iso} +${item.dial}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="block font-inter text-[9px] font-semibold uppercase tracking-[0.08em]">
      Phone number <span className="text-black/40">(optional)</span>
      <div className="mt-1.5 flex h-10 w-full rounded-md border border-black/[0.08] bg-white transition-colors focus-within:border-black/40">
        <div ref={wrapperRef} className="relative shrink-0">
          <button
            type="button"
            aria-label={`Choose phone country, currently ${country.name} +${country.dial}`}
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((current) => !current)}
            className="flex h-full min-w-[98px] items-center gap-1.5 rounded-l-md border-r border-black/[0.08] px-2.5 font-inter text-xs font-medium normal-case tracking-normal text-black outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#455CE9]"
          >
            <CountryFlag key={country.iso} iso={country.iso} />
            <span>+{country.dial}</span>
            <ChevronDown aria-hidden="true" className={`ml-auto size-3 text-black/50 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="absolute left-0 top-[calc(100%+7px)] z-50 w-[min(310px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-black/10 bg-white text-black shadow-[0_18px_55px_rgba(0,0,0,.14)]">
              <div className="border-b border-black/[0.07] p-2.5">
                <div className="flex h-9 items-center gap-2 rounded-md border border-black/10 px-2.5 focus-within:border-black/40">
                  <Search aria-hidden="true" className="size-3.5 shrink-0 text-black/40" />
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search country or code"
                    aria-label="Search countries and calling codes"
                    className="min-w-0 flex-1 bg-transparent font-inter text-xs font-normal normal-case tracking-normal outline-none placeholder:text-black/40"
                  />
                </div>
              </div>
              <div
                role="listbox"
                aria-label="Country calling codes"
                data-lenis-prevent
                className="max-h-[min(60vh,420px)] touch-pan-y overflow-y-auto overscroll-contain p-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20"
              >
                {filteredCountries.length ? filteredCountries.map((item) => (
                  <button
                    key={item.iso}
                    type="button"
                    role="option"
                    aria-selected={country.iso === item.iso}
                    onClick={() => {
                      setCountry(item);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left font-inter text-xs font-normal normal-case tracking-normal transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none"
                  >
                    <CountryFlag iso={item.iso} />
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    <span className="text-black/45">+{item.dial}</span>
                    {country.iso === item.iso && <Check aria-hidden="true" className="size-3.5 text-[#455CE9]" />}
                  </button>
                )) : (
                  <p className="px-3 py-5 text-center font-inter text-xs font-normal normal-case tracking-normal text-black/50">No countries found</p>
                )}
              </div>
            </div>
          )}
        </div>
        <input type="hidden" name="countryName" value={country.name} />
        <input type="hidden" name="countryDialCode" value={`+${country.dial}`} />
        <input
          autoComplete="tel-national"
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          className="h-full min-w-0 flex-1 rounded-r-md bg-transparent px-2.5 font-inter text-xs font-normal normal-case tracking-normal text-black outline-none placeholder:text-black/35 sm:px-3"
        />
      </div>
    </div>
  );
}

function ChoiceField({
  label,
  name,
  placeholder,
  options,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <label className="block font-inter text-[9px] font-semibold uppercase tracking-[0.08em]">
      {label}{required && <span aria-hidden="true" className="ml-1 text-[#455CE9]">*</span>}
      <div ref={wrapperRef} className="relative mt-1.5">
        <input type="hidden" name={name} value={value} />
        <button
          id={`${name}-choice`}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-required={required}
          aria-invalid={invalid}
          onClick={() => setOpen((current) => !current)}
          className={`${fieldClassName} flex items-center justify-between text-left aria-[invalid=true]:border-red-500 ${value ? "" : "text-black/40"}`}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown aria-hidden="true" className={`ml-2 size-3.5 shrink-0 text-black/45 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div role="listbox" aria-label={label} className="absolute left-0 top-[calc(100%+6px)] z-40 max-h-56 w-full overflow-y-auto rounded-lg border border-black/10 bg-white p-1.5 text-black shadow-[0_18px_55px_rgba(0,0,0,.14)]">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  setValue(option);
                  setInvalid(false);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2.5 py-2.5 text-left font-inter text-xs font-normal normal-case tracking-normal transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus-visible:outline-none"
              >
                <span>{option}</span>
                {value === option && <Check aria-hidden="true" className="size-3.5 text-[#455CE9]" />}
              </button>
            ))}
            {!required && (
              <button
                type="button"
                role="option"
                aria-selected={!value}
                onClick={() => {
                  setValue("");
                  setOpen(false);
                }}
                className="mt-1 w-full border-t border-black/[0.07] px-2.5 py-2.5 text-left font-inter text-[10px] font-medium uppercase tracking-[0.08em] text-black/45"
              >
                Clear selection
              </button>
            )}
          </div>
        )}
      </div>
    </label>
  );
}

export function FAQContact() {
  const questionsHeadingRef = useRef<HTMLHeadingElement>(null);
  const submissionLockRef = useRef(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formKey, setFormKey] = useState(0);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLockRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectType = String(formData.get("projectType") ?? "").trim();
    if (!projectType) {
      const choice = form.querySelector<HTMLButtonElement>("#projectType-choice");
      choice?.setAttribute("aria-invalid", "true");
      choice?.focus();
      const error = form.querySelector<HTMLElement>("[data-selection-error]");
      if (error) {
        error.textContent = "Choose a project type to continue.";
        error.classList.remove("hidden");
      }
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phoneInput = String(formData.get("phone") ?? "").trim();
    const countryDialCode = String(formData.get("countryDialCode") ?? "").trim();
    const phone = phoneInput ? `${countryDialCode} ${phoneInput}`.trim() : null;
    const service = String(formData.get("service") ?? "").trim() || null;
    const message = String(formData.get("message") ?? "").trim();
    const nameLength = [...name].length;
    const messageLength = [...message].length;
    const phoneLength = phone ? [...phone].length : 0;
    const validationError = form.querySelector<HTMLElement>("[data-selection-error]");
    const showValidationError = (selector: string, errorMessage: string) => {
      const field = form.querySelector<HTMLElement>(selector);
      field?.setAttribute("aria-invalid", "true");
      field?.focus();
      if (validationError) {
        validationError.textContent = errorMessage;
        validationError.classList.remove("hidden");
      }
      setSubmissionState("idle");
      setSubmissionMessage("");
    };

    if (nameLength < 2 || nameLength > 150) {
      showValidationError('input[name="name"]', "Name must be between 2 and 150 characters.");
      return;
    }
    if (messageLength < 10 || messageLength > 5000) {
      showValidationError('textarea[name="message"]', "Message must be between 10 and 5000 characters.");
      return;
    }
    if (phoneLength > 50) {
      showValidationError('input[name="phone"]', "Phone number must be 50 characters or fewer.");
      return;
    }

    validationError?.classList.add("hidden");
    if (validationError) validationError.textContent = "Choose a project type to continue.";
    for (const selector of ['input[name="name"]', 'input[name="phone"]', 'textarea[name="message"]']) {
      form.querySelector<HTMLElement>(selector)?.removeAttribute("aria-invalid");
    }

    submissionLockRef.current = true;
    setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      await createContactMessage({
        name,
        email,
        phone,
        project_type: projectType,
        service,
        message,
      });
      setSubmissionState("success");
      setSubmissionMessage("Thanks for reaching out. We'll be in touch soon.");
      setFormKey((key) => key + 1);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(
        error instanceof ApiError && error.status === 429
          ? "Too many requests. Please wait a minute and try again."
          : "We couldn't send your inquiry. Please try again.",
      );
    } finally {
      submissionLockRef.current = false;
    }
  };

  useEffect(() => {
    const heading = questionsHeadingRef.current;
    if (!heading) return;

    const context = gsap.context(() => {
      gsap.to(heading, {
        color: "#000000",
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      });
    }, heading);

    return () => context.revert();
  }, []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-6 border-t border-black/10 bg-white px-4 py-10 text-black sm:px-8 sm:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1350px]">
        <div data-reveal className="mx-auto mb-12 flex w-full max-w-[760px] flex-col items-center gap-4 pb-8 text-center text-black sm:mb-14 sm:gap-5 sm:pb-10">
          <p className="font-sora text-[15px] font-medium capitalize tracking-[0.08em] text-black/70 sm:text-[16px] md:text-[18px]">
            FAQ &amp; Contact /
          </p>
          <h2
            ref={questionsHeadingRef}
            id="contact-heading"
            className="font-sora text-[clamp(1.9rem,5.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#6b7280] md:text-[clamp(2.3rem,3vw,3.2rem)] lg:text-[48px]"
          >
            Questions &amp; projects<span className="text-[#A3E635]">.</span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">01 / Frequently asked</p>
            <p className="mb-6 max-w-[490px] font-inter text-xs leading-[1.7] text-black/60 sm:mb-8 sm:text-sm">
              Find answers to common questions about working with DotCode and
              building your next digital product.
            </p>
            <div className="overflow-hidden rounded-md bg-[#f5f5f5] px-3 sm:px-4">
              {questions.map(({ question, answer }, index) => (
                <details
                  key={question}
                  open={index === 0 ? true : undefined}
                  className="group border-b border-black/[0.07] last:border-0"
                >
                  <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-inter text-[11px] font-semibold leading-snug marker:hidden [&::-webkit-details-marker]:hidden sm:min-h-[54px] sm:text-xs">
                    <span>{question}</span>
                    <span className="flex size-[19px] shrink-0 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors group-open:border-black group-open:bg-black group-open:text-white">
                      <ChevronDown
                        aria-hidden="true"
                        className="size-3 transition-transform duration-200 group-open:rotate-180"
                      />
                    </span>
                  </summary>
                  <p className="max-w-[560px] pb-4 pr-8 font-inter text-[10px] leading-[1.7] text-black/70 sm:text-[11px]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-sora text-sm font-medium tracking-[0.08em] text-black/45">02 / Tell us about your project</p>
            <p className="mb-6 max-w-[500px] font-inter text-xs leading-[1.7] text-black/60 sm:mb-7 sm:text-sm">
              Tell us a little about your project. We&rsquo;ll get back to you to
              discuss how we can help.
            </p>
            <form
              key={formKey}
              onSubmit={handleContactSubmit}
              className="space-y-3.5"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block font-inter text-[9px] font-semibold uppercase tracking-[0.08em]">
                  Your name
                  <input
                    autoComplete="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-1.5 h-10 w-full rounded-md border border-black/[0.08] bg-white px-3 font-inter text-xs font-normal normal-case tracking-normal text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/40"
                  />
                </label>
                <CountryPhoneField />
              </div>
              <label className="block font-inter text-[9px] font-semibold uppercase tracking-[0.08em]">
                Email address
                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1.5 h-10 w-full rounded-md border border-black/[0.08] bg-white px-3 font-inter text-xs font-normal normal-case tracking-normal text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/40"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceField
                  label="Project type"
                  name="projectType"
                  placeholder="Choose a project type"
                  required
                  options={["New digital product", "Website or web app", "Mobile app", "AI or automation", "Custom software", "Other"]}
                />
                <ChoiceField
                  label="Service of interest"
                  name="service"
                  placeholder="Choose a service"
                  options={["Product design", "Web development", "Mobile development", "AI solutions", "Custom software", "Digital strategy"]}
                />
              </div>
              <p data-selection-error role="alert" className="hidden -mt-1 font-inter text-[10px] font-medium normal-case tracking-normal text-red-600">Choose a project type to continue.</p>
              <label className="block font-inter text-[9px] font-semibold uppercase tracking-[0.08em]">
                Tell us about your project
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="What would you like to build?"
                  className="mt-1.5 min-h-[82px] w-full resize-y rounded-md border border-black/[0.08] bg-white px-3 py-2.5 font-inter text-xs font-normal normal-case leading-relaxed tracking-normal text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/40"
                />
              </label>
              <button
                type="submit"
                disabled={submissionState === "submitting"}
                className="flex min-h-11 w-full items-center justify-center rounded-full bg-black px-5 font-inter text-[9px]! font-extrabold! uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#455CE9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-black sm:text-[10px]! md:text-[11px]!"
              >
                {submissionState === "submitting" ? "Sending..." : "Send a project inquiry"}
              </button>
            </form>
            <p
              role={submissionState === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-3 min-h-8 px-1 font-inter text-[9px] leading-relaxed ${submissionState === "error" ? "text-red-600" : submissionState === "success" ? "text-black/65" : "text-black/40"}`}
            >
              {submissionMessage || "We usually reply within one business day."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
