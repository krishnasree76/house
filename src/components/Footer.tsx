import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 mt-16">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="House of Nera" className="h-12 mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Premium boutique fashion for the modern woman. Handcrafted with love in Visakhapatnam.
          </p>
          <a
            href="https://www.instagram.com/house_of_nera_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:text-primary transition-colors"
          >
            <Instagram className="h-4 w-4" /> @house_of_nera_
          </a>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 flex-shrink-0" /> 7036504999</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 flex-shrink-0" /> nerathevibe@yahoo.com</span>
            <span className="flex items-start gap-2"><MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> House of Nera, Visakhapatnam</span>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Business Hours</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Mon–Fri: 10 AM – 7 PM</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Saturday: 10 AM – 7 PM</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Sunday: 12 PM – 6 PM</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 mt-10 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} House of Nera. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
