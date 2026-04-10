import { getCategoryWiseNews } from "@/actions/news";
import { Facebook, Mail, MapPin } from "lucide-react";
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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans relative overflow-hidden">
      {/* Editorial Signal Strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
          {/* Brand Section (4 cols) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="inline-block">
                <Logo />
              </div>
              <p className="text-slate-500 leading-relaxed text-sm max-w-sm font-medium">
                Janamat News is a dynamic and trusted Indian news website that
                brings you the latest and most relevant news from the vibrant
                state of Tripura.
              </p>
            </div>

            <div className="flex items-center gap-5 pt-2">
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com//profile.php?id=61581880808522",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/tripura365webmedia/",
                  color: "hover:bg-pink-600",
                },
                {
                  icon: FaYoutube,
                  href: "https://www.youtube.com/@PriyankuModak/",
                  color: "hover:bg-red-600",
                },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  className={cn(
                    "h-11 w-11 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-500 group",
                    social.color,
                  )}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-6 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">
                Important Portals
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {importantLinks.map((impLink) => (
                <a
                  key={impLink.webUrl}
                  href={impLink.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 transition-all group"
                >
                  <div
                    className="h-10 md:w-32 w-full flex items-center justify-center rounded-none p-2 border border-slate-800 bg-white group-hover:border-red-600 transition-colors"
                    style={{ backgroundColor: impLink.bgColor ?? "white" }}
                  >
                    <img
                      src={impLink.imageUrl}
                      alt={impLink.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-600 group-hover:text-red-500 uppercase tracking-widest transition-colors hidden xl:block">
                    Visit Portal
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Categories (2 cols) - Restructured for Elite Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-6 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">
                Categories
              </h4>
            </div>
            <ul className="space-y-4">
              {categoryResponse?.map((category, idx) => (
                <li key={category.articles?.[0]?.category?.id ?? idx}>
                  <Link
                    href={`/category/${category?.articles?.[0]?.category?.id}`}
                    className="text-[11px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-red-600 transition-all" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-6 bg-red-600 block shadow-[0_0_10px_rgba(237,28,36,0.3)]" />
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">
                Contact Desk
              </h4>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-slate-900 border border-slate-800 text-slate-500 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
                    Official Email
                  </span>
                  <Link
                    href="mailto:contact@example.com"
                    className="hover:text-white transition-colors text-sm font-bold text-slate-300 antialiased"
                  >
                    contact@example.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-slate-900 border border-slate-800 text-slate-500 group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all">
                  <FaWhatsapp className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
                    Emergency Ops
                  </span>
                  <a
                    href="https://wa.me/1234567890"
                    className="hover:text-white transition-colors text-sm font-bold text-slate-300 antialiased"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-3 bg-slate-900 border border-slate-800 text-slate-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
                    HQ Address
                  </span>
                  <span className="text-sm font-bold text-slate-300 antialiased">
                    123 Example Street, Fake City, 12345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility Floor */}
        <div className="border-t border-slate-900 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
              © {new Date().getFullYear()} Janamat Media Group
            </span>
            <span className="w-1 h-1 bg-slate-800 rounded-full hidden md:block" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] hidden md:block italic">
              Elite Editorial Platform
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {["Privacy Policy", "Terms of Service", "Advertising"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  {link}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
