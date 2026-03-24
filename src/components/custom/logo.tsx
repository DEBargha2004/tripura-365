import Image, { ImageProps } from "next/image";
import logo from "@/../public/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className, ...props }: Partial<ImageProps>) {
  return (
    <div className="relative size-12">
      <img
        {...props}
        src={logo.src}
        alt="tripura-365-logo"
        height={50}
        width={100}
        className={cn(
          "h-16 w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-md group-hover:drop-shadow-xl transition-all duration-500",
          className,
        )}
      />
      <div className="size-12 rounded-full bg-white/50 backdrop-blur-sm absolute bottom-0 left-1/2 -translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
    </div>
  );
}
