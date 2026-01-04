import React from "react";
import HeroAbout from "@/components/about/heroAbout";
import CTASection from "@/components/about/CTASection";
import ValuesSection from "@/components/about/ValuesSection";

import AdminNavBar from '@/components/AdminNavbar';
import AdminFooter from "@/components/AdminFooter";

export const metadata = {
  title: "About — Nethub Electronics",
  description: "Nethub Electronics — reliable networking and computing solutions.",
};

const AdminAboutPage = () => {
        return (
                <main>
                        <AdminNavBar />
                        <HeroAbout />
                        <ValuesSection />
                        <CTASection />
                        <AdminFooter />
                </main>
        );
};


export default AdminAboutPage;
