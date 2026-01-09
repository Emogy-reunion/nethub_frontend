'use client';

import { DollarSign, Package, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
                        navigation      // ✅ just set props directly
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={3}
                        breakpoints={{
                            1024: { slidesPerView: 3 }, // large devices
            		    768: { slidesPerView: 2 },  // medium devices
                            0: { slidesPerView: 1 }, 
                        }}
                        className={styles.sliderWrap}
                    >
                        {product.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img ? `/api/send_image/${img}` : "/placeholder.webp"}
                                        alt={`${product.name} image ${idx + 1}`}
                                        width={400}
                                        height={250}
                                        style={{ objectFit: "contain" }}
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

