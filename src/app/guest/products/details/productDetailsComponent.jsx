'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { DollarSign, Package, MessageCircle } from "lucide-react";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";
import styles from "@/styles/products/networkDetail.module.css";

export default function ProductDetailsComponent({ product }) {
    const hasDiscount = product.discount && product.discount > 0;

    return (
        <>
            <NavBar />

            <div className={styles.container}>
                <h1 className={styles.productTitle}>{product.name}</h1>

                {product.images?.length > 0 ? (
                    <Swiper
			modules={[Navigation, Pagination, Autoplay]}
			navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={product.images?.length > 1}
                        spaceBetween={10}
                        slidesPerView={3}
                        breakpoints={{
                            1024: { 
				    slidesPerView: 3,
				    navigation: {
            				enabled: true,
        		             },
			    },
            		    768: {
				    slidesPerView: 2,
				    navigation: {
                                        enabled: true,
                                     },
			    },
                            0: {
				    slidesPerView: 1,
				    navigation: {
                                        enabled: false,
                                     },
			    }, 
                        }}
                        className={styles.sliderWrap}
                    >
                        {product.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img ? `/api/send_image/${img}` : "/placeholder.webp"}
                                        alt={`${product.name} image ${idx + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        unoptimized
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.noImages}>No images available</div>
                )}

                <div className={styles.details}>
                    <div className={styles.priceWrapper}>
                        {hasDiscount && <span className={styles.discountBadge}>{product.discount}% OFF</span>}
                        <p className={styles.price}>
                            {hasDiscount ? (
                                <>
                                    <span className={styles.originalPrice}>
                                        <span className={styles.iconWrapper}><DollarSign size={16} /></span>
                                        {product.price}
                                    </span>
                                    <span className={styles.finalPrice}>
                                        <span className={styles.iconWrapper}><DollarSign size={16} /></span>
                                        {product.final_price}
                                    </span>
                                </>
                            ) : (
                                <span className={styles.finalPrice}>
                                    <span className={styles.iconWrapper}><DollarSign size={16} /></span>
                                    {product.price}
                                </span>
                            )}
                        </p>
                    </div>

                    <p className={styles.detailItem}>
                        <Package size={16} /> Description: {product.description}
                    </p>

                    {product.features?.length > 0 && (
                        <div className={styles.features}>
                            <h3>Key Features</h3>
                            <ul>
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

	    		<div className={styles.ctaWrapper}>
                        <button
                            className={styles.whatsappBtn}
                            onClick={() => {
                                const message = `Hello Nethub %0A%0AI would like to order:%0A ${product.name}%0A Price: KES ${product.final_price || product.price}`;
                                window.open(`https://wa.me/254790844766?text=${message}`, "_blank");
                            }}
                        >
                            <MessageCircle size={18} />
                            <span>Order on WhatsApp</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

