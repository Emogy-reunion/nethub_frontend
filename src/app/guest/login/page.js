import React from "react";
import TwoStepLogin from "@/components/login/loginform";

import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";

export const metadata = {
  title: "Login — Nethub Electronics",
  description: "Nethub Electronics — reliable networking and computing solutions.",
};

const LoginPage = () => {
        return (
                <main>
                        <NavBar />
                        <TwoStepLogin />
                        <Footer />
                </main>
        );
};


export default LoginPage;
