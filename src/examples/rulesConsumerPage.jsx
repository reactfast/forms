"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Form,
  createFormHandler,
  initForms,
  initializeFormData,
} from "@reactfast/forms";

export default function RulesConsumerPage() {
  const fields = useMemo(
    () => [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
        width: 50,
        triggers: [{ rule: "fullNameRule", when: "not null" }],
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
        width: 50,
        triggers: [{ rule: "fullNameRule", when: "not null" }],
      },
      {
        name: "fullName",
        title: "Full Name",
        type: "string",
        width: 100,
        readOnly: true,
      },
    ],
    [],
  );

  const rules = useMemo(
    () => [
      {
        name: "fullNameRule",
        effects: [
          {
            targetField: "fullName",
            prop: "value",
            type: "concat",
            kind: "string",
            sourceFields: [
              { field: "firstName" },
              { field: "lastName", charBefore: " " },
            ],
          },
        ],
      },
    ],
    [],
  );

  const [ready, setReady] = useState(false);
  const [formData, setFormData] = useState(() => initializeFormData(fields));

  useEffect(() => {
    initForms();
    setReady(true);
  }, []);

  const handleChange = createFormHandler({
    fields,
    rules,
    setState: setFormData,
  });

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-2 text-2xl font-semibold">Rules Test Page</h1>
      <p className="mb-6 text-sm text-gray-600">
        Type a first and last name. The read-only full name is populated via
        top-level <code>rules</code>.
      </p>

      <Form
        fields={fields}
        rules={rules}
        onChange={handleChange}
        formData={formData}
      />

      <section className="mt-6 rounded-md border p-4">
        <h2 className="mb-2 font-medium">Debug</h2>
        <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
      </section>
    </main>
  );
}
