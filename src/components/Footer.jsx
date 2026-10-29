import BrandIcon from "../assets/BrandIcon";
import { siFacebook, siX, siInstagram } from "simple-icons";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#083324] text-gray-300 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <button className="flex items-center w-auto rounded-full">
              <img src="/images/secondarylogo.png" alt="logo" width={45} />
              <h1 className="block text-2xl text-white font-sans font-bold">
                bukka
              </h1>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate destination for authentic flavors, cozy vibes, and
              memorable dining experiences. Good Food, Fast, and Always At
              Bukka.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <BrandIcon icon={siFacebook} size={14} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <BrandIcon icon={siInstagram} size={14} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <BrandIcon icon={siX} size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Book a Table
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chef's Specials
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase">
              Visit Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>12 Flavor Street, Culinary District, City</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>hello@bukkaapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-emerald-950 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Bukka App. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Crafted with care for food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
