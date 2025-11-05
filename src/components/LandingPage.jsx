import React from "react";
import BrandScroller from "./BrandScroller";
import HeroSection from "./HeroSection";
import EscStackLanding from "../components/EscStackLanding";
import ContactSidebar from "./ContactSidebar";

function LandingPage() {
  return (
    <div>
      <HeroSection />
      <BrandScroller />
      <EscStackLanding />
      {/* <ContactSidebar /> */}
    </div>
  );
}

export default LandingPage;
