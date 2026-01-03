import React from "react";
import styles from "@/styles/Footer.module.css";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
	return (
    		<footer className={styles.footer}>
      			<div className={styles.container}>

        			{/* Brand + tagline */}
        			<div className={styles.section}>
          				<h3 className={styles.logo}>Nethub Electronics</h3>
	          			<p className={styles.tagline}>
        	    				Reliable tech and networking solutions for homes, offices, and enterprises.
          				</p>
        			</div>

	        		{/* Quick links */}
        			<div className={styles.section}>
          				<h4 className={styles.heading}>Quick Links</h4>
          				<ul className={styles.links}>
            					<li><a href="#">Home</a></li>
            					<li><a href="#">Products</a></li>
	            				<li><a href="#">Networking Devices</a></li>
        	   				<li><a href="#">Computers & Accessories</a></li>
           					<li><a href="#">Support</a></li>
          				</ul>
	        		</div>

        			{/* Contact */}
        			<div className={styles.section}>
          				<h4 className={styles.heading}>Contact</h4>
          				<ul className={styles.contact}>
            					<li><MapPin size={16} /> Nairobi, Kenya</li>
            					<li><Phone size={16} /> +254 700 000000</li>
            					<li><Mail size={16} /> info@nethubelectronics.com</li>
          				</ul>
        			</div>

	        		{/* Socials */}
        			<div className={styles.section}>
          				<h4 className={styles.heading}>Follow Us</h4>
          				<div className={styles.socials}>
            					<a href="#"><Facebook size={18} /></a>
            					<a href="#"><Instagram size={18} /></a>
	            				<a href="#"><Linkedin size={18} /></a>
        	  			</div>
        			</div>
      			</div>

	      		{/* Bottom bar */}
      			<div className={styles.bottom}>
        			<p>© {new Date().getFullYear()} Nethub Electronics. All rights reserved.</p>
	      		</div>
    		</footer>
  	);
};

export default Footer;

