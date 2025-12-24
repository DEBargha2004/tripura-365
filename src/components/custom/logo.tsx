import Image, { ImageProps } from "next/image";
import logo from "@/../public/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className, ...props }: Partial<ImageProps>) {
  return (
    <Image
      {...props}
      src={logo}
      alt="tripura-365-logo"
      height={50}
      width={100}
      className={cn("h-14 w-auto", className)}
    />
  );
}
