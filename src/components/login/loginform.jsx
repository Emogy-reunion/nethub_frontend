'use client';

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/login/TwoStepLogin.module.css';

export default function LoginForm() {

	const [step, setStep] = useState(1); // Current step
  	const [formData, setFormData] = useState({
    		email: '',
    		password: '',
  	});
	const [formErrors, setFormErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(null);
	const [globalError, setGlobalError] = useState(null);
	const router = useRouter();

	const FIELD_STEP_MAP = {
		email: 1,
		password: 2,
	};


  	const handleChange = (e) => {
    		setFormData((prev) => ({
      			...prev,
			[e.target.name]: e.target.value,
		}));
  	};

  	const handleNext = (e) => {
		e.preventDefault();
		setStep((prev) => prev + 1);
	};


  	const handleBack = () => {
		setStep((prev) => (prev > 1 ? prev - 1 : prev));
	};

	const handleSubmit = async (e) => {

		e.preventDefault();

		setFormErrors({});
		setSuccessMessage(null);
		setGlobalError(null);

		try {
			const csrfRes = await fetch('/api/get_csrf_token', { method: 'GET' });
			const { csrf_token } = await csrfRes.json();

			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					...formData,
					csrf_token
				})
			});

			const data = await response.json();

			if (!response.ok) {

				if (data.errors) {

					let targetStep = step;

					const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
						acc[key] =  data.errors[key].join(', ');
						return acc;

						const fieldStep = FIELD_STEP_MAP[key];
        					if (fieldStep && fieldStep < targetStep) {
            						targetStep = fieldStep;
        					}
					}, {});

					setFormErrors(formattedErrors);
					setStep(targetStep);

					setTimeout(() => {
						setFormErrors({});
					}, 5000);

				} else if (data.error) {
					setGlobalError(data.error);

					setTimeout(() => {
						setGlobalError(null);
					}, 5000);

				} else {
					setGlobalError('An unexpected error occurred. Please try again.');

					setTimeout(() => {
						setGlobalError(null);
					}, 3000);
				}
			} else {
				setSuccessMessage(data.success);

				setTimeout(() => {
					setSuccessMessage(null);

					router.replace('/admin/dashboard');
				}, 2000);

			}
		} catch(error) { 
			alert('Network error. Please try again.');
		} 
	};



 	 return (
    		<div className={styles.container}>
      			<form
        			className={styles.form}
        			onSubmit={step === 2 ? handleSubmit : handleNext}
      			>
        			<h2 className={styles.title}>Welcome to Nethub Electronics</h2>

		 		{(globalError || successMessage) && (
					<div className={globalError ? styles['error'] : styles['success-message']}>
						<p>{globalError || successMessage}</p>
					</div>
				)}

        			{/* Step 1: Email */}
        			{step === 1 && (
          				<div className={styles.inputGroup}>
						<div className={styles.inputRow}>
            						<Mail className={styles.icon} />
            							<input
              								type="email"
              								name="email"
              								placeholder="Email"
              								value={formData.email}
              								onChange={handleChange}
              								className={styles.input}
            							/>
						</div>

						{formErrors.email && (
							<p className={styles['error-message']}>{formErrors.email}</p>
						)}
          				</div>
        			)}

       				{/* Step 2: Password */}
		 		{step === 2 && (
          				<div className={styles.inputGroup}>
						<div className={styles.inputRow}>
            						<Lock className={styles.icon} />
            						<input
              							type="password"
      						        	name="password"
           							placeholder="Password"
              							value={formData.password}
              							onChange={handleChange}
              							className={styles.input}
            						/>
						</div>
						{formErrors.password && (
							<p className={styles['error-message']}>{formErrors.password}</p>
                                                 )}
          				</div>
        			)}

        			<div className={styles.buttons}>
          				{step > 1 && (
            					<button type="button" className={styles.backButton} onClick={handleBack}>
             						 Back
            					</button>
          				)}

          				<button type="submit" className={styles.button}>
            					{step === 2 ? 'Login' : 'Next'}
          				</button>
        			</div>
      			</form>
    		</div>
  	);
}
