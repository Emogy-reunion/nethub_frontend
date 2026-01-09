"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Edit, DollarSign } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/products/networkComponent.module.css";
import AdminNavBar from '@/components/AdminNavbar';
import AdminFooter from "@/components/AdminFooter";

export default function AccessoryComponent({ data }) {
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

                const handleDelete = async (productId) => {
                        if (!confirm("Are you sure you want to delete this product?")) return;

                        try {
                                const res = await fetch(`/api/delete_product/${productId}`, { method: "DELETE" });
                                if (!res.ok) throw new Error("Failed to delete");
      
                                setProducts(products.filter((p) => p.id !== productId));
                                alert("Product deleted!");
                        } catch (err) {
                                alert("Delete failed. Try again.");
                        }
                };

                return (
                        <>
                        <AdminNavBar />
                        <div className={styles.container}>

                                <h1 className={styles.header}>Computer Accessories</h1>
                                <div className={styles.grid}>
                                        {products.length === 0 ? (
                                                <p>No products available</p>
                                        ) : (
                                                products.map((product) => (
                                                        <div key={product.product_id} className={styles.card}>
                                                                <div className={styles.cardImage}>
                                                                        <Link href={`/admin/products/network/details/${product.product_id}`} className={styles.imageLink}>
                                                                                <Image
                                                                                        src={product.image ? `/api/send_image/${product.image}` : "/placeholder.webp"}
                                                                                        alt={product.name}
                                                                                        width={400}
                                                                                        height={180}
                                                                                        className={styles.image}
                                                                                        style={{ objectFit: "cover" }}
                                                                                />
                                                                                <span className={styles.viewDetails}>View Details</span>
                                                                        </Link>

                                                                        {product.discount > 0 && (
                                                                                <span className={styles.discountBadge}>{product.discount}% OFF</span>
                                                                        )}

                                                                        {product.stock === 0 && (
                                                                                <span className={styles.outOfStockBadge}>Out of Stock</span>
                                                                        )}
                                                                </div>

                                                                {/* Card body */}
                                                                <div className={styles.cardBody}>
                                                                        <Link href={`/admin/products/network/details/${product.product_id}`} className={styles.cardTitle}>
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



                                                                <div className={styles.actions}>
                                                                        <MoreVertical className={styles.icon} />
                                                                        <div className={styles.dropdown}>
                                                                                <button onClick={() => handleDelete(product.product_id)} className={styles.dropdownItem}>
                                                                                        <Trash2 className={styles.dropdownIcon} /> Delete
                                                                                </button>
                  
                                                                                <button className={styles.dropdownItem}>
                                                                                        <Edit className={styles.dropdownIcon} /> Update
                                                                                </button>
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
                <AdminFooter />
                </>
        );
}
