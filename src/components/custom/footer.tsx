import { getCategoryWiseNews } from "@/actions/news";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Logo from "./logo";
import Link from "next/link";

export default async function Footer() {
  const categoryResponse = await getCategoryWiseNews();
  const importantLinks = [
    {
      imageUrl:
        "https://www.india.gov.in/sites/upload_files/npi/files/logo_1.png",
      webUrl: "https://www.india.gov.in",
    },
    {
      imageUrl:
        "https://www.tripura.gov.in/sites/default/files/2023-07/logo-ripura_0_0.png",
      webUrl: "https://www.tripura.gov.in",
    },
    {
      imageUrl:
        "https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.svg",
      webUrl: "https://www.mygov.in",
    },
    {
      imageUrl:
        "https://s7ap1.scene7.com/is/content/incredibleindia/incredible-india-logo?qlt=82&ts=1727762218512",
      webUrl: "https://www.incredibleindia.gov.in/en",
      bgColor: "black",
    },
    {
      imageUrl:
        "https://ica.tripura.gov.in/sites/default/files/2022-01/ica.png",
      webUrl: "https://ica.tripura.gov.in",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <Logo />
            </h3>
            <p className="text-gray-400 mb-4">
              Tripura 365 is a dynamic and trusted Indian news website that
              brings you the latest and most relevant news from the vibrant
              state of Tripura.
            </p>
            <div className="flex space-x-4">
              {/* <Link
                href={"https://www.facebook.com/toplink.toplink.90"}
                target="_blank"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </Link> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((impLink) => (
                <li
                  key={impLink.webUrl}
                  className="rounded-lg p-2"
                  style={{ backgroundColor: impLink.bgColor ?? "white" }}
                >
                  <a
                    href={impLink.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center border border-white rounded transition-colors hover:bg-gray-800"
                    style={{
                      height: "50px",
                      padding: "5px",
                      background: "transparent",
                    }}
                  >
                    <img
                      src={impLink.imageUrl}
                      alt="Important Link"
                      className="h-10 mx-auto"
                      style={{ maxHeight: "40px" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryResponse.data?.map((category) => (
                <li key={category.articles[0].category.id}>
                  <a
                    href={`/category/${category.articles[0].category.id}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">news@Tripura 365.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Tripura 365. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Advertise
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
