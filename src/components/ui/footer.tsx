import Link from "next/link";
import { Leaf } from "lucide-react";

const footerLinks = [
  {
    heading: "Explore",
    links: ["Discover events", "Our mission", "Environmental impact"],
  },
  {
    heading: "Community",
    links: ["Create an initiative", "Volunteer guide", "Newsletter"],
  },
  {
    heading: "GreenLondon",
    links: ["Contact", "Privacy", "Accessibility"],
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#E4F2E6]">
      <div className="container-custom pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_auto_auto] md:gap-16 lg:gap-24">
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
            <p className="mt-4 text-gray-600">A greener city starts with us.</p>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.heading}>
              <h4 className="font-semibold text-[#1D3B2A]">{column.heading}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-gray-600 transition-colors hover:text-[#1D3B2A]"
                    >
                      {link}
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
