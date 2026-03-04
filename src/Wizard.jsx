"use client";

import { useEffect, useState } from "react";
import { Form } from "./Form";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

const countFilledFields = (fields, formData) => {
  let filled = 0;
  let total = 0;

  fields.forEach((field) => {
    if (field.required) {
      total++;
      if (formData[field?.name] && formData[field?.name] !== "") {
        filled++;
      }
    }
  });

  return { filled, total };
};

export function Wizard({
  config = {},
  onSubmit = () => {},
  onStepChange = () => {},
  onChange = () => {},
  formData = {},
  formTheme = {},
  theme = {},
}) {
  const { steps = [], styles = {}, rules = [] } = config;

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepProgress, setStepProgress] = useState({});

  const handlePrevStep = () => {
    const newStep = Math.max(currentStep - 1, 1);
    setCurrentStep(newStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onStepChange(newStep);
  };

  const handleNextStep = () => {
    const currentFields = steps[currentStep - 1]?.fields || [];
    const requiredFields = currentFields.filter((f) => f.required);
    const missingFields = requiredFields.filter(
      (f) => !formData[f?.name] || formData[f?.name] === "",
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in required fields: ${missingFields.map((f) => f.title).join(", ")}`,
      );
      return;
    }

    const newStep = Math.min(currentStep + 1, steps.length);
    setCurrentStep(newStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onStepChange(newStep);
  };

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting wizard:", error);
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Calculate overall progress
  const totalProgress =
    steps.length > 0
      ? Object.values(stepProgress).reduce((acc, step) => {
          return (
            acc +
            (step.total > 0
              ? (step.filled / step.total) * (100 / steps.length)
              : 0)
          );
        }, 0)
      : 0;

  const currentStepData = steps[currentStep - 1] || {};
  const currentFields = currentStepData.fields || [];

  // Initialize step progress
  useEffect(() => {
    const newProgress = {};
    steps.forEach((_, index) => {
      newProgress[index + 1] = { filled: 0, total: 0 };
    });
    setStepProgress(newProgress);
  }, [steps]);

  // Update progress tracking
  useEffect(() => {
    const newProgress = {};
    steps.forEach((step, index) => {
      const fields = step.fields || [];
      newProgress[index + 1] = countFilledFields(fields, formData);
    });
    setStepProgress(newProgress);
  }, [formData, steps]);

  // Apply default styles
  const defaultStyles = {
    container: "min-h-screen bg-white",
    contentWrapper: "mx-auto max-w-5xl px-6 py-8 sm:py-12 lg:py-16",
    header:
      "font-display text-3xl font-bold tracking-tight sm:mb-2 sm:text-6xl sm:font-light",
    card: "rounded-xl border border-[#F5F5F5] bg-white p-8 shadow-sm sm:p-12",
    button:
      "inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200",
    primaryButton: "bg-[#020DF9] text-white hover:bg-[#0209D9]",
    secondaryButton: "bg-transparent text-[#4A4A4A] hover:bg-[#FAFAFA]",
    disabledButton: "cursor-not-allowed bg-transparent text-[#E8E8E8]",
    ...styles,
  };

  // Apply theme overrides for wizard styling
  const themedStyles = {
    ...defaultStyles,
    ...(theme.container && { container: theme.container }),
    ...(theme.contentWrapper && { contentWrapper: theme.contentWrapper }),
    ...(theme.header && { header: theme.header }),
    ...(theme.card && { card: theme.card }),
    ...(theme.button && { button: theme.button }),
    ...(theme.primaryButton && { primaryButton: theme.primaryButton }),
    ...(theme.secondaryButton && { secondaryButton: theme.secondaryButton }),
    ...(theme.disabledButton && { disabledButton: theme.disabledButton }),
  };

  const progressBarColor =
    theme.progressBarColor || config.progressBarColor || "#020DF9";
  const headerColor = theme.headerColor || "#1A1A1A";
  const subtitleColor = theme.subtitleColor || "#797979";
  const stepTextColor = theme.stepTextColor || "#4A4A4A";
  const progressTextColor = theme.progressTextColor || "#6B6B6B";
  const borderColor = theme.borderColor || "#F5F5F5";
  const progressBarBackgroundColor =
    theme.progressBarBackgroundColor || "#F5F5F5";
  const backgroundColor = theme.background || "#ffffff";
  const cardBackgroundColor = theme.cardBackground || "#fff";
  const primaryButtonBg = theme.primaryButtonBg || "#020DF9";
  const primaryButtonText = theme.primaryButtonText || "#fff";
  const secondaryButtonBg = theme.secondaryButtonBg || "#ffffff";
  const secondaryButtonText = theme.secondaryButtonText || "#4A4A4A";
  const stepIndicatorActiveColor = theme.primaryButtonBg || "#020DF9";
  const stepIndicatorCompletedBg =
    theme.progressBarBackgroundColor || "#F5F5F5";
  const stepIndicatorInactiveBg = "transparent";
  const stepIndicatorInactiveText = theme.progressTextColor || "#9B9B9B";

  return (
    <div className={themedStyles.container} style={{ backgroundColor }}>
      <div className={themedStyles.contentWrapper}>
        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`${themedStyles.header}`}
            style={{ color: headerColor }}
          >
            {config.title || "Multi-step Wizard"}
          </h1>
          {config.subtitle && (
            <p
              className="text-base font-light sm:mb-7"
              style={{ color: subtitleColor }}
            >
              {config.subtitle}
            </p>
          )}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-base font-medium"
              style={{ color: stepTextColor }}
            >
              Step {currentStep} of {steps.length}:{" "}
              {currentStepData?.fullName ||
                currentStepData?.name ||
                `Step ${currentStep}`}
            </p>
            <p className="mt-1 text-sm" style={{ color: progressTextColor }}>
              {Math.round(totalProgress)}% Complete
            </p>
          </div>
        </div>

        {/* Unified Progress Bar */}
        <div className="mb-6">
          <div
            className="h-1 overflow-hidden rounded-full"
            style={{
              backgroundColor: progressBarBackgroundColor,
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${totalProgress}%`,
                backgroundColor: progressBarColor,
              }}
            />
          </div>
        </div>

        {/* Step Navigation Pills */}
        {config.showStepIndicators !== false && (
          <div className="mb-8">
            <nav aria-label="Progress steps">
              <ol className="flex items-center justify-center space-x-1 sm:space-x-2">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStep - 1;
                  const isCurrent = index === currentStep - 1;
                  const isClickable = index < currentStep;

                  return (
                    <li key={step?.id || index} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => isClickable && setCurrentStep(index + 1)}
                        style={{
                          backgroundColor: isCurrent
                            ? stepIndicatorActiveColor
                            : isCompleted
                              ? stepIndicatorCompletedBg
                              : stepIndicatorInactiveBg,
                          color: isCurrent
                            ? primaryButtonText
                            : isCompleted
                              ? headerColor
                              : stepIndicatorInactiveText,
                        }}
                        className={`flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                          isCompleted && !isCurrent ? "hover:opacity-80" : ""
                        } ${isClickable && !isCurrent ? "cursor-pointer" : ""} ${!isClickable ? "cursor-default" : ""}`}
                        disabled={!isClickable}
                        aria-current={isCurrent ? "step" : undefined}
                      >
                        {isCompleted && (
                          <CheckCircleIconSolid className="mr-1.5 h-3.5 w-3.5" />
                        )}
                        <span className="hidden sm:inline">{step?.name}</span>
                        <span className="sm:hidden">{index + 1}</span>
                      </button>
                      {index < steps.length - 1 && (
                        <div
                          className="mx-1 h-[1px] w-4 sm:w-8"
                          style={{ backgroundColor: borderColor }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        )}

        {/* Form Content - Clean Card Design */}
        <div
          className={themedStyles.card}
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor: borderColor,
          }}
        >
          {/* Form Fields - Using Form component */}
          <Form
            fields={currentFields}
            onChange={onChange}
            formData={formData}
            isMobileView={false}
            rules={rules}
            theme={formTheme}
          />

          {/* Navigation - Refined Buttons */}
          <div className="mt-16 flex items-center justify-between">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              style={{
                backgroundColor:
                  currentStep === 1 ? "#E8E8E8" : secondaryButtonBg,
                color: secondaryButtonText,
              }}
              className={`${themedStyles.button} rounded-lg`}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Previous
            </button>

            {/* Progress Pills - Mobile */}
            <div className="flex space-x-2 md:hidden">
              {steps.map((_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      index + 1 <= currentStep
                        ? progressBarColor
                        : progressBarBackgroundColor,
                  }}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    index + 1 <= currentStep ? "w-6" : "w-2"
                  }`}
                />
              ))}
            </div>

            {/* Next/Submit Button */}
            {currentStep === steps.length ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? "#E8E8E8" : primaryButtonBg,
                  color: primaryButtonText,
                }}
                className={`${themedStyles.button} rounded-lg`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="-ml-1 mr-3 h-4 w-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {config.submittingText || "Saving..."}
                  </>
                ) : (
                  <>
                    {config.submitButtonText || "Complete"}
                    <CheckCircleIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                style={{
                  backgroundColor: primaryButtonBg,
                  color: primaryButtonText,
                }}
                className={`${themedStyles.button} rounded-lg`}
              >
                Continue
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>

          {/* Required Fields Notice */}
          {stepProgress[currentStep] && stepProgress[currentStep].total > 0 && (
            <div className="mt-8 text-center">
              <p className="text-xs" style={{ color: progressTextColor }}>
                <span style={{ color: progressBarColor }}>*</span> Required
                fields ({stepProgress[currentStep].filled} of{" "}
                {stepProgress[currentStep].total} completed)
              </p>
            </div>
          )}
        </div>

        {/* Save for Later - Subtle */}
        {config.showSaveForLater !== false && (
          <div className="mt-8 text-center">
            <button
              type="button"
              style={{ color: progressTextColor }}
              className="text-sm transition-colors duration-200 hover:opacity-80"
              onMouseEnter={(e) => (e.target.style.color = progressBarColor)}
              onMouseLeave={(e) => (e.target.style.color = progressTextColor)}
            >
              {config.saveForLaterText || "Save and continue later"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Legacy default export for backward compatibility
export default function WizardForm() {
  return <Wizard config={{}} onSubmit={() => {}} />;
}
