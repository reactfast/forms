"use client";

import { useState } from "react";
import { Form } from "./Form";

export function FilteredForm({
  fields = [],
  groups = [],
  rules = [],
  filterLayout = "wrap",
  onChange = () => {},
  formData = {},
  formTheme = {},
  theme = {},
}) {
  const [activeGroup, setActiveGroup] = useState(null); // null = "Show All"

  // Filter visible fields based on active group
  const visibleFields =
    activeGroup === null
      ? fields
      : fields.filter((f) => f.group === activeGroup);

  // Filter tag colors (themeable)
  const tagActiveBg = theme.tagActiveBg || "#020DF9";
  const tagActiveText = theme.tagActiveText || "#fff";
  const tagInactiveBg = theme.tagInactiveBg || "#F3F4F6";
  const tagInactiveText = theme.tagInactiveText || "#4B5563";
  const tagHoverBg = theme.tagHoverBg || "#E5E7EB";

  const isScrollLayout = filterLayout === "scroll";

  return (
    <div className="w-full">
      {/* Filter Tags */}
      {groups.length > 0 && (
        <div className="mb-4">
          <div
            className={
              isScrollLayout
                ? "flex space-x-2 overflow-x-auto"
                : "flex flex-wrap gap-2"
            }
            style={
              isScrollLayout
                ? {
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                  }
                : undefined
            }
          >
            {/* "Show All" tag — always first */}
            <button
              key="__show_all__"
              type="button"
              onClick={() => setActiveGroup(null)}
              className={`inline-flex shrink-0 items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${isScrollLayout ? "whitespace-nowrap" : ""}`}
              style={{
                backgroundColor:
                  activeGroup === null ? tagActiveBg : tagInactiveBg,
                color:
                  activeGroup === null ? tagActiveText : tagInactiveText,
              }}
              onMouseEnter={(e) => {
                if (activeGroup !== null) {
                  e.currentTarget.style.backgroundColor = tagHoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (activeGroup !== null) {
                  e.currentTarget.style.backgroundColor = tagInactiveBg;
                }
              }}
            >
              Show All
            </button>

            {groups.map((group) => {
              const isActive = activeGroup === group.value;
              return (
                <button
                  key={group.value}
                  type="button"
                  onClick={() => setActiveGroup(group.value)}
                  className={`inline-flex shrink-0 items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${isScrollLayout ? "whitespace-nowrap" : ""}`}
                  style={{
                    backgroundColor: isActive ? tagActiveBg : tagInactiveBg,
                    color: isActive ? tagActiveText : tagInactiveText,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = tagHoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = tagInactiveBg;
                    }
                  }}
                >
                  {group.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Form Fields — no wrapper, no card, no submit */}
      {visibleFields.length > 0 && (
        <Form
          fields={visibleFields}
          onChange={onChange}
          formData={formData}
          isMobileView={false}
          rules={rules}
          theme={formTheme}
        />
      )}
    </div>
  );
}
