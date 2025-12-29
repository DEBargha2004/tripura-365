import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";
import Weather from "./weather";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={"/"}>
            <div className="shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">
                <Logo />
              </h1>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-red-700 galanda-regular sm:pr-0 pr-6">
            ত্রিপুরা ৩৬৫
          </h1>
          <div className="sm:block hidden">
            <Timer />
            <Weather />
          </div>
        </div>
      </div>
    </nav>
  );
}
