"use client";

import { useState } from "react";
import { Image, Package, Tag, DollarSign } from "lucide-react";
import styles from "@/styles/upload/upload.module.css";
import { useRouter } from 'next/navigation';

export default function UploadProductForm() {
	const [step, setStep] = useState(1);

	const [formData, setFormData] = useState({
		name: "",
    		category: "",
    		price: "",
    		description: "",
    		features: "",
    		stock: "",
    		images: [],
  	});
  
  	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const router = useRouter();

  	const  handleNext = (e) => {
    		e.preventDefault();
    		setStep((prev) => prev + 1);
  	};

  	const handleBack = () => {
    		setStep((prev) => prev - 1);
  	};

  	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData(prev => ({...prev, [name]: value}));
  	};
  
  	const handleImageChange = (e) => {
		if (!e.target.files) return;

		setFormData(prev => ({
			...prev,
		  	images: Array.from(e.target.files)
	  	}));
  	};

  	const handleSubmit = async (e) => {

		e.preventDefault();

		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const payload = new FormData;
		payload.append("name", formData.name);
    		payload.append("category", formData.category);
    		payload.append("price", formData.price);
    		payload.append("description", formData.description);
    		payload.append("features", formData.features);
    		payload.append("stock", formData.stock);

    		formData.images.forEach((img) => payload.append("images", img));

		try { 
			const csrfRes = await fetch('/api/get_csrf_token', { method: 'GET' });
			const { csrf_token } = await csrfRes.json();
			payload.append("csrf_token", csrf_token);

			const response = await fetch('/api/upload_product', {
				method: 'POST',
				credentials: 'include',
				body: payload
			});

			const data = await response.json();

			if (!response.ok) {
				if(data.errors) {
					const formatted_errors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] =  data.errors[key].join(', ');
						return acc;
					}, {});

					setFormErrors(formatted_errors);

					setTimeout(() => {
						setFormErrors({});
					}, 7000);

				} else if (data.error) {
					setGlobalError(data.error);

					setTimeout(() => {
						setGlobalError(null);
					}, 5000);

				} else { 
					setGlobalError('An unexpected error occurred. Please try again.');

					setTimeout(() => {
                                                setGlobalError(null);
                                        }, 5000);
				}
			} else {
				setSuccessMessage(data.success);

				setTimeout(() => {
					setSuccessMessage(null);
					router.push('/admin/dashboard');
				}, 3000);
			}
		} catch {
			alert('Network error. Please try again.');
		}
	};


  	return (
    		<form
      			className={styles.form}
      			onSubmit={step === 3 ? handleSubmit : handleNext}
    		>
      			<h2 className={styles.title}>Upload Product</h2>

			{(globalError || successMessage) && (
				<div className={globalError ? styles['error'] : styles['success-message']}>
					<p>{globalError || successMessage}</p>
				</div>
			)}

      			{/* STEP 1 */}
      			{step === 1 && (
       	 			<div className={styles.inputGroup}>
					<div className={styles.group}>
          					<div className={styles.inputRow}>
            						<Package className={styles.icon} />
            						<input
              							name="name"
              							placeholder="Product name"
              							value={formData.name}
	      							onChange={handleChange}
            						/>
          					</div>
						
						{formErrors.name && (
							<p className={styles['error-message']}>{formErrors.name}</p>
						)}
					</div>
					
					<div className={styles.group}>
	  					<div className={styles.inputRow}>
            						<Tag className={styles.icon} />
            						<select
              							name="category"
              							value={formData.category}
	      							onChange={handleChange}
            						>
              							<option value="">Select category</option>
              							<option value="networking-devices">
                							Networking Devices
              							</option>
              							<option value="computer-accessories">
                							Computer Accessories
              							</option>
            						</select>
          					</div>

						{formErrors.category && (
                                                        <p className={styles['error-message']}>{formErrors.category}</p>
                                                )}
					</div>
					
					<div className={styles.group}>
    		      				<div className={styles.inputRow}>
            						<DollarSign className={styles.icon} />
            						<input
              							name="price"
              							type="number"
              							placeholder="Price"
              							value={formData.price}
	     	 						onChange={handleChange}
            						/>
          					</div>
						
						{formErrors.price && (
                                                        <p className={styles['error-message']}>{formErrors.price}</p>
                                                )}
					</div>
        			</div>
      			)}

      			{/* STEP 2 */}
      			{step === 2 && (
        			<div className={styles.inputGroup}>
					<div className={styles.group}>
          					<textarea
            						name="description"
            						placeholder="Product description"
            						value={formData.description}
	    						onChange={handleChange}
          					/>
						{formErrors.description && (
                                                        <p className={styles['error-message']}>{formErrors.description}</p>
                                                )}
					</div>

					<div className={styles.group}>
          					<textarea
            						name="features"
            						placeholder="Key features (comma separated)"
            						value={formData.features}
	    						onChange={handleChange}
          					/>
						{formErrors.features && (
                                                        <p className={styles['error-message']}>{formErrors.features}</p>
                                                )}
					</div>
					
					<div className={styles.group}>
          					<input
            						name="stock"
            						type="number"
            						placeholder="Stock quantity"
            						value={formData.stock}
	    						onChange={handleChange}
          					/>

						{formErrors.stock && (
                                                        <p className={styles['error-message']}>{formErrors.stock}</p>
                                                )}
					</div>
        			</div>
      			)}

      			{/* STEP 3 */}
      			{step === 3 && (
        			<div className={styles.inputGroup}>
          				<label className={styles.upload}>
            					<Image />
            					<span>Upload Images</span>
            					<input
              						type="file"
              						multiple
              						accept="image/*"
              						hidden
	      						onChange={handleImageChange}
            					/>
          				</label>

          				{formData.images.length > 0 && (
            					<p className={styles.info}>
              						{formData.images.length} image(s) selected
            					</p>
          				)}
        			</div>
      			)}

      			{/* Buttons */}
      			<div className={styles.buttons}>
        			{step > 1 && (
          				<button
            					type="button"
            					onClick={handleBack}
            					className={styles.backButton}
          				>
            					Back
          				</button>
        			)}

        			<button type="submit" className={styles.button}>
          				{step === 3 ? "Upload Product" : "Next"}
        			</button>
      			</div>
    		</form>
  	);
}

