import React from "react";
import { ShieldCheck, Truck, Headphones, Zap } from "lucide-react";
import styles from "@/styles/WhyChooseUs.module.css";

const WhyChooseUs = () => {
	const items = [
		{
      			id: "v1",
      			Icon: ShieldCheck,
      			title: "Trusted Quality",
      			desc: "We stock reliable, tested networking and computing hardware from reputable brands.",
    		},
   	 
		{
      			id: "v2",
      			Icon: Truck,
      			title: "Fast Delivery",
      			desc: "Quick dispatch and dependable shipping options so you get equipment when you need it.",
    		},

    		{
      			id: "v3",
      			Icon: Headphones,
      			title: "Expert Support",
      			desc: "Pre- and post-sale support from networking specialists to help you choose and install.",
    		},

    		{
      			id: "v4",
      			Icon: Zap,
      			title: "Performance Focused",
      			desc: "Products optimized for speed and uptime — designed for real-world networks and performance.",
    		},
  	];

	return (
		<section className={styles.wrap} aria-labelledby="why-choose-us-heading">
      			<div className={styles.container}>
        			<h2 id="why-choose-us-heading" className={styles.heading}>
          				Why Choose Nethub Electronics
        			</h2>

        			<p className={styles.lead}>
          				Hardware and service you can rely on — whether you're building a home network or deploying an office setup.
        			</p>

        			<ul className={styles.grid} role="list">
          				{items.map(({ id, Icon, title, desc }) => (
            					<li key={id} className={styles.card}>
              						<div className={styles.iconWrap} aria-hidden="true">
                						<Icon size={28} strokeWidth={1.6} />
              						</div>

              						<div className={styles.content}>
                						<h3 className={styles.cardTitle}>{title}</h3>
                						<p className={styles.cardDesc}>{desc}</p>
              						</div>
            					</li>
          				))}
        			</ul>
      			</div>
    		</section>
  	);
};


export default WhyChooseUs;

