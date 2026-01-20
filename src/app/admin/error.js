"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <AlertTriangle size={48} color="#800080" />
        </div>
        
        <h1 style={styles.title}>Something went wrong</h1>
        <p style={styles.message}>
          We encountered an unexpected error. Please try refreshing or return home.
        </p>

        <div style={styles.buttonGroup}>
          <button onClick={() => reset()} style={styles.primaryBtn}>
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link href="/admin/dashboard" style={styles.secondaryBtn}>
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdfdfd",
    padding: "20px",
  },
  card: {
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    padding: "40px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid #f0f0f0",
  },
  iconWrapper: {
    marginBottom: "20px",
    display: "inline-flex",
    padding: "20px",
    borderRadius: "50%",
    backgroundColor: "#f8f0f8",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  message: {
    color: "#666",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    backgroundColor: "#800080",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "opacity 0.2s",
  },
  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    backgroundColor: "#fff",
    color: "#800080",
    border: "1px solid #800080",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
  },
};
