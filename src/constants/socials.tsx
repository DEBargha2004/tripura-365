import React from "react";
import {
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPrint,
  FaWhatsapp,
} from "react-icons/fa6";
import { Mail, Link2 } from "lucide-react";

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  brandColor: string; // HEX color for custom backgrounds/borders
  hoverColor: string; // Tailwind text hover class
  bgClass: string; // Tailwind background class
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <span className={className}>G</span>
);

export const socialLinks: SocialLink[] = [
  // {
  //   id: "twitter",
  //   name: "X (Twitter)",
  //   href: "#",
  //   icon: FaXTwitter,
  //   brandColor: "#000000",
  //   hoverColor: "hover:text-black",
  //   bgClass: "bg-black",
  // },
  // {
  //   id: "youtube",
  //   name: "YouTube",
  //   href: "#",
  //   icon: FaYoutube,
  //   brandColor: "#FF0000",
  //   hoverColor: "hover:text-[#FF0000]",
  //   bgClass: "bg-[#FF0000]",
  // },
  // {
  //   id: "facebook",
  //   name: "Facebook",
  //   href: "#",
  //   icon: FaFacebookF,
  //   brandColor: "#1877F2",
  //   hoverColor: "hover:text-[#1877F2]",
  //   bgClass: "bg-[#1877F2]",
  // },
  // {
  //   id: "linkedin",
  //   name: "LinkedIn",
  //   href: "#",
  //   icon: FaLinkedinIn,
  //   brandColor: "#0077B5",
  //   hoverColor: "hover:text-[#0077B5]",
  //   bgClass: "bg-[#0077B5]",
  // },
  // {
  //   id: "instagram",
  //   name: "Instagram",
  //   href: "#",
  //   icon: FaInstagram,
  //   brandColor: "#E1306C",
  //   hoverColor: "hover:text-[#E1306C]",
  //   bgClass: "bg-[#E1306C]",
  // },
  // {
  //   id: "whatsapp",
  //   name: "WhatsApp",
  //   href: "#",
  //   icon: FaWhatsapp,
  //   brandColor: "#25D366",
  //   hoverColor: "hover:text-[#25D366]",
  //   bgClass: "bg-[#25D366]",
  // },
  // {
  //   id: "google-news",
  //   name: "Google News",
  //   href: "#",
  //   icon: GoogleIcon,
  //   brandColor: "#4285F4",
  //   hoverColor: "hover:text-[#4285F4]",
  //   bgClass: "bg-[#4285F4]",
  // },
  // {
  //   id: "print",
  //   name: "Print",
  //   href: "#",
  //   icon: FaPrint,
  //   brandColor: "#6B7280",
  //   hoverColor: "hover:text-gray-500",
  //   bgClass: "bg-gray-500",
  // },
  // {
  //   id: "mail",
  //   name: "Mail",
  //   href: "mailto:info@tripuralawtimes.com",
  //   icon: Mail,
  //   brandColor: "#EA4335",
  //   hoverColor: "hover:text-[#EA4335]",
  //   bgClass: "bg-[#EA4335]",
  // },
  // {
  //   id: "link",
  //   name: "Copy Link",
  //   href: "#",
  //   icon: Link2,
  //   brandColor: "#4B5563",
  //   hoverColor: "hover:text-gray-600",
  //   bgClass: "bg-gray-600",
  // },
];
