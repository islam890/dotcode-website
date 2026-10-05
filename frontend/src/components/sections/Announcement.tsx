import { images } from "@/data/site";

export function Announcement() {
  return (
    <section
      id="announcement"
      className="bg-white px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5"
    >
      <div className="relative mx-auto aspect-[2.6] w-full max-w-[1530px] sm:aspect-[1.7] md:aspect-[2.4] lg:aspect-[3.7]">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-center bg-no-repeat md:hidden"
          style={{
            backgroundImage: "url('/assets/announcement-phone.png')",
            backgroundSize: "100% 100%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 hidden bg-center bg-no-repeat md:block"
          style={{
            backgroundImage: `url(${images.subtract})`,
            backgroundSize: "100% 100%",
          }}
        />
        <img
          alt="Digital idea illustration"
          className="absolute bottom-0 left-[45%] h-[110%] -translate-x-1/2 object-contain [clip-path:inset(10%_0_0)] sm:left-[30%] sm:h-[100%] sm:[clip-path:inset(7%_0_0)] md:left-[39%] md:h-[100%] md:[clip-path:inset(5%_0_0)]"
          src={images.icon}
        />
        <div className="absolute inset-0 flex h-full flex-col justify-between p-4 sm:p-6 md:p-7 lg:p-8">
          <div
            data-reveal
            data-announcement-copy
            className="flex max-w-[46%] flex-col items-end gap-4 self-end text-right sm:max-w-[40%] sm:gap-5 md:max-w-[37%] md:gap-6"
          >
            <h2 data-announcement-heading className="max-w-[220px] font-sora text-[clamp(1.65rem,4.7vw,2.6rem)] font-semibold capitalize leading-[1] tracking-[-0.06em] text-black sm:max-w-[260px] sm:text-[clamp(1.9rem,4vw,2.75rem)] md:max-w-[320px] md:text-[clamp(2.1rem,3vw,3.05rem)] lg:max-w-[360px] lg:text-[64px]">
              Got A Digital{" "}
              <span className="block">Idea?</span>
            </h2>

            <p data-announcement-description className="max-w-[205px] font-sora text-[0.65rem] font-normal leading-[1.2] text-black/80 sm:max-w-[245px] sm:text-[0.82rem] md:max-w-[310px] md:text-[0.99rem] lg:max-w-[350px] lg:text-[1.5rem]">
              From the first concept to the
              <span className="block">final product, we combine</span>
              <span className="block">
                design, technology and AI
              </span>
              <span className="block">
                to bring it to life.
              </span>
            </p>
          </div>
        </div>
        <a
          href="#contact"
          data-no-page-transition
          className="absolute bottom-[10%] left-[2%] z-10 flex w-fit items-center justify-center whitespace-nowrap rounded-full bg-[#2563eb] px-1.5 py-[3px] font-inter text-[8px]! font-extrabold! uppercase tracking-[0.05em] text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] sm:bottom-[5%] sm:px-3.5 sm:py-2 sm:text-[11px]! md:px-4 md:py-[9px] md:text-[12px]! lg:text-[15px]!"
        >
          START YOUR PROJECT
        </a>
      </div>
    </section>
  );
}
