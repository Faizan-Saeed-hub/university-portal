import React, { useState } from "react";
import "./FacebookOAuth.css";

export default function FacebookOAuth() {
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => {
      // Redirect back to either /signup or /login depending on where the user came from
      const params = new URLSearchParams(window.location.search);
      const redirectUri = params.get("redirect_uri") || (window.location.origin + "/signup");
      
      // Pass back a simulated access token
      window.location.href = `${redirectUri}#access_token=mock_facebook_oauth_token_faizan_2026`;
    }, 1000);
  };

  const handleCancel = () => {
    const params = new URLSearchParams(window.location.search);
    const redirectUri = params.get("redirect_uri") || (window.location.origin + "/signup");
    window.location.href = redirectUri;
  };

  return (
    <div className="fb-oauth-container">
      <div className="fb-header">
        <div className="fb-logo-container">
          <svg viewBox="0 0 24 24" className="fb-header-logo">
            <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="fb-header-text">facebook</span>
        </div>
      </div>
      
      <div className="fb-body">
        <div className="fb-card">
          <div className="fb-card-header">
            <div className="fb-app-icon">🎓</div>
            <div className="fb-app-title-container">
              <h3>UniAdmit</h3>
              <p>Active now</p>
            </div>
          </div>
          
          <div className="fb-card-content">
            <h2 className="fb-prompt-title">Log in with Facebook</h2>
            <p className="fb-prompt-desc">
              UniAdmit is requesting access to your name, profile picture, and email address.
            </p>
            
            <div className="fb-user-preview">
              <div className="fb-avatar">MF</div>
              <div className="fb-user-details">
                <h4>Muhammad Faizan</h4>
                <p>muhammadfaizan25092003@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="fb-card-actions">
            <button 
              className="fb-btn-cancel" 
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              className="fb-btn-continue" 
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Continue as Muhammad Faizan"}
            </button>
          </div>
          
          <div className="fb-card-footer">
            <p>This does not let the app post to Facebook or access private data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
