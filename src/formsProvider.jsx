"use client";

import { useEffect } from "react";
import { initForms } from "./initForms";

export function FormsProvider({ children }) {
  useEffect(() => {
    initNovaForms();
  }, []);

  return children;
}
