'use client';

import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import styles from '@/styles/login/TwoStepLogin.module.css';

export default function LoginForm() {

	const [step, setStep] = useState(1); // Current step
  	const [formData, setFormData] = useState({
    		email: '',
    		password: '',
  	});

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

 	 return (
    		<div className={styles.container}>
      			<form
        			className={styles.form}
        			onSubmit={step === 2 ? handleBack : handleNext}
      			>
        			<h2 className={styles.title}>Welcome to Nethub Electronics</h2>

        			{/* Step 1: Email */}
        			{step === 1 && (
          				<div className={styles.inputGroup}>
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
        			)}

       				{/* Step 2: Password */}
		 		{step === 2 && (
          				<div className={styles.inputGroup}>
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
