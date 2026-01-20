'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Package, DollarSign } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from "@/styles/products/networkDetail.module.css";
import AdminNavBar from '@/components/AdminNavbar';
import AdminFooter from "@/components/AdminFooter";

export default function NetworkDetailsComponent({ product }) {
    const hasDiscount = product.discount && product.discount > 0;

    return (
        <>
            <AdminNavBar />
            <div className={styles.container}>
                {/* Product Name */}
                <h1 className={styles.productTitle}>{product.name}</h1>

                {/* Image Slider using Swiper */}
                {product.images?.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={product.images.length > 1}
                        spaceBetween={20}
                        slidesPerView={3}
                        navigation={true}
                        breakpoints={{
         
                            1024: {
                                slidesPerView: 3,
                                navigation: { enabled: true }
                            },
                            
                            768: {
                                slidesPerView: 2,
                                navigation: { enabled: true }
                            },
                           
                            0: {
                                slidesPerView: 1,
                                navigation: { enabled: false }
                            }
                        }}
                        className={styles.sliderWrap}
                    >
                        {product.images.map((img, idx) => (
                            <SwiperSlide key={idx} className={styles.slide}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img ? `/api/send_image/${img}` : "/placeholder.webp"}
                                        alt={`${product.name} image ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ objectFit: "cover" }}
                                        priority={idx === 0} // Optimization: Load the first image faster
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.noImages}>No images available</div>
                )}

                {/* Product Details */}
                <div className={styles.details}>
                    <div className={styles.priceWrapper}>
                        {hasDiscount && (
                            <span className={styles.discountBadge}>
                                {product.discount}% OFF
                            </span>
                        )}
                        <p className={styles.price}>
                            {hasDiscount ? (
                                <>
                                    <span className={styles.originalPrice}>
                                        <span className={styles.iconWrapper}>Ksh. </span>
                                        {product.price}
                                    </span>
                                    <span className={styles.finalPrice}>
                                        <span className={styles.iconWrapper}>Ksh. </span>
                                        {product.final_price}
                                    </span>
                                </>
                            ) : (
                                <span className={styles.finalPrice}>
                                    <span className={styles.iconWrapper}>Ksh. </span>
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
                </div>
            </div>
            <AdminFooter />
        </>
    );
}
