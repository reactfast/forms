import { Tabs } from "../Tabs";
import { useState } from "react";

/**
 * Example: Editing a User model in an admin panel.
 * Demonstrates non-sequential tab navigation — jump to any tab in any order.
 */
export default function TabsFormExample() {
  const [formData, setFormData] = useState({});

  const config = {
    title: "Edit User",
    subtitle: "Update user profile, preferences, and access controls",
    submitButtonText: "Save Changes",
    submittingText: "Saving...",
    tabs: [
      {
        id: "profile",
        name: "Profile",
        title: "Basic Information",
        description: "Name, contact info, and bio",
        fields: [
          {
            name: "firstName",
            title: "First Name",
            type: "text",
            required: true,
            placeholder: "Jane",
            width: 50,
          },
          {
            name: "lastName",
            title: "Last Name",
            type: "text",
            required: true,
            placeholder: "Doe",
            width: 50,
          },
          {
            name: "email",
            title: "Email",
            type: "email",
            required: true,
            placeholder: "jane@example.com",
          },
          {
            name: "phone",
            title: "Phone",
            type: "phone",
            placeholder: "(555) 867-5309",
          },
          {
            name: "bio",
            title: "Bio",
            type: "textarea",
            placeholder: "Tell us about this user...",
          },
          {
            name: "avatar",
            title: "Avatar URL",
            type: "url",
            placeholder: "https://example.com/avatar.jpg",
          },
        ],
      },
      {
        id: "preferences",
        name: "Preferences",
        title: "User Preferences",
        description: "Notification settings and display options",
        fields: [
          {
            name: "theme",
            title: "Theme",
            type: "select",
            required: true,
            default: "system",
            options: [
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ],
          },
          {
            name: "language",
            title: "Language",
            type: "select",
            default: "en",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Spanish" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
              { value: "ja", label: "Japanese" },
            ],
          },
          {
            name: "emailNotifications",
            title: "Email Notifications",
            type: "toggle",
            default: true,
          },
          {
            name: "smsNotifications",
            title: "SMS Notifications",
            type: "toggle",
            default: false,
          },
          {
            name: "timezone",
            title: "Timezone",
            type: "select",
            options: [
              { value: "America/New_York", label: "Eastern (ET)" },
              { value: "America/Chicago", label: "Central (CT)" },
              { value: "America/Denver", label: "Mountain (MT)" },
              { value: "America/Los_Angeles", label: "Pacific (PT)" },
            ],
          },
        ],
      },
      {
        id: "permissions",
        name: "Permissions",
        title: "Access Controls",
        description: "Manage roles and permissions for this user",
        fields: [
          {
            name: "role",
            title: "Role",
            type: "select",
            required: true,
            options: [
              { value: "viewer", label: "Viewer" },
              { value: "editor", label: "Editor" },
              { value: "admin", label: "Admin" },
              { value: "superadmin", label: "Super Admin" },
            ],
          },
          {
            name: "canManageUsers",
            title: "Can Manage Users",
            type: "toggle",
            default: false,
          },
          {
            name: "canManageBilling",
            title: "Can Manage Billing",
            type: "toggle",
            default: false,
          },
          {
            name: "canDeleteRecords",
            title: "Can Delete Records",
            type: "toggle",
            default: false,
          },
          {
            name: "apiAccess",
            title: "API Access",
            type: "toggle",
            default: false,
          },
          {
            name: "accessNotes",
            title: "Access Notes",
            type: "textarea",
            placeholder: "Any notes about this user's access level...",
          },
        ],
      },
      {
        id: "metadata",
        name: "Metadata",
        title: "System Metadata",
        description: "Read-only system fields and internal tracking",
        fields: [
          {
            name: "userId",
            title: "User ID",
            type: "text",
            readOnly: true,
            default: "usr_a1b2c3d4e5",
          },
          {
            name: "createdAt",
            title: "Created At",
            type: "text",
            readOnly: true,
            default: "2025-01-15T09:30:00Z",
          },
          {
            name: "lastLogin",
            title: "Last Login",
            type: "text",
            readOnly: true,
            default: "2026-03-28T14:22:00Z",
          },
          {
            name: "status",
            title: "Account Status",
            type: "select",
            required: true,
            options: [
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspended" },
              { value: "deactivated", label: "Deactivated" },
            ],
          },
          {
            name: "internalNotes",
            title: "Internal Notes",
            type: "textarea",
            placeholder: "Admin-only notes about this account...",
          },
        ],
      },
    ],
    rules: [
      // Example: auto-grant API access when role is admin or superadmin
      {
        name: "adminApiAccess",
        effects: [
          { targetField: "apiAccess", prop: "readOnly", value: true },
        ],
      },
    ],
  };

  const handleSubmit = async (data) => {
    console.log("User updated:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    alert("User saved successfully!");
  };

  const handleTabChange = (tabIndex) => {
    console.log("Switched to tab:", tabIndex);
  };

  const handleChange = (updatedData) => {
    setFormData(updatedData);
  };

  return (
    <div className="p-6">
      <Tabs
        config={config}
        onSubmit={handleSubmit}
        onTabChange={handleTabChange}
        onChange={handleChange}
        formData={formData}
        theme={{
          headerColor: "#111827",
          primaryButtonBg: "#4F46E5",
          primaryButtonText: "#ffffff",
          tabActiveColor: "#4F46E5",
          tabInactiveColor: "#6B7280",
          cardBackground: "#ffffff",
          borderColor: "#E5E7EB",
        }}
      />
    </div>
  );
}
