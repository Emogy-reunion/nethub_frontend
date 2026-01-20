"use client";

import React from "react";
import styles from "@/styles/about/ValuesSection.module.css";
import { CheckCircle, Headphones, MapPin } from "lucide-react";

const values = [
	{ 
    		title: "Quality stock", 
    		desc: "We test and verify hardware before it reaches you.",
    		icon: CheckCircle
  	},
  	{ 
    		title: "Practical support", 
    		desc: "We help pick and configure the right devices for your needs.",
    		icon: Headphones
  	},
  	{ 
    		title: "Local presence", 
    		desc: "Based in Nairobi — fast dispatch across Kenya.",
    		icon: MapPin
  	}
];

const ValuesSection = () => {
	return (
    		<section className={styles.values}>
      			<div className={styles.container}>
        			<h2 className={styles.title}>Why customers choose us</h2>
        			<ul className={styles.valuesList}>
          				{values.map((value, idx) => {
           					const Icon = value.icon;
            					return (
              						<li key={idx}>
                						<Icon className={styles.icon} />
                						<strong>{value.title}</strong>
                						<p>{value.desc}</p>
              						</li>
            					);
          				})}
        			</ul>
      			</div>
    		</section>
  	);
};

export default ValuesSection;
