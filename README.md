# 🎛️ CtrlForm

**Dynamic React forms powered by JSON schemas, modifiers, and subforms.**  
Create complex, adaptive form systems without boilerplate — designed for scale, simplicity, and composability.

[![npm version](https://img.shields.io/npm/v/@jonathonscott/novaforms.svg)](https://www.npmjs.com/package/@jonathonscott/novaforms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://github.com/jonathonmcclendon/NovaForms/actions/workflows/build.yml/badge.svg)](https://github.com/jonathonmcclendon/NovaForms/actions)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](https://github.com/jonathonmcclendon/NovaForms/issues)

### 📚 [**View Live Documentation**](https://nova-forms-next.vercel.app/) 📚

---

## ⚙️ Installation

```bash
npm install @jonathonscott/novaforms
# or
yarn add @jonathonscott/novaforms
```

CtrlForm requires **React 18+** and **React DOM 18+** as peer dependencies.

---

## 🚀 Quick Start

The simplest way to get started:

```jsx
import { useState } from "react";
import { Form, createFormHandler } from "@jonathonscott/novaforms";

const fields = [
  { name: "firstName", title: "First Name", type: "string", width: 50 },
  { name: "lastName", title: "Last Name", type: "string", width: 50 },
  { name: "email", title: "Email", type: "email", width: 100 },
  { name: "subscribe", title: "Subscribe?", type: "boolean", width: 100 },
];

export default function App() {
  const [formData, setFormData] = useState({});

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  });

  return (
    <Form
      fields={fields}
      onChange={handleChange}
      formData={formData}
    />
  );
}
```

---

## ✨ Features

- ⚡ **Controlled forms** — simple `value`/`onChange` pattern like React inputs
- 🧩 **Composable** — each field is a reusable React component
- 🔄 **Advanced conditional logic** — dynamic show/hide, disable, and field dependencies
- 📱 **Responsive layout** — automatic width handling with Tailwind classes
- 🧱 **Subforms & arrays** — nested or repeated field groups are first-class citizens
- 🎨 **Theming-ready** — customize UI with Tailwind or your own design system
- 🔌 **Extensible** — register your own field components via `registerField()`
- 🧠 **Smart rules system** — powerful top-level rules with field-level triggers
- 🔢 **Math operations** — automatic calculations with add, subtract, multiply, divide
- 📝 **String operations** — concatenation and text manipulation
- ✅ **Pattern validation** — client-side regex validation with custom messages
- 🎯 **Multiple field types** — 20+ built-in field types from text to file uploads

---

## 🎯 Built-in Field Types

Nova Forms comes with 20+ field types ready to use:

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text input | `{ type: "string", title: "Name" }` |
| `text` | Textarea | `{ type: "text", title: "Description" }` |
| `email` | Email input with validation | `{ type: "email", title: "Email" }` |
| `tel` | Phone number input | `{ type: "tel", title: "Phone" }` |
| `url` | URL input | `{ type: "url", title: "Website" }` |
| `number` | Number input | `{ type: "number", title: "Age" }` |
| `boolean` | Checkbox | `{ type: "boolean", title: "Subscribe" }` |
| `toggle` | Toggle switch | `{ type: "toggle", title: "Enable" }` |
| `date` | Date picker | `{ type: "date", title: "Birth Date" }` |
| `datetime` | Date and time picker | `{ type: "datetime", title: "Event Time" }` |
| `time` | Time picker | `{ type: "time", title: "Start Time" }` |
| `color` | Color picker | `{ type: "color", title: "Theme Color" }` |
| `select` | Single select dropdown | `{ type: "select", options: [...] }` |
| `multiselect` | Multi-select dropdown | `{ type: "multiselect", options: [...] }` |
| `radio` | Radio button group | `{ type: "radio", options: [...] }` |
| `file` | File upload | `{ type: "file", title: "Upload" }` |
| `fileV2` | Enhanced file upload | `{ type: "fileV2", title: "Photo" }` |
| `uploadToBase` | Base64 image upload | `{ type: "uploadToBase", title: "Avatar" }` |
| `array` | Dynamic subform/array | `{ type: "array", fields: [...] }` |
| `subForm` | Nested form group | `{ type: "subForm", fields: [...] }` |
| `signature` | Signature pad | `{ type: "signature", title: "Signature" }` |
| `rating` | Star rating | `{ type: "rating", title: "Rating" }` |
| `scale` | Likert scale | `{ type: "scale", title: "Satisfaction" }` |
| `captcha` | reCAPTCHA | `{ type: "captcha" }` |
| `header` | Section header | `{ type: "header", title: "Section" }` |
| `paragraph` | Static text | `{ type: "paragraph", content: "Text" }` |
| `image` | Static image | `{ type: "image", image: { src: "..." } }` |

---

## 🧩 Example: Registering Custom Fields

You can extend Nova Forms with your own field types:

```jsx
import { registerField } from "@jonathonscott/novaforms";

function QRCodeScannerField({ field, value, onChange }) {
  return (
    <div>
      <p>Scan QR Code for {field.title}</p>
      {/* Your scanner logic */}
    </div>
  );
}

registerField("qrScanner", QRCodeScannerField);
```

Now use it in your fields array:

```jsx
const fields = [
  {
    name: "eventCheckIn",
    title: "Check In",
    type: "qrScanner",
    width: 100
  }
];
```

---

## 🧠 API Overview

### `Form`

Renders a form based on your field array with integrated modifiers and conditions.

| Prop           | Type                  | Description                                     |
| -------------- | --------------------- | ----------------------------------------------- |
| `fields`       | `array`               | Array of field definitions                      |
| `onChange`     | `function`            | Change handler (from createFormHandler)         |
| `formData`     | `object`              | Form data object from parent state              |
| `theme`        | `object` _(optional)_ | Custom theme overrides                          |
| `isMobileView` | `boolean` _(optional)_ | Force mobile layout (full width)               |

### `createFormHandler`

Creates a change handler that manages state and applies modifiers.

| Prop           | Type                  | Description                                     |
| -------------- | --------------------- | ----------------------------------------------- |
| `fields`       | `array`               | Array of field definitions                      |
| `setState`     | `function`            | React setState function                         |
| `rules`        | `array` _(optional)_  | Top-level rules referenced by field triggers    |

### Field Schema

Each field object supports:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Field name (required) |
| `type` | `string` | Field type (string, email, boolean, etc.) |
| `title` | `string` | Display label (preferred over `label`) |
| `label` | `string` | Display label (legacy, use `title`) |
| `width` | `number` | Width percentage (25, 50, 75, 100) |
| `default` | `any` | Default value |
| `readOnly` | `boolean` | Make field read-only |
| `required` | `boolean` | Mark field as required |
| `placeholder` | `string` | Placeholder text |
| `description` | `string` | Help text below field |
| `helper` | `string` | Additional help text |
| `error` | `string` | Error message to display |
| `leadingIcon` | `Component` | Icon component before input |
| `trailingIcon` | `Component` | Icon component after input |
| `modifiers` | `array` | (Legacy) field-local modifiers for values |
| `triggers` | `array` | Triggers that reference top-level rules |
| `conditions.hiddenWhen` | `array or object` | Conditions to hide (rendered with `hidden` class) |
| `conditions.hiddenMode` | `any or all` | Mode for hidden conditions (default any) |
| `conditions.readOnlyWhen` | `array or object` | Conditions to set readOnly |
| `conditions.readOnlyMode` | `any or all` | Mode for readOnly conditions (default any) |
| `pattern` | `RegExp \| string \| Array<{ regex, message } \| string>` | Client-side pattern checks with messages |
| `options` | `array` | Options for select, radio, multiselect fields |
| `fields` | `array` | Sub-fields for array/subForm types |

### Modifiers (legacy)

Field-local modifiers automatically update dependent field values. These are still supported for backward compatibility, but the preferred approach is to use top-level rules and field-level triggers.

```jsx
{
  name: "firstName",
  type: "string",
  modifiers: [
    {
      target: "fullName",
      type: "concat",
      when: "true",
      value: " " // adds space
    }
  ]
}
```

### Conditions

Control field visibility and state:

```jsx
{
  name: "subscribe",
  type: "boolean",
  conditions: {
    hiddenWhen: {
      field: "age",
      when: "less than",
      value: 18
    }
  }
}
```

---

### Rules & Triggers

- Rules live at the top level and have unique names. A rule contains one or more effects that target a field and either change its value or attributes.
- Triggers live on fields and reference a rule by name. When the trigger's conditions match, the rule's effects are applied.
- Value effects are applied inside `createFormHandler`. Attribute effects (e.g., `hidden`, `readOnly`, `title`) are applied in `NovaForm`.

Rules shape:

```js
const rules = [
  {
    name: "fullNameRule",
    effects: [
      { targetField: "displayName", prop: "value", type: "concat", kind: "string", value: " " },
      { targetField: "age", prop: "readOnly", value: true },
    ],
  },
];
```

Trigger shape on a field:

```js
{
  name: "firstName",
  type: "string",
  triggers: [
    {
      rule: "fullNameRule",
      when: [
        { field: "firstName", when: "not empty" },
        { field: "lastName", when: "not empty" },
      ],
      mode: "all", // all = AND, any = OR (default)
    },
  ],
}
```

Pass `rules` to both `createFormHandler` and `Form`:

```jsx
const handleChange = createFormHandler({ fields, rules, setState: setFormData });

<Form fields={fields} rules={rules} onChange={handleChange} formData={formData} />
```

Hidden fields remain mounted and use Tailwind's `hidden` class so values still update.

---

## 🧱 Architecture Overview

Nova Forms is organized for **extensibility** and **maintainability**:

```
src/
├── core/              → field registry and evaluation
├── formFields/        → built-in field components
├── handlers/          → form handlers and modifiers
├── utils/             → shared utilities
├── NovaForm.jsx       → main form component
└── returnFields.jsx   → field renderer
```

---

## 🔄 Migration from Manual Field Mapping

If you're currently mapping fields manually:

**Before:**
```jsx
import { ReturnFieldsV2, createFormHandler, initializeFormData } from "@jonathonscott/novaforms";

const [formData, setFormData] = useState(() => initializeFormData(fields));
const handleChange = createFormHandler({ fields, setState: setFormData });

return (
  <div className="-mx-2 flex flex-wrap">
    {fields.map((field) => (
      <div key={field.name} className={`${getWidthClass(field.width)} mb-4 px-2`}>
        <ReturnFieldsV2
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      </div>
    ))}
  </div>
);
```

**After:**
```jsx
import { Form, createFormHandler } from "@jonathonscott/novaforms";

const [formData, setFormData] = useState({});
const handleChange = createFormHandler({ fields, setState: setFormData });

return (
  <Form
    fields={fields}
    onChange={handleChange}
    formData={formData}
  />
);
```

---

## 📚 Documentation

For comprehensive guides and examples, see our documentation:

- **Live Documentation**: [nova-forms-next.vercel.app](https://nova-forms-next.vercel.app/)
- **Docs Repository**: [jonathonmcclen/NovaForms-Next](https://github.com/jonathonmcclen/NovaForms-Next)

- **[Introduction](documentation/intro.md)** - Complete overview of Nova Forms
- **[Quick Start](documentation/quickstart.md)** - Get up and running quickly
- **[createFormHandler](documentation/createFormHandler.md)** - Understanding the form handler system
- **[Fields & Schemas](documentation/fields-schemas.md)** - Complete field reference and schema guide
- **[Rules System](documentation/rules.md)** - Advanced rules and effects
- **[Triggers & Conditions](documentation/triggers.md)** - Conditional logic and triggers
- **[Dynamic Hide](documentation/dynamic-hide.md)** - Show/hide fields dynamically
- **[Dynamic Disable](documentation/dynamic-disable.md)** - Enable/disable fields dynamically
- **[Custom Fields](documentation/custom-fields.md)** - Creating and registering custom field types
- **[Styling with Tailwind](documentation/styling-tailwind.md)** - Tailwind CSS integration
- **[Theme Styling](documentation/styling-theme.md)** - Custom theming system

---

## 🤝 Contributing

We welcome pull requests and feature suggestions!

1. Fork the repo
2. Create a feature branch

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes

   ```bash
   git commit -m "Add new feature"
   ```

4. Push to your branch

   ```bash
   git push origin feature/your-feature
   ```

5. Open a pull request

> 🔒 Only approved code owners can merge to main.
> See `.github/CODEOWNERS` for details.

---

## 🪪 License

Licensed under the [MIT License](LICENSE).
Copyright © 2025 [Jonathon McClendon](https://github.com/jonathonmcclendon)

---

## 💡 Maintained by

**Jonathon McClendon**
Creator of Nova Forms — building high-performance tools for scalable React ecosystems.

---

### 🌟 Support the Project

If Nova Forms helps you ship faster or cleaner React code:

- ⭐ Star the repo
- 🐛 Open an issue for bugs or feature ideas
- 💬 Share it with other developers

---

> _"A form library that feels invisible — flexible, composable, and future-proof."_

---

### 🧭 Next Steps (Roadmap Ideas)

- [ ] Advanced validation layer (Yup / Zod integration)
- [ ] Enhanced theming system (context-aware)
- [ ] Multi-Step Forms / Wizard support
- [ ] TypeScript definitions (optional)

---
