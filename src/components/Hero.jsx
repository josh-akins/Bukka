import Container from "./SectionContainer";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative -mt-20 pt-32 md:pt-44 bg-linear-to-b from-emerald-50/60 via-white to-white overflow-hidden">
      <Container className="relative z-10">
        
        {/* Using items-end so the columns align to the bottom of the section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Text Content Column (Left Side) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left pb-16 lg:pb-24 z-20">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 leading-[1.1]">
                Welcome to Bukka
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-normal text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Where authentic tradition meets modern flavor.
                <br className="hidden sm:inline" />
                Discover soulful dishes crafted with passion, fresh ingredients,
                and a touch of home in every single bite.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center text-base font-semibold tracking-wide px-8 py-3.5 rounded-xl bg-[#083324] text-white hover:bg-[#0c4a35] transition-all shadow-md hover:shadow-lg"
              >
                Explore Menu
              </Link>
              <button className="w-full sm:w-auto text-base font-semibold tracking-wide px-8 py-3.5 rounded-xl bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer">
                Book a Table
              </button>
            </div>
          </div>

          {/* Image Column (Right Side - locked directly to the bottom using self-end) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative self-end">
            <div className="relative w-full max-w-sm md:max-w-xl flex justify-end">
              {/* Background glow behind the image */}
              <div className="absolute inset-0 bg-emerald-200/20 rounded-full blur-3xl -z-10 transform scale-90"></div>
              
              <img
                src="./images/hero1.png"
                alt="Delicious Bukka dishes"
                className="w-full h-auto object-contain max-h-[420px] lg:max-h-[500px] drop-shadow-xl translate-y-2"
              />
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
