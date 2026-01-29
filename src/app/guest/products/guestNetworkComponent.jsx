"use client";

import { useState, useEffect } from "react";
import { DollarSign, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/products/networkComponent.module.css";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function GuestNetworkComponent({ data, category, group }) {
        const [products, setProducts] = useState(data.products || []);
        const [pagination, setPagination] = useState(data.pagination || {});
        const [loading, setLoading] = useState(false);

	useEffect(() => {
		setProducts(data.products || []);
        	setPagination(data.pagination || {});
    	}, [data]);

        const fetchPage = async (page) => {
                if (!page) return;
    
                setLoading(true);
    
                try {
                        const response = await fetch(
                                `/api/get_product_previews?${category ? `category=${category}&` : ""}${group ? `group=${group}&` : ""}page=${page}`
                        );
      
                        const newData = await response.json();
                        setProducts(newData.products || []);
                        setPagination(newData.pagination || {});
                } catch (err) {
                        alert("Failed to fetch page. Try again.");
                }
    
                        setLoading(false);
                };

               
                return (
                        <>
                        <NavBar />
                        <div className={styles.container}>

                                <div className={styles.grid}>
                                        {products.length === 0 ? (
                                               	<div className={styles.emptyStateContainer}>
            						<div className={styles.emptyStateBox}>
                						<p>No products available</p>
            						</div>
        					</div>
                                        ) : (
                                                products.map((product) => (
                                                        <div key={product.product_id} className={styles.card}>
                                                                <div className={styles.cardImage}>
                                                                        <Link href={`/guest/products/details/${product.product_id}`} className={styles.imageLink}>
										<div className={styles.aspectRatioBox}>
                                                                                	<Image
                                                                                        	src={product.image ? `/api/send_image/${product.image}` : "/placeholder.webp"}
                                                                                        	alt={product.name}
                                                                                        	fill
												sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
												loading="eager"
                                                                                        	className={styles.image}
                                                                                        	style={{ objectFit: "cover" }}
                                                                                	/>
										</div>
                                                                        </Link>

                                                                        {product.discount > 0 && (
                                                                                <span className={styles.discountBadge}>{product.discount}% OFF</span>
                                                                        )}

                                                                </div>

                                                                {/* Card body */}
                                                                <div className={styles.cardBody}>
                                                                        <Link href={`/guest/products/details/${product.product_id}`} className={styles.cardTitle}>
                                                                                {product.name}
                                                                        </Link>

                                                                         <div className={styles.priceRow}>
                                                                                <p className={styles.price}>
                                                                                        Ksh. 
                                                                                        {product.discount > 0 ? (
                                                                                                <>
                                                                                                        <span className={styles.originalPrice}>{product.price}</span>{" "}
                                                                                                        <span className={styles.finalPrice}>{product.final_price}</span>
                                                                                                </>
                                                                                        ) : (
                                                                                                <span className={styles.finalPrice}>{product.price}</span>
                                                                                        )}
                                                                                </p>

                                                                        </div>

                                                                </div>

                                                        </div>
                                                ))
                                        )}
                                </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                                <div className={styles.pagination}>
                                        <button disabled={!pagination.prev} onClick={() => fetchPage(pagination.prev)}>
                                                Prev
                                        </button>
          
                                        <span>
                                                Page {pagination.page} of {pagination.pages}
                                        </span>
          
                                        <button disabled={!pagination.next} onClick={() => fetchPage(pagination.next)}>
                                                Next
                                        </button>
                                </div>
                        )}

                        {loading && <p className={styles.loading}>Loading...</p>}
                </div>
                <Footer />
                </>
        );
}
