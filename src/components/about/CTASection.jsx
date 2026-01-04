"use client";

import React from "react";
import styles from "@/styles/about/CTASection.module.css";
import Link from "next/link";

const CTASection = () => {
	return (
    		<section className={styles.ctaStrip}>
      			<div className={styles.container}>
        			<div className={styles.ctaInner}>
          				<div>
            					<h3>Need help choosing the right equipment?</h3>
            					<p>We’ll guide you with honest, practical recommendations.</p>
          				</div>
          				<Link href="#" className={styles.primary}>Request a quote</Link>
        			</div>
      			</div>
    		</section>
  	);
};

export default CTASection;

