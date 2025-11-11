import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
    		default: "Nethub Electronics",
    		template: "%s | Nethub Electronics",
  	},

  	description:
    		"Nethub Electronics — your trusted hub for computers, networking devices, and cutting-edge tech solutions.",
  	keywords: [
    		"Nethub",
    		"Electronics",
    		"Computers",
    		"Networking Devices",
    		"Tech Store",
    		"Routers",
    		"Laptops",
    		"PC Accessories",
  	],

  	openGraph: {
    		title: "Nethub Electronics",
    
		description:
      			"Shop high-quality computers, routers, and networking equipment from trusted brands — Nethub Electronics.",
    		
		url: "https://nethub.com", // replace later with your actual domain
    		siteName: "Nethub Electronics",
    		
		images: [
      			{
        			url: "/og-image.png", // optional image for sharing
        			width: 1200,
        			height: 630,
        			alt: "Nethub Electronics Open Graph Image",
      			},
    		],

    		locale: "en_US",
    		type: "website",
  	},

  	twitter: {
    		card: "summary_large_image",
    		title: "Nethub Electronics",
    		description:
      			"Your one-stop destination for computers, networking devices, and smart tech.",
    		images: ["/og-image.png"],
  	},

  	icons: {
    		icon: "/favicon.ico",
  	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
    		<html lang="en">
      			<body>
        			{children}
      			</body>
    		</html>
  	);
}
