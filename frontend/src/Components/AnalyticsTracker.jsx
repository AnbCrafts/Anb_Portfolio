import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackHit = async () => {
      try {
        await axiosInstance.post("/analytics/track", {
          path: location.pathname + location.hash,
          rawReferrer: document.referrer || "",
          userAgent: navigator.userAgent,
        });
      } catch (err) {
        // Silent catch for analytics tracking
      }
    };

    trackHit();
  }, [location.pathname, location.hash]);

  return null;
}
