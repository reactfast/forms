"use client";

import { useEffect, useState } from "react";
import { Form } from "./Form";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function TabbedForm({
  config = {},
  onSubmit = () => {},
  onTabChange = () => {},
  onChange = () => {},
  formData = {},
  formTheme = {},
  theme = {},
}) {
  const { tabs = [], styles = {}, rules = [] } = config;

  const [currentTab, setCurrentTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabProgress, setTabProgress] = useState({});

  const handleTabChange = (tabIndex) => {
    setCurrentTab(tabIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onTabChange(tabIndex);
  };

  async function handleSubmit() {
    // Validate all required fields across all tabs
    const allRequiredFields = tabs.flatMap(
      (tab) => tab.fields?.filter((f) => f.required) || [],
    );
    const missingFields = allRequiredFields.filter(
      (f) => !formData[f?.name] || formData[f?.name] === "",
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in all required fields: ${missingFields.map((f) => f.title).join(", ")}`,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Calculate overall progress
  const totalProgress =
    tabs.length > 0
      ? Object.values(tabProgress).reduce((acc, tab) => {
          return (
            acc +
            (tab.total > 0 ? (tab.filled / tab.total) * (100 / tabs.length) : 0)
          );
        }, 0)
      : 0;

  const currentTabData = tabs[currentTab] || {};
  const currentFields = currentTabData.fields || [];

  // Initialize tab progress
  useEffect(() => {
    const newProgress = {};
    tabs.forEach((_, index) => {
      newProgress[index] = { filled: 0, total: 0 };
    });
    setTabProgress(newProgress);
  }, [tabs]);

  // Update progress tracking
  useEffect(() => {
    const newProgress = {};
    tabs.forEach((tab, index) => {
      const fields = tab.fields || [];
      newProgress[index] = countFilledFields(fields, formData);
    });
    setTabProgress(newProgress);
  }, [formData, tabs]);

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

  // Apply theme overrides
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
  const progressTextColor = theme.progressTextColor || "#6B6B6B";
  const borderColor = theme.borderColor || "#F5F5F5";
  const progressBarBackgroundColor =
    theme.progressBarBackgroundColor || "#F5F5F5";
  const backgroundColor = theme.background || "#ffffff";
  const cardBackgroundColor = theme.cardBackground || "#fff";
  const primaryButtonBg = theme.primaryButtonBg || "#020DF9";
  const primaryButtonText = theme.primaryButtonText || "#fff";
  const tabActiveColor = theme.tabActiveColor || "#4F46E5";
  const tabInactiveColor = theme.tabInactiveColor || "#6B7280";
  const tabHoverColor = theme.tabHoverColor || "#374151";
  const tabBorderColor = theme.tabBorderColor || "#E5E7EB";

  return (
    <div className={themedStyles.container} style={{ backgroundColor }}>
      <div className={themedStyles.contentWrapper}>
        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`${themedStyles.header}`}
            style={{ color: headerColor }}
          >
            {config.title || "Tabbed Form"}
          </h1>
          {config.subtitle && (
            <p
              className="text-base font-light sm:mb-7"
              style={{ color: subtitleColor }}
            >
              {config.subtitle}
            </p>
          )}
          {config.showProgress !== false && (
            <p className="mt-1 text-sm" style={{ color: progressTextColor }}>
              {Math.round(totalProgress)}% Complete
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {config.showProgress !== false && (
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
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          {/* Mobile Select Dropdown */}
          <div className="grid grid-cols-1 sm:hidden">
            <select
              value={currentTab}
              onChange={(e) => handleTabChange(Number(e.target.value))}
              aria-label="Select a tab"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
            >
              {tabs.map((tab, index) => (
                <option key={tab?.id || index} value={index}>
                  {tab.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
            />
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden sm:block">
            <div
              className="border-b dark:border-white/10"
              style={{ borderColor: tabBorderColor }}
            >
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                {tabs.map((tab, index) => {
                  const isCurrent = index === currentTab;
                  const TabIcon = tab.icon;
                  const progress = tabProgress[index] || {
                    filled: 0,
                    total: 0,
                  };
                  const isComplete =
                    progress.total > 0 && progress.filled === progress.total;

                  return (
                    <button
                      key={tab?.id || index}
                      type="button"
                      onClick={() => handleTabChange(index)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={classNames(
                        isCurrent
                          ? "border-b-2"
                          : "border-transparent hover:border-gray-300 dark:hover:border-white/20",
                        "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200",
                      )}
                      style={{
                        borderColor: isCurrent ? tabActiveColor : undefined,
                        color: isCurrent ? tabActiveColor : tabInactiveColor,
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.color = tabHoverColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.style.color = tabInactiveColor;
                        }
                      }}
                    >
                      {TabIcon && (
                        <TabIcon
                          aria-hidden="true"
                          className="-ml-0.5 mr-2 size-5"
                          style={{
                            color: isCurrent ? tabActiveColor : undefined,
                          }}
                        />
                      )}
                      <span>{tab.name}</span>
                      {config.showTabProgress !== false &&
                        progress.total > 0 && (
                          <span
                            className={classNames(
                              "ml-2 rounded-full px-2 py-0.5 text-xs",
                              isComplete
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                            )}
                          >
                            {progress.filled}/{progress.total}
                          </span>
                        )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div
          className={themedStyles.card}
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor: borderColor,
          }}
        >
          {/* Tab Title and Description */}
          {(currentTabData.title || currentTabData.description) && (
            <div className="mb-8">
              {currentTabData.title && (
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: headerColor }}
                >
                  {currentTabData.title}
                </h2>
              )}
              {currentTabData.description && (
                <p className="mt-2 text-sm" style={{ color: subtitleColor }}>
                  {currentTabData.description}
                </p>
              )}
            </div>
          )}

          {/* Form Fields */}
          <Form
            fields={currentFields}
            onChange={onChange}
            formData={formData}
            isMobileView={false}
            rules={rules}
            theme={formTheme}
          />

          {/* Submit Button */}
          <div className="mt-16 flex items-center justify-end">
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
                    className="-ml-1 mr-3 h-4 w-4 animate-spin"
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
                <>{config.submitButtonText || "Submit"}</>
              )}
            </button>
          </div>

          {/* Required Fields Notice */}
          {tabProgress[currentTab] && tabProgress[currentTab].total > 0 && (
            <div className="mt-8 text-center">
              <p className="text-xs" style={{ color: progressTextColor }}>
                <span style={{ color: progressBarColor }}>*</span> Required
                fields ({tabProgress[currentTab].filled} of{" "}
                {tabProgress[currentTab].total} completed)
              </p>
            </div>
          )}
        </div>

        {/* Save for Later */}
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

// Default export for backward compatibility
export default function TabbedFormExample() {
  return <TabbedForm config={{}} onSubmit={() => {}} />;
}
