import "./globals.css";
import ClientWrapper from '@/context/ClientWrapper';

export const metadata = {
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
        url: "#",
        siteName: "Nethub Electronics",
        images: [
            {
                url: "/og-image.png",
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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="wrapper">
		<ClientWrapper>{children}</ClientWrapper>
	    </body>
        </html>
    );
}
