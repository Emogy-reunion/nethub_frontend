"use client";

import { useState } from "react";
import { Image, Package, Tag, DollarSign, Percent } from "lucide-react";
import styles from "@/styles/upload/upload.module.css";
import { useRouter } from 'next/navigation';

export default function UploadProductForm() {
	const [step, setStep] = useState(1);

	const [formData, setFormData] = useState({
		name: "",
		group: "",
    		category: "",
    		price: "",
		discount: "",
    		description: "",
    		features: "",
    		stock: "",
    		images: [],
  	});
  
  	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [categories, setCategories] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
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

		const files = Array.from(e.target.files);

		setFormData(prev => ({
			...prev,
		  	images: [...prev.images, ...files]
	  	}));
  	};


	const handleRemoveImage = (index) => {
		setFormData(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index)
		}));
	};


	const FIELD_STEP_MAP = {
		name: 1,
		group: 1,
  		category: 1,
  		price: 1,
		discount: 1,
  		description: 2,
  		features: 2,
  		stock: 2,
  		images: 3,
	};

	const GROUPS = [
		{
    			value: "networking-equipment",
    			label: "Networking Equipment",
    			subcategories: ["routers", "switches", "access-points", "p+d-cpe", "4g-devices"]
  		},
  		{
    			value: "structured-cabling",
    			label: "Structured Cabling",
    			subcategories: ["cat-6-cables", "data-sockets", "network-cabinets", "pdu", "cable-manager", "patch-panels"]
  		},
  		{
    			value: "audio-visual",
    			label: "Audio and Visual",
    			subcategories: ["hdmi-extender-converters", "hdmi-cables", "optic-and-vga-cables", "android-boxes"]
  		},
  		{
    			value: "fibre-optic",
    			label: "Fibre Optic",
    			subcategories: ["olt", "onu", "fibre-pathcords", "media-converters", "sfp", "odf", "enclosures-fat-boxes", "fiber-cables"]
  		},
  		{
    			value: "accessories-tools",
    			label: "Accessories and Tools",
    			subcategories: []
  		}
	];

	const handleGroupChange = (e) => {
		handleChange(e); // updates formData.group

		const groupObj = GROUPS.find(g => g.value === e.target.value); // find the selected group
		setCategories(groupObj?.subcategories || []);
		setFormData(prev => ({ ...prev, category: "" }));
	};

  	const handleSubmit = async (e) => {

		e.preventDefault();
		setIsSubmitting(true);

		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const payload = new FormData();
		payload.append("name", formData.name);
		payload.append('group', formData.group);
    		payload.append("category", formData.category);
    		payload.append("price", formData.price);
		payload.append("discount", formData.discount);
    		payload.append("description", formData.description);
    		payload.append("features", formData.features);
    		payload.append("stock", formData.stock);

    		formData.images.forEach((img) => payload.append("images", img));

		try { 
			const csrfRes = await fetch('/api/get_csrf_token', { method: 'GET' });
			const { csrf_token } = await csrfRes.json();

			const response = await fetch('/api/upload_product', {
				method: 'POST',
				credentials: 'include',
				headers: {
    					"X-CSRF-TOKEN": csrf_token
				},
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

					 // Determine the earliest step that has an error
  					let targetStep = step; // start with current step
  					Object.keys(data.errors).forEach((field) => {
    						const fieldStep = FIELD_STEP_MAP[field];
    						if (fieldStep && fieldStep < targetStep) {
      							targetStep = fieldStep;
    						}
  					});

					setStep(targetStep);

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
			setIsSubmitting(false);
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
            							name="group"
            							value={formData.group}
            							onChange={handleGroupChange}
            							required
          						>
            							<option value="">Select group</option>
            							{GROUPS.map(g => (
              								<option key={g.value} value={g.value}>{g.label}</option>
            							))}
          						</select>
        					</div>
        					{formErrors.group && <p className={styles['error-message']}>{formErrors.group}</p>}
      					</div>

					<div className={styles.group}>
        					<div className={styles.inputRow}>
         	 					<Tag className={styles.icon} />
          						<select
            							name="category"
            							value={formData.category}
            							onChange={handleChange}
            							disabled={categories.length === 0}
          						>
            							<option value="">Select category</option>
            							{categories.map(c => (
              								<option key={c} value={c}>{c.replace(/-/g, " ").toUpperCase()}</option>
            							))}
          						</select>
        					</div>
        					{formErrors.category && <p className={styles['error-message']}>{formErrors.category}</p>}
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
								min={1}
                                                                max={1000000}
            						/>
          					</div>
						
						{formErrors.price && (
                                                        <p className={styles['error-message']}>{formErrors.price}</p>
                                                )}
					</div>

					<div className={styles.group}>
                                                <div className={styles.inputRow}>
                                                        <Percent className={styles.icon} />
                                                        <input
                                                                name="discount"
                                                                type="number"
                                                                placeholder="Discount"
                                                                value={formData.discount}
                                                                onChange={handleChange}
								min={0}
								max={100}
                                                        />
                                                </div>

                                                {formErrors.discount && (
                                                        <p className={styles['error-message']}>{formErrors.discount}</p>
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
            						placeholder="Enter key features, one per line"
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
							min={0}
							max={1000000}
          					/>

						{formErrors.stock && (
                                                        <p className={styles['error-message']}>{formErrors.stock}</p>
                                                )}
					</div>
        			</div>
      			)}

      			{/* STEP 3 */}
      			{step === 3 && (
				<div>
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

				<div className={styles.previewContainer}>
					{formData.images.map((img, index) => (
    						<div key={index} className={styles.previewWrapper}>
      							<img
        							src={URL.createObjectURL(img)}
        							alt={`preview-${index}`}
        							className={styles.previewImage}
      							/>
      							
							<button
        							type="button"
        							className={styles.removeBtn}
        							onClick={() => handleRemoveImage(index)}
      							>
        							×
      							</button>
    						</div>
 					 ))}
				</div>
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

        			<button type="submit" className={styles.button} disabled={isSubmitting}>
          				{step === 3 ? "Upload Product" : "Next"}
        			</button>
      			</div>
    		</form>
  	);
}

