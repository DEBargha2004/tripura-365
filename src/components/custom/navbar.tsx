import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"}>
            <div className="shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">
                <Logo />
              </h1>
            </div>
          </Link>
          <h1 className="text-xl font-bold text-blue-900">ত্রিপুরা ৩৬৫</h1>
          <div className="sm:block hidden">
            <Timer />
          </div>
        </div>
      </div>
    </nav>
  );
}
