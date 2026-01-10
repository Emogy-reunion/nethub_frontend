"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/products/networkComponent.module.css";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function GuestAccessoryComponent({ data }) {
        const [products, setProducts] = useState(data.products || []);
        const [pagination, setPagination] = useState(data.pagination || {});
        const [loading, setLoading] = useState(false);

        const fetchPage = async (page) => {
                if (!page) return;
    
                setLoading(true);
    
                try {
                        const response = await fetch(
                                `/api/get_product_previews?category=${data.products[0]?.category || "computer-accessories"}&page=${page}`
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

                                <h1 className={styles.header}>Computer Accessories</h1>
                                <div className={styles.grid}>
                                        {products.length === 0 ? (
                                                <p>No products available</p>
                                        ) : (
                                                products.map((product) => (
                                                        <div key={product.product_id} className={styles.card}>
                                                                <div className={styles.cardImage}>
                                                                        <Link  href={`/guest/products/details/${product.product_id}`} className={styles.imageLink}>
										<div className={styles.aspectRatioBox}>
                                          	                                      <Image
                                                	                                        src={product.image ? `/api/send_image/${product.image}` : "/placeholder.webp"}
                                                        	                                alt={product.name}
                                                                	                        className={styles.image}
                                                                        	                style={{ objectFit: "cover" }}
                                                                        	        />
										</div>
                                                                        </Link>

                                                                        {product.stock === 0 && (
                                                                                <span className={styles.outOfStockBadge}>Out of Stock</span>
                                                                        )}
                                                                </div>

                                                                {/* Card body */}
                                                                <div className={styles.cardBody}>
                                                                        <Link  href={`/guest/products/details/${product.product_id}`} className={styles.cardTitle}>
                                                                                {product.name}
                                                                        </Link>

                                                                         <div className={styles.priceRow}>
                                                                                <p className={styles.price}>
                                                                                        <DollarSign size={14} />
                                                                                        {product.discount > 0 ? (
                                                                                                <>
                                                                                                        <span className={styles.originalPrice}>{product.price}</span>{" "}
                                                                                                        <span className={styles.finalPrice}>{product.final_price}</span>
                                                                                                </>
                                                                                        ) : (
                                                                                                <span className={styles.finalPrice}>{product.price}</span>
                                                                                        )}
                                                                                </p>

                                                                                {product.discount > 0 && (
                                                                                        <span className={styles.discountRight}>Save {product.discount}%</span>
                                                                                )}
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
