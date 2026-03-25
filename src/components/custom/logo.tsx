import Image, { ImageProps } from "next/image";
import logo from "@/../public/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className, ...props }: Partial<ImageProps>) {
  return (
    <div className="relative size-20">
      <img
        {...props}
        src={logo.src}
        alt="tripura-365-logo"
        className={cn(
          "h-16 object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500",
          className,
        )}
      />
      <div className="size-20 rounded-full bg-white absolute bottom-0 left-1/2 -translate-x-1/2" />
    </div>
  );
}
