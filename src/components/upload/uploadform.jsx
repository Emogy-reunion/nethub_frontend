'use client';

import { useState, useEffect, useMemo } from "react";
import { Image, Package, Tag, DollarSign, Percent } from "lucide-react";
import styles from "@/styles/upload/upload.module.css";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormSchema } from "@/utils/uploadSchema.js";


export default function UploadProductForm() {
	const [step, setStep] = useState(1);

	const {
		register,
  		handleSubmit,
  		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm({
  		resolver: zodResolver(UploadFormSchema),
  		mode: "onChange",      // validate as user types
  		reValidateMode: "onChange",
	});
	
	const images = Array.from(watch("images") || []);

        const selectedGroup = watch("group");

  
  	const [formErrors, setFormErrors] = useState({});
	const [globalError, setGlobalError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [categories, setCategories] = useState([]);

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
  

	useEffect(() => {
  		const groupObj = GROUPS.find(g => g.value === selectedGroup);
 		setCategories(groupObj?.subcategories || []);
		setValue("category", "");
	}, [selectedGroup, setValue]);

	const previews = useMemo(() => {
  		return Array.from(images || []).map(img => URL.createObjectURL(img));
	}, [images]);


	const handleRemoveImage = (index) => {
		 URL.revokeObjectURL(images[index]);

                setValue("images", images.filter((_, i) => i !== index), { shouldValidate: true});
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

  	const onSubmit = async (data) => {

		setFormErrors({});
		setGlobalError(null);
		setSuccessMessage(null);

		const payload = new FormData();
		payload.append("name", data.name);
		payload.append('group', data.group);
    		payload.append("category", data.category);
    		payload.append("price", data.price.toString());
		payload.append("discount", data.discount.toString());
    		payload.append("description", data.description);
    		payload.append("features", data.features);
    		payload.append("stock", data.stock.toString());

    		Array.from(data.images || []).forEach((img) => payload.append("images", img));

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
		}
	};


  	return (
    		<form
      			className={styles.form}
      			onSubmit={step === 3 ? handleSubmit(onSubmit) : handleNext}
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
              							placeholder="Product name"
              							{...register("name")}
            						/>
          					</div>
						
						{(errors.name || formErrors.name) && (
							<p className={styles['error-message']}>{errors.name?.message || formErrors.name}</p>
						)}
					</div>
					
					 <div className={styles.group}>
        					<div className={styles.inputRow}>
          						<Tag className={styles.icon} />
         	 					<select
            							{...register("group")}
          						>
            							<option value="">Select group</option>
            							{GROUPS.map(g => (
              								<option key={g.value} value={g.value}>{g.label}</option>
            							))}
          						</select>
        					</div>
        					{(errors.group || formErrors.group) && (
							<p className={styles['error-message']}>{errors.group?.message || formErrors.group}</p>
						)}
      					</div>

					<div className={styles.group}>
        					<div className={styles.inputRow}>
         	 					<Tag className={styles.icon} />
          						<select
            							{...register('category')}
          						>
            							<option value="">Select category</option>
            							{categories.map(c => (
              								<option key={c} value={c}>{c.replace(/-/g, " ").toUpperCase()}</option>
            							))}
          						</select>
        					</div>
        					{(errors.category || formErrors.category) && (
							<p className={styles['error-message']}>{errors.category?.message || formErrors.category}</p>
						)}
      					</div>
					
					<div className={styles.group}>
    		      				<div className={styles.inputRow}>
            						<DollarSign className={styles.icon} />
            						<input
								{...register('price')}
              							type="number"
              							placeholder="Price"
								min={1}
                                                                max={1000000}
            						/>
          					</div>
						
						{(errors.price || formErrors.price) && (
                                                        <p className={styles['error-message']}>{errors.price?.message || formErrors.price}</p>
                                                )}
					</div>

					<div className={styles.group}>
                                                <div className={styles.inputRow}>
                                                        <Percent className={styles.icon} />
                                                        <input
                                                                {...register('discount')}
                                                                type="number"
                                                                placeholder="Discount"
								min={0}
								max={100}
                                                        />
                                                </div>

                                                {(errors.discount || formErrors.discount) && (
                                                        <p className={styles['error-message']}>{errors.discount?.message || formErrors.discount}</p>
                                                )}
                                        </div>
        			</div>
      			)}

      			{/* STEP 2 */}
      			{step === 2 && (
        			<div className={styles.inputGroup}>
					<div className={styles.group}>
          					<textarea
							{...register('description')}
            						placeholder="Product description"
          					/>
						{(errors.description || formErrors.description) && (
                                                        <p className={styles['error-message']}>{errors.description?.message || formErrors.description}</p>
                                                )}
					</div>

					<div className={styles.group}>
          					<textarea
							{...register('features')}
            						placeholder="Enter key features, one per line"
          					/>
						{(errors.features || formErrors.features) && (
                                                        <p className={styles['error-message']}>{errors.features?.message || formErrors.features}</p>
                                                )}
					</div>
					
					<div className={styles.group}>
          					<input
							{...register('stock')}
            						type="number"
            						placeholder="Stock quantity"
							min={0}
							max={1000000}
          					/>

						{(errors.stock || formErrors.stock) && (
                                                        <p className={styles['error-message']}>{errors.stock?.message || formErrors.stock}</p>
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
	      						{...register("images")}
            					/>
          				</label>

          				{watch("images")?.length > 0 && (
    						<p className={styles.info}>
      							{watch("images").length} image(s) selected
    						</p>
  					)}

					{(errors.images || formErrors.images) && (
    						<p className={styles["error-message"]}>
      							{errors.images?.message || formErrors.images}
    						</p>
  					)}
        			</div>

				<div className={styles.previewContainer}>
					{previews.map((url, index) => (
    						<div key={index} className={styles.previewWrapper}>
      							<img
        							src={url}
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

