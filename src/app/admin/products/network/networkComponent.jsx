"use client";

import { useState } from "react";
import { MoreVertical, Trash2, Edit, DollarSign } from "lucide-react";
import styles from "@/styles/products/networkComponent.module.css";

export default function NetworkComponent({ data }) {
	const [products, setProducts] = useState(data.products || []);
  	const [pagination, setPagination] = useState(data.pagination || {});
  	const [loading, setLoading] = useState(false);

  	const fetchPage = async (page) => {
    		if (!page) return;
    		
		setLoading(true);
    		
		try {
      			const response = await fetch(
        			`/api/get_product_previews?category=${data.products[0]?.category || "networking-devices"}&page=${page}`
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
    			<div className={styles.container}>

				<h1 className={styles.header}>Networking Devices</h1>
      				<div className={styles.grid}>
        				{products.length === 0 ? (
          					<p>No products available</p>
        				) : (
          					products.map((product) => (
            						<div key={product.id} className={styles.card}>
              							<div className={styles.cardImage}>
                							<img src={product.images?.[0] || "/placeholder.webp"} alt={product.name} />
              							</div>
              							
								<div className={styles.cardBody}>
                							<h3 className={styles.cardTitle}>{product.name}</h3>
                							<p className={styles.price}>
                								<DollarSign size={14} /> {product.price}
              								</p>
              							</div>
              						<div className={styles.actions}>
                						<MoreVertical className={styles.icon} />
                						<div className={styles.dropdown}>
                  							<button onClick={() => handleDelete(product.id)} className={styles.dropdownItem}>
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
  	);
}
