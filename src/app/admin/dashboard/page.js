import React from "react";
import AdminNavBar from '@/components/AdminNavbar';
import HeroText from "@/components/heroText";
import ProductSlider from "@/components/heroSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutUs";
import AdminFooter from "@/components/AdminFooter";

const AdminDashboard = () => {
        return (
                <main>
                        <AdminNavBar />
                        <HeroText />
                        <ProductSlider />
                        <WhyChooseUs />
                        <AboutSection />
                        <AdminFooter />
                </main>
        );
};

export default AdminDashboard;
