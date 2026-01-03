import React from "react";
import NavBar from '@/components/Navbar';
import HeroText from "@/components/heroText";
import ProductSlider from "@/components/heroSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default  function Page () {
	return (
		<main>
			<NavBar />
      			<HeroText />
			<ProductSlider />
			<WhyChooseUs />
			<AboutSection />
			<Footer />
    		</main>
  	);
};
