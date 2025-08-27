import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousRoute() {
  const location = useLocation();
  const prevLocation = useRef(null);
  const currentLocation = useRef(location.pathname);

  useEffect(() => {
    prevLocation.current = currentLocation.current;
    currentLocation.current = location.pathname;
  }, [location]);

  return prevLocation.current;
};