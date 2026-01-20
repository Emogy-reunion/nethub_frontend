'use client';

export default function Loading() {
  return (
    <div style={loaderStyles.container}>
      <div style={loaderStyles.content}>
        {/* Animated Spinner */}
        <div style={loaderStyles.spinner}></div>
        
        {/* Nethub Brand Text */}
        <h2 style={loaderStyles.text}>NET<span style={loaderStyles.accent}>HUB</span></h2>
        <p style={loaderStyles.subtext}>Securing your connection...</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

const loaderStyles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  content: {
    textAlign: "center",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #800080",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation: "spin 1s linear infinite",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "#333",
    letterSpacing: "2px",
    margin: "0",
  },
  accent: {
    color: "#800080",
  },
  subtext: {
    fontSize: "0.85rem",
    color: "#999",
    marginTop: "8px",
    animation: "pulse 1.5s ease-in-out infinite",
  }
};
