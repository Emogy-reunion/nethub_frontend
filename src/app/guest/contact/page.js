"use client";

import { MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";
import styles from "@/styles/contact.module.css";

export default function ContactPage() {
    const whatsappNumber = "254790844766";
    const message = "Hello Nethub, I have an inquiry regarding networking products.";

    const openWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Get in Touch</h1>
                    <p>Have a technical question or need a quote? Our experts are ready to help.</p>
                </header>

                <div className={styles.content}>
                    {/* Visual Card Section */}
                    <div className={styles.contactCard}>
                        <div className={styles.iconCircle}>
                            <MessageCircle size={40} color="#800080" />
                        </div>
                        <h2>Chat with Us</h2>
                        <p>For the fastest response, reach out via our official WhatsApp business line.</p>
                        
                        <button onClick={openWhatsApp} className={styles.whatsappBtn}>
                            <MessageCircle size={20} />
                            Message on WhatsApp
                        </button>
                    </div>

                    {/* Info Grid */}
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <Clock size={24} className={styles.infoIcon} />
                            <div>
                                <h3>Business Hours</h3>
                                <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <MapPin size={24} className={styles.infoIcon} />
                            <div>
                                <h3>Location</h3>
                                <p>Nairobi, Kenya</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <ShieldCheck size={24} className={styles.infoIcon} />
                            <div>
                                <h3>Response Time</h3>
                                <p>Typically under 10 minutes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
