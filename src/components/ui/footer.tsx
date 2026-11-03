import Link from "next/link";
import { Leaf, X } from "lucide-react";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Upcoming events", href: "/upcoming-events" },
      { label: "Event details", href: "/upcoming-events" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Create an event", href: "/create-event" },
      { label: "Joined events", href: "/joined-events" },
      { label: "Manage events", href: "/manage-events" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in", href: "/sign-In" },
      { label: "Sign up", href: "/sign-up" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#E4F2E6]">
      <div className="container-custom pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto_auto] md:gap-16 lg:gap-24">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E7D4F]">
                <Leaf className="h-5 w-5 text-white" fill="white" />
              </span>
              <span className="text-2xl font-semibold text-[#1D3B2A]">
                GreenLondon
              </span>
            </Link>
            <p className="mt-4 text-gray-600">
              A greener city starts with us.
            </p>

            {/* Social — the new X logo, not the old Twitter bird */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://x.com"
                aria-label="GreenLondon on X"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1D3B2A] shadow-sm transition-colors hover:bg-[#1D3B2A] hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="GreenLondon on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1D3B2A] shadow-sm transition-colors hover:bg-[#1D3B2A] hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                aria-label="GreenLondon on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1D3B2A] shadow-sm transition-colors hover:bg-[#1D3B2A] hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.heading}>
              <h4 className="font-semibold text-[#1D3B2A]">{column.heading}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 transition-colors hover:text-[#1D3B2A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-12 text-sm text-gray-600">
          © GreenLondon. All illustrations are original artwork.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
