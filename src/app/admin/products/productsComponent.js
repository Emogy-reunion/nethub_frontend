'use client';

import { useState } from 'react';
import '@/styles/ProductsComponent.css';

export default function ProductsComponent({ productsData }) {
	const [currentPage, setCurrentPage] = useState(productsData.pagination.page);
	const [data, setData] = useState(productsData);
	const [openMenuId, setOpenMenuId] = useState(null);


	const toggleMenu = (id) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};


	const fetchPage = async (page) => {

		if (!page) return;

		try {
			const response = await fetch(`/api/get_product_previews?page=${page}`, {
				cache: 'no-store',
			});


      			if (!response.ok) throw new Error('Failed to fetch page');
      			
			const newData = await response.json();
      			setData(newData);
      			setCurrentPage(newData.pagination.page);
    		} catch (error) {
      			alert('Error loading page');
    		}
  	};


	return (

		<div className="products-container">
			{/* Empty state */}
      			{data.products.length === 0 ? (
        			<div className="empty-state">
          				<p>No products found.</p>
        			</div>
      			) : (


      			{/* Product Grid */}
      			<div className="products-grid">
        			{data.products.map((product) => (
          				<div key={product.product_id} className="product-card">

						 {/* Three dots */}
          					<div className="menu-wrapper">
            						<button
              							className="menu-button"
              							onClick={() => toggleMenu(product.product_id)}
            						>
              							⋮
            						</button>

            						{openMenuId === product.product_id && (
              							<div className="menu-dropdown">
                							<button>
                  								Edit
                							</button>
                							
									<button
                  								className="danger"
                							>
                  								Delete
                							</button>
              							</div>
            						)}
          					</div>

            					{product.image && (
              						<img
                						src={product.image}
                						alt={product.name}
                						className="product-image"
              						/>
            					)}
            					
						<h3 className="product-name">{product.name}</h3>
            					<p className="product-price">
              						Price: ${product.final_price}{' '}
              						{product.discount ? `(Discount: ${product.discount}%)` : ''}
            					</p>
            					<p className="product-stock">Stock: {product.stock}</p>
          				</div>
        			))}
      			</div>

      			{/* Pagination */}
      			<div className="pagination">
        			<button
          				onClick={() => fetchPage(data.pagination.prev)}
          				disabled={!data.pagination.prev}
        			>
          				Prev
        			</button>

        			{Array.from({ length: data.pagination.pages }, (_, i) => (
          				<button
            					key={i + 1}
            					onClick={() => fetchPage(i + 1)}
            					className={currentPage === i + 1 ? 'active' : ''}
          				>
            					{i + 1}
          				</button>
        			))}

        			<button
          				onClick={() => fetchPage(data.pagination.next)}
          				disabled={!data.pagination.next}
        			>
          				Next
        			</button>
      			</div>
    		</div>
  	));
}
