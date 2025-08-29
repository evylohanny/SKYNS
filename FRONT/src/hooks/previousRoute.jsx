import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousRoute() {
  const location = useLocation();
  const prevLocation = useRef(null);

  useEffect(() => {
    prevLocation.current = location.pathname; // salva só o pathname anterior
  }, [location]);

  return prevLocation.current;
}