"use client";

import { useState, useEffect } from "react";
import { Wizard, createFormHandler, initForms } from "../index";

export default function WizardExample() {
  const [submittedData, setSubmittedData] = useState(null);
  const [currentStepInfo, setCurrentStepInfo] = useState(1);
  const [formData, setFormData] = useState({});
  const [ready, setReady] = useState(false);

  // Initialize forms
  useEffect(() => {
    initForms();
    setReady(true);
  }, []);

  const wizardConfig = {
    title: "Pet Registration Wizard",
    subtitle: "Complete your pet profile in a few simple steps",
    showStepIndicators: true,
    showSaveForLater: true,
    submitButtonText: "Complete Registration",
    submittingText: "Registering...",
    saveForLaterText: "Save and continue later",
    progressBarColor: "#020DF9",
    styles: {
      container: "min-h-screen bg-gradient-to-br from-blue-50 to-white",
      primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
      header: "text-4xl font-bold text-blue-900",
    },
    steps: [
      {
        id: "01",
        name: "Basics",
        fullName: "Pet Basics",
        fields: [
          {
            name: "petType",
            title: "Type of Pet",
            type: "select",
            options: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
            width: 50,
            required: true,
          },
          {
            name: "petName",
            title: "Pet's Name",
            type: "string",
            width: 50,
            required: true,
            placeholder: "e.g., Max, Bella",
          },
          {
            name: "breed",
            title: "Breed",
            type: "string",
            width: 50,
            placeholder: "e.g., Golden Retriever",
          },
          {
            name: "age",
            title: "Age",
            type: "string",
            width: 25,
            placeholder: "e.g., 3 years",
          },
          {
            name: "gender",
            title: "Gender",
            type: "select",
            options: ["Male", "Female", "Unknown"],
            width: 25,
          },
          {
            name: "weight",
            title: "Weight (lbs)",
            type: "number",
            width: 50,
            placeholder: "e.g., 45",
          },
        ],
      },
      {
        id: "02",
        name: "Details",
        fullName: "Physical Details",
        fields: [
          {
            name: "color",
            title: "Color/Markings",
            type: "string",
            width: 100,
            placeholder: "e.g., Brown with white chest",
            required: true,
          },
          {
            name: "hairLength",
            title: "Coat Length",
            type: "select",
            options: ["Hairless", "Short", "Medium", "Long", "Curly"],
            width: 50,
          },
          {
            name: "eyeColor",
            title: "Eye Color",
            type: "string",
            width: 50,
            placeholder: "e.g., Brown",
          },
          {
            name: "distinguishingFeatures",
            title: "Distinguishing Features",
            type: "text",
            width: 100,
            placeholder: "Any unique marks, scars, or features",
          },
        ],
      },
      {
        id: "03",
        name: "Health",
        fullName: "Health Information",
        fields: [
          {
            name: "vaccinated",
            title: "Up-to-date on Vaccinations",
            type: "boolean",
            width: 50,
          },
          {
            name: "microchipped",
            title: "Microchipped",
            type: "boolean",
            width: 50,
          },
          {
            name: "microchipId",
            title: "Microchip ID",
            type: "string",
            width: 100,
            placeholder: "Enter microchip number if available",
          },
          {
            name: "allergies",
            title: "Known Allergies",
            type: "text",
            width: 100,
            placeholder: "e.g., Chicken, grain",
          },
          {
            name: "medications",
            title: "Current Medications",
            type: "text",
            width: 100,
            placeholder: "e.g., Allergy medication twice daily",
          },
          {
            name: "medicalConditions",
            title: "Medical Conditions",
            type: "text",
            width: 100,
            placeholder: "e.g., Arthritis, diabetes",
          },
        ],
      },
      {
        id: "04",
        name: "Owner",
        fullName: "Owner Information",
        fields: [
          {
            name: "ownerName",
            title: "Your Full Name",
            type: "string",
            width: 100,
            required: true,
            placeholder: "John Smith",
          },
          {
            name: "ownerPhone",
            title: "Phone Number",
            type: "tel",
            width: 50,
            required: true,
            placeholder: "(555) 123-4567",
          },
          {
            name: "ownerEmail",
            title: "Email Address",
            type: "email",
            width: 50,
            required: true,
            placeholder: "john@example.com",
          },
          {
            name: "ownerAddress",
            title: "Street Address",
            type: "string",
            width: 100,
            placeholder: "123 Main Street",
          },
          {
            name: "ownerCity",
            title: "City",
            type: "string",
            width: 50,
            placeholder: "San Francisco",
          },
          {
            name: "ownerState",
            title: "State",
            type: "string",
            width: 25,
            placeholder: "CA",
          },
          {
            name: "ownerZip",
            title: "ZIP Code",
            type: "string",
            width: 25,
            placeholder: "94102",
          },
        ],
      },
    ],
    rules: [],
  };

  // Get all fields from all steps for createFormHandler
  const allFields = wizardConfig.steps.flatMap((step) => step.fields);

  // Create the form handler
  const handleChange = createFormHandler({
    fields: allFields,
    setState: setFormData,
  });

  const handleSubmit = async (submittedFormData) => {
    console.log("Form submitted with data:", submittedFormData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(submittedFormData);
  };

  const handleStepChange = (stepNumber) => {
    console.log("Step changed to:", stepNumber);
    setCurrentStepInfo(stepNumber);
  };

  if (!ready) {
    return null;
  }

  // Example Wizard theme (color tokens for future consistency)
  const wizardTheme = {
    background: "#faf5ff", // light purple background
    cardBackground: "#fff",
    headerColor: "#6b21a8", // deep purple
    primaryButtonBg: "#a020f0",
    primaryButtonText: "#fff",
    secondaryButtonBg: "#fff",
    secondaryButtonText: "#a020f0",
    progressBarColor: "#a020f0",
    borderColor: "#e9d5ff",
  };

  // Example Form theme (matches ReturnFieldsV2 defaultTheme structure)
  const formTheme = {
    title: "#6b21a8",
    label: "#7c3aed",
    inputText: "#3b0764",
    inputBackground: "#faf5ff",
    inputBorder: "#a78bfa",
    inputPlaceholder: "#a3a3a3",
    inputFocusBorder: "#a020f0",
    description: "#7c3aed",
    error: "#dc2626",
    requiredAsterisk: "#a020f0",
    ratingActive: "#a020f0",
    ratingInactive: "#e9d5ff",
    ratingHover: "#c084fc",
  };

  return (
    <div>
      <Wizard
        config={wizardConfig}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        onChange={handleChange}
        formData={formData}
        theme={wizardTheme}
        formTheme={formTheme}
      />

      {submittedData && (
        <div className="fixed bottom-4 right-4 max-w-sm rounded-lg bg-green-50 p-4 shadow-lg border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">
            Registration Complete! ✓
          </h3>
          <pre className="bg-white p-3 rounded text-sm overflow-auto max-h-64 text-gray-700">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button
            onClick={() => setSubmittedData(null)}
            className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
