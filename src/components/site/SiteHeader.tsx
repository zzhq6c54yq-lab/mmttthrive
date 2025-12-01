import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import thriveLogoImage from "@/assets/thrivemt-logo.png";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/site/home" className="flex items-center gap-3">
            <img 
              src={thriveLogoImage} 
              alt="ThriveMT" 
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              ThriveMT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/site/therapy" className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium">
              Therapy
            </Link>
            <Link to="/site/coaching" className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium">
              Coaching
            </Link>
            <Link to="/site/pricing" className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium">
              Pricing
            </Link>
            <Link to="/site/about" className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium">
              About
            </Link>
            <Link to="/site/contact" className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                Sign In
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C350] hover:to-[#C9A430] text-black font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
