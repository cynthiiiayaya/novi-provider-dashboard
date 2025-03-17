import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PatientList } from "./screens/PatientList";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PatientList />
  </StrictMode>,
);
