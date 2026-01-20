"use client";

import React from "react";
import Image from "next/image";
import styles from "@/styles/about/HeroAbout.module.css";
import Link from "next/link";

const HeroAbout = () => {
	return (
		<header className={styles.hero}>
      			<div className={styles.aboutContainer}>
        			<div className={styles.text}>
          				<h1>About Nethub Electronics</h1>
          					<p className={styles.lead}>
            						We supply dependable networking and computing hardware for homes,
            						small businesses and enterprises. Practical advice, tested products,
            						and local support.
          					</p>

          					<div className={styles.ctas}>
            						<Link href="#" className={styles.primary}>Contact Us</Link>
            						<Link href="/about/guest/network" className={styles.secondary}>Browse Products</Link>
          					</div>
        			</div>

        			<div className={styles.media}>
          				<Image
            					src="/about/hero-network.jpg"
            					alt="Nethub Electronics - network equipment"
            					fill
            					style={{ objectFit: "cover" }}
            					priority
          				/>
        			</div>
      			</div>
    		</header>
  	);
};

export default HeroAbout;
