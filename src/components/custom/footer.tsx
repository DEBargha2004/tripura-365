import { getCategoryWiseNews } from "@/actions/news";
import { Facebook, Mail, MapPin, ArrowRight } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default async function Footer() {
  const categoryResponse = await getCategoryWiseNews();
  const importantLinks = [
    {
      imageUrl: "https://india.gov.in/image/static/npi_logo_Beta_White.svg",
      webUrl: "https://www.india.gov.in",
      bgColor: "black",
      name: "National Portal of India",
    },
    {
      imageUrl:
        "https://www.tripura.gov.in/sites/default/files/2023-07/logo-ripura_0_0.png",
      webUrl: "https://www.tripura.gov.in",
      name: "Government of Tripura",
    },
    {
      imageUrl:
        "https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg",
      webUrl: "https://www.mygov.in",
      name: "MyGov",
    },
    {
      imageUrl:
        "https://s7ap1.scene7.com/is/content/incredibleindia/incredible-india-logo?qlt=82&ts=1727762218512",
      webUrl: "https://www.incredibleindia.gov.in/en",
      bgColor: "black",
      name: "Incredible India",
    },
    {
      imageUrl:
        "https://ica.tripura.gov.in/sites/default/files/2022-01/ica.png",
      webUrl: "https://ica.tripura.gov.in",
      name: "ICA Tripura",
    },
  ];

  return (
    <footer className="relative bg-black rounded-t-[3rem] md:rounded-t-[5rem] mt-20 overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-blue-600 to-red-600 opacity-30" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
      <div className="absolute top-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand Section (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="inline-block transition-transform hover:scale-105 duration-500">
              <Logo />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium max-w-sm">
              Tripura 365 is a dynamic and trusted Indian news website that
              brings you the latest and most relevant news from the vibrant
              state of Tripura.
            </p>

            {/* Social Links: Premium Glassmorphism */}
            <div className="flex items-center gap-4">
              <Link
                href={"https://www.facebook.com//profile.php?id=61581880808522"}
                target="_blank"
                className="h-12 w-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-500 group"
              >
                <Facebook className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={"https://www.instagram.com/tripura365webmedia/"}
                target="_blank"
                className="h-12 w-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all duration-500 group"
              >
                <FaInstagram className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                href={"https://www.youtube.com/@PriyankuModak/"}
                target="_blank"
                className="h-12 w-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-500 group"
              >
                <FaYoutube className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] mb-10 opacity-60">
              Official Portals
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {importantLinks.map((impLink) => (
                <a
                  key={impLink.webUrl}
                  href={impLink.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 p-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                >
                  <div
                    className="h-12 w-28 shrink-0 flex items-center justify-center rounded-xl p-2 shadow-inner"
                    style={{ backgroundColor: impLink.bgColor ?? "white" }}
                  >
                    <img
                      src={impLink.imageUrl}
                      alt={impLink.name}
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    {impLink.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] mb-10 opacity-60">
              Categories
            </h4>
            <ul className="space-y-4">
              {categoryResponse?.slice(0, 8).map((category, idx) => (
                <li key={category.articles?.[0]?.category?.id ?? idx}>
                  <Link
                    href={`/category/${category?.articles?.[0]?.category?.id}`}
                    className="group flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-all duration-300"
                  >
                    <span>{category.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.25em] mb-10 opacity-60">
              Connect
            </h4>
            <div className="space-y-8">
              <div className="group">
                <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">
                  Enquiries
                </span>
                <div className="flex flex-col gap-1">
                  <Link
                    href={"mailto:tripura365.agt@gmail.com"}
                    className="text-white font-black text-sm hover:text-blue-400 transition-colors tracking-tight"
                  >
                    tripura365.agt@gmail.com
                  </Link>
                </div>
              </div>

              <div className="group">
                <span className="text-green-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/919233749847"
                  className="text-white font-black text-sm hover:text-green-400 transition-colors tracking-tight"
                >
                  +91 92337 49847
                </a>
              </div>

              <div className="group">
                <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2 block">
                  Location
                </span>
                <span className="text-white font-black text-sm tracking-tight block">
                  Agartala, Tripura West
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Ultra Clean */}
        <div className="border-t border-white/5 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              &copy; {new Date().getFullYear()} Tripura 365 Editorial
            </p>
            <p className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">
              Digital Excellence in Journalism
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy", "Terms", "Media Kit"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
