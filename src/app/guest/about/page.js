import React from "react";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutUs";
import CTASection from "@/components/about/CTASection";
import ValuesSection from "@/components/about/ValuesSection";

import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Nethub Electronics",
  description: "Nethub Electronics — reliable networking and computing solutions.",
};

const GuestAboutPage = () => {
	return (
		<main>
			<NavBar />
     			<AboutSection />
			<WhyChooseUs />
			<CTASection />
			<Footer />
    		</main>
  	);
};


export default GuestAboutPage;
