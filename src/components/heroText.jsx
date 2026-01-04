import React from "react";
import styles from '@/styles/HeroText.module.css';


const HeroText = () => {
	return (
		<section className={styles.heroSection}>
			<div className={styles.heroContainer}>
				<h1 className={styles.heroTitle}>Premium tech solutions for every setup</h1>


				<p className={styles.heroSubtitle}>Explore high‑quality computers, networking devices, and accessories curated by Nethub Electronics.</p>

			</div>
		</section>
	);
};

export default HeroText;
