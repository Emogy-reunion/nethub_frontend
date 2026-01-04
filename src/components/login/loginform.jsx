import { useState } from 'react';
import { Mail, Lock } from 'lucide-react'; // Lucide icons
import styles from '@/styles/login/TwoStepLogin.module.css';

export default function TwoStepLogin() {
	const [step, setStep] = useState(1);

	return (
		<div className={styles.container}>
      			<div className={styles.card}>
        			<h2 className={styles.heading}>Welcome to Nethub Electronics</h2>

        			{/* Email Step */}
        			<div className={`${styles.step} ${step === 1 ? styles.active : styles.inactive}`}>
          				<label htmlFor="email" className={styles.label}>
            					<Mail className={styles.icon} /> Email
          				</label>
          				
					<input
            					type="email"
            					id="email"
            					placeholder="Enter your email"
            					className={styles.input}
          				/>
          				
					<button
            					type="button"
            					className={styles.button}
            					onClick={() => setStep(2)}
          				>
            					Next
          				</button>
        			</div>

        			{/* Password Step */}
        			<div className={`${styles.step} ${step === 2 ? styles.active : styles.inactive}`}>
          				<label htmlFor="password" className={styles.label}>
            					<Lock className={styles.icon} /> Password
          				</label>
          				
					<input
            					type="password"
            					id="password"
            					placeholder="Enter your password"
            					className={styles.input}
          				/>
          				
					<div className={styles.buttons}>
            					<button
              						type="button"
              						className={styles.buttonSecondary}
              						onClick={() => setStep(1)}
            					>
              						Back
            					</button>
            					
						<button type="submit" className={styles.button}>
              						Login
            					</button>
          				</div>
        			</div>
      			</div>
    		</div>
	);
}

