import { TabbedForm } from "../TabbedForm";
import {
  UserIcon,
  BuildingOfficeIcon,
  UsersIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

export default function TabbedFormExample() {
  const [formData, setFormData] = useState({});

  const config = {
    title: "Account Settings",
    subtitle: "Manage your account information across different sections",
    showProgress: true,
    showTabProgress: true,
    submitButtonText: "Save Changes",
    submittingText: "Saving...",
    tabs: [
      {
        id: "account",
        name: "My Account",
        icon: UserIcon,
        title: "Personal Information",
        description: "Update your personal details and contact information",
        fields: [
          {
            name: "firstName",
            title: "First Name",
            type: "text",
            required: true,
            placeholder: "Enter your first name",
          },
          {
            name: "lastName",
            title: "Last Name",
            type: "text",
            required: true,
            placeholder: "Enter your last name",
          },
          {
            name: "email",
            title: "Email Address",
            type: "email",
            required: true,
            placeholder: "your.email@example.com",
          },
          {
            name: "phone",
            title: "Phone Number",
            type: "phone",
            required: false,
            placeholder: "(555) 123-4567",
          },
        ],
      },
      {
        id: "company",
        name: "Company",
        icon: BuildingOfficeIcon,
        title: "Company Details",
        description: "Provide information about your organization",
        fields: [
          {
            name: "companyName",
            title: "Company Name",
            type: "text",
            required: true,
            placeholder: "Acme Corporation",
          },
          {
            name: "industry",
            title: "Industry",
            type: "text",
            required: false,
            placeholder: "Technology, Healthcare, etc.",
          },
          {
            name: "companySize",
            title: "Company Size",
            type: "select",
            required: false,
            options: [
              { value: "1-10", label: "1-10 employees" },
              { value: "11-50", label: "11-50 employees" },
              { value: "51-200", label: "51-200 employees" },
              { value: "201-500", label: "201-500 employees" },
              { value: "501+", label: "501+ employees" },
            ],
          },
        ],
      },
      {
        id: "team",
        name: "Team Members",
        icon: UsersIcon,
        title: "Team Management",
        description: "Manage your team members and their roles",
        fields: [
          {
            name: "teamName",
            title: "Team Name",
            type: "text",
            required: false,
            placeholder: "Engineering Team",
          },
          {
            name: "teamMembers",
            title: "Number of Team Members",
            type: "number",
            required: false,
            placeholder: "5",
          },
          {
            name: "teamDescription",
            title: "Team Description",
            type: "textarea",
            required: false,
            placeholder: "Describe your team's role and responsibilities...",
          },
        ],
      },
      {
        id: "billing",
        name: "Billing",
        icon: CreditCardIcon,
        title: "Billing Information",
        description: "Update your billing details and payment method",
        fields: [
          {
            name: "billingEmail",
            title: "Billing Email",
            type: "email",
            required: true,
            placeholder: "billing@example.com",
          },
          {
            name: "billingAddress",
            title: "Billing Address",
            type: "text",
            required: true,
            placeholder: "123 Main St",
          },
          {
            name: "city",
            title: "City",
            type: "text",
            required: true,
            placeholder: "San Francisco",
          },
          {
            name: "zipCode",
            title: "ZIP Code",
            type: "text",
            required: true,
            placeholder: "94105",
          },
        ],
      },
    ],
  };

  const handleSubmit = async (data) => {
    console.log("Form submitted:", data);
    // Handle form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Settings saved successfully!");
  };

  const handleTabChange = (tabIndex) => {
    console.log("Tab changed to:", tabIndex);
  };

  const handleChange = (updatedData) => {
    setFormData(updatedData);
  };

  return (
    <TabbedForm
      config={config}
      onSubmit={handleSubmit}
      onTabChange={handleTabChange}
      onChange={handleChange}
      formData={formData}
      theme={{
        progressBarColor: "#4F46E5",
        headerColor: "#111827",
        tabActiveColor: "#4F46E5",
        tabInactiveColor: "#6B7280",
        primaryButtonBg: "#4F46E5",
      }}
    />
  );
}
