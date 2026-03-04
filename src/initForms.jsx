// src/initForms.ts
import * as Inputs from "./formFields/barrel.js";
import { registerField } from "./core/fieldRegistry.js";

let initialized = false;

export function initForms() {
  // Prevent double-registration during Fast Refresh or re-renders
  if (initialized) return;
  initialized = true;

  registerField("string", Inputs.InputDefault);
  registerField("text", Inputs.InputTextArea);
  registerField("color", Inputs.InputColor);
  registerField("number", Inputs.InputNumber);
  registerField("boolean", Inputs.InputCheckbox);
  registerField("toggle", Inputs.InputToggle);
  registerField("date", Inputs.InputDate);
  registerField("datetime", Inputs.DateTime);
  registerField("time", Inputs.TimeInput);
  registerField("select", Inputs.SingleSelect);
  registerField("multiselect", Inputs.MultiSelect);
  registerField("file", Inputs.AutoUploadFileField);
  registerField("fileV2", Inputs.MediaSelectorModal);
  registerField("uploadToBase", Inputs.ImageUploadBase64);
  registerField("array", Inputs.DynamicSubForm);
  registerField("subForm", Inputs.DynamicSubForm);
  registerField("email", Inputs.EmailInput);
  registerField("tel", Inputs.PhoneInput);
  registerField("radio", Inputs.RadioGroup);
  registerField("url", Inputs.UrlInput);
  registerField("captcha", Inputs.Captcha);
  registerField("signature", Inputs.Signature);
  registerField("rating", Inputs.Rating);
  registerField("scale", Inputs.Scale);
  registerField("header", Inputs.FormHeader);

  //   registerField("image", ({ field }) => <img src={field.image?.src} alt="" />);

  //   registerField("paragraph", ({ field }) => <p>{field.content}</p>);
}
