
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Reset onboarding if the URL has forceReset parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('forceReset') === 'true' || urlParams.get('resetOnboarding') === 'true') {
  console.log("[main] Resetting onboarding state due to URL parameter");
  localStorage.removeItem('hasCompletedOnboarding');
  localStorage.removeItem('prevScreenState');
}

// Clear any potentially problematic localStorage items on fresh load
if (!localStorage.getItem('appInitialized') || window.location.pathname === '/' && urlParams.has('fresh')) {
  console.log("[main] Fresh initialization, clearing potential state conflicts");
  localStorage.setItem('appInitialized', 'true');
  // Only clear these if we're not in the middle of onboarding
  if (!localStorage.getItem('prevScreenState') || localStorage.getItem('prevScreenState') === 'intro') {
    localStorage.removeItem('prevScreenState');
  }
}

// Debug any URL parameters that might be affecting onboarding
if (urlParams.has('forceHideBadge')) {
  console.log("[main] Note: forceHideBadge parameter detected. This does not affect onboarding flow.");
}

// Add a force reset mechanism for when the app gets stuck
if (localStorage.getItem('stuckDetected') === 'true') {
  console.log("[main] Detected previous stuck state, forcing reset");
  localStorage.removeItem('hasCompletedOnboarding');
  localStorage.removeItem('prevScreenState');
  localStorage.removeItem('stuckDetected');
}

// Set a flag to detect if app gets stuck on intro screen
if (localStorage.getItem('prevScreenState') === 'intro' && !localStorage.getItem('introLoaded')) {
  localStorage.setItem('introLoaded', 'true');
} else if (localStorage.getItem('prevScreenState') === 'intro' && localStorage.getItem('introLoaded')) {
  // If we're still on intro screen after a reload, we might be stuck
  localStorage.setItem('stuckDetected', 'true');
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
