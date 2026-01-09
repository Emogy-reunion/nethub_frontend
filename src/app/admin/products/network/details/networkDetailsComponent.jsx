"use client";

import { ChevronLeft, ChevronRight, DollarSign, Percent, Tag, Package } from "lucide-react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "@/styles/products/networkDetail.module.css";
import AdminNavBar from '@/components/AdminNavbar';
import AdminFooter from "@/components/AdminFooter";

const NextArrow = ({ onClick }) => (
    <button className={`${styles.arrow} ${styles.next}`} onClick={onClick} type="button">
        <ChevronRight size={20} />
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button className={`${styles.arrow} ${styles.prev}`} onClick={onClick} type="button">
        <ChevronLeft size={20} />
    </button>
);

export default function NetworkDetailsComponent({ product }) {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    const hasDiscount = product.discount && product.discount > 0;

    return (
	    <>
	    <AdminNavBar />
        <div className={styles.container}>
            {/* Product Name */}
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Image Slider */}
            {product.images?.length > 0 ? (
                <Slider {...sliderSettings} className={styles.sliderWrap}>
                    {product.images.map((img, idx) => (
                        <div key={idx} className={styles.slide}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={img ? `/api/send_image/${img}` : "/placeholder.webp"}
                                    alt={`${product.name} image ${idx + 1}`}
			    	    width={400}
			    	    height={300}
			    	    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
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

                {/* Features List */}
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

