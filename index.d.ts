import { SignatureInputProps } from "@/formFields/Signature";
import { TimeInputProps } from "@/formFields/Time";
import { CSSProperties } from "react";

type CSSColor = CSSProperties["color"];
type CSSBorderColor = CSSProperties["borderColor"];
type CSSBackgroundColor = CSSProperties["backgroundColor"];

/**
 * NOTE: Might use `React.ChangeEventHandler` as alias so this is here for now. -Josh
 */
type OnChangeCallback = () => void;

declare module NovaForms {
  // #region - Types

  type FormFieldCondition =
    | "true"
    | "false"
    | "empty"
    | "not empty"
    | "null"
    | "not null"
    | "less than"
    | "greater than"
    | "equal"
    | "not equal"
    | "between"
    | "matches";

  // #endregion

  // #region - Enums

  type SocialMediaOptions =
    | "Facebook"
    | "Instagram"
    | "Twitter"
    | "LinkedIn"
    | "YouTube"
    | "TikTok"
    | "GitHub";

  type SocialMediaDictionary = { [id: SocialMediaOptions]: string };

  // #endregion

  // #region - Structs

  interface NovaFormsTheme {
    error: CSSColor;
    inputFocusBorder: CSSBorderColor;
    inputBorder: CSSBorderColor;
    label: CSSColor;
    description: CSSColor;
    requiredAsterisk: CSSColor;
    inputText: CSSColor;
    inputBackground: CSSBackgroundColor;
  }

  interface FormField {
    name: string;
    title: string;
    type: string;
    width: number;
  }

  interface FormRule {
    name: string;
    effects: any[];
  }

  interface FormRuleEffect {
    /**
     * Default: `value`
     */
    prop?: string;

    /**
     * TODO: Resolve type.
     */
    targetField: any;

    /**
     * Default: `number`
     */
    kind: string;

    /**
     * ? Not sure if value is always passed as string but is transformed.
     */
    value: string | number;

    /**
     * Default: `false`
     */
    strictString: boolean;

    /**
     * TODO: Resolve type.
     */
    sourceFields: any[];
  }

  // #endregion
  // #region - Global

  /**
   * Generic onChange handler for dynamic forms Applies modifiers automatically.
   *
   * @param setState React setState function
   * @param fields array of field definitions (JSON schema)
   */
  function createFormHandler(
    setState: function,
    fields: FormField[],
    rules
  ): (eOrValue: any, fieldName: string) => void;

  /**
   * Checks if the modifier should apply.
   *
   * @param triggerValue
   * @param when The condition type.
   * @param value value to compare (or array for "between", regex for "matches")
   */
  function evaluateCondition(
    triggerValue: any,
    when: FormFieldCondition,
    value: Array | RegExp | string | number
  ): boolean;

  // #endregion

  // #region - React

  function AutoComplete(): JSX.Element;

  // MARK: SocialMediaLinks

  interface SocialMediaLinksProps {
    value?: SocialMediaDictionary;
    onChange?: OnChangeCallback;
  }

  function SocialMediaLinks(props: SocialMediaLinksProps): JSX.Element;

  // MARK: CaptchaField

  interface CaptchaFieldObject {
    name: string;
    title: string;
    required: boolean;
  }

  interface CaptchaFieldProps {
    onChange?: OnChangeCallback;
    field: CaptchaFieldObject;
    theme: NovaFormsTheme;
    value: any;
  }

  function CaptchaField(props: CaptchaFieldProps): JSX.Element;

  // MARK: DateTime

  interface DateTimeField {
    name: string;
    error?: string;
    title?: string;
    helper?: string;
    description?: string;
    required?: boolean;
    optional?: boolean;
  }

  interface DateTimeProps {
    field: DateTimeField;
    theme: NovaFormsTheme;
    value: string;
    onChange?: OnChangeCallback;
  }

  // MARK: DynamicSubForm

  interface DynamicSubFormField {
    name: string;
    type: string;
    title: string;
  }

  interface DynamicSubFormProps {
    fields: DynamicSubFormField[];
    onSave?: (values: any[]) => void;

    /**
     * Default: `Item`
     */
    title?: string;

    value?: any[];
  }

  function DynamicSubForm(props: DynamicSubFormProps): JSX.Element;

  // MARK: EmailInput

  interface EmailInputField {
    name: string;
    title?: string;

    /**
     * Default: `you@example.com`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    helper?: string;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
  }

  interface EmailInputProps {
    field: EmailInputField;
    value: string;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    helper?: string;
    description?: string;
    placeholder?: string;
  }

  function EmailInput(props: EmailInputProps): JSX.Element;

  // MARK: FormHeader

  type FormHeaderSize = "sm" | "md" | "lg";

  interface FormHeaderField {
    title: string;

    /**
     * Default: `md`
     */
    size?: FormHeaderSize;

    /**
     * Default: `false`
     */
    dividerAbove?: boolean;

    /**
     * Default: `false`
     */
    dividerBelow?: boolean;
  }

  interface FormHeaderProps {
    field: FormHeaderField;
  }

  function FormHeader(props: FormHeaderProps): JSX.Element;

  // MARK: InputCheckbox

  interface InputCheckboxField {
    name: string;
    label?: string;
    optional?: boolean;
    description?: string;
    error?: string;
  }

  interface InputCheckboxProps {
    field: InputCheckboxField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputCheckbox(props: InputCheckboxProps): JSX.Element;

  // MARK: InputColor

  interface InputColorField {
    name: string;
    title?: string;
    description?: string;
    optional?: boolean;
    error?: string;
  }

  interface InputColorProps {
    field: InputColorField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputColor(props: InputColorProps): JSX.Element;

  // MARK: InputDate

  interface InputDateField {
    name: string;
    title?: string;
    description?: string;
    optional?: boolean;
    required?: boolean;
    error?: string;
  }

  interface InputDateProps {
    field: InputDateField;
    value: any;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputDate(props: InputDateProps): JSX.Element;

  // MARK: InputDefault

  interface InputDefaultField {
    name: string;
    title?: string;

    /**
     * Default: `text`
     */
    type?: string;

    /**
     * Default: `Enter text`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    error?: string;
    helper?: string;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
  }

  interface InputDefaultProps {
    field: InputDefaultField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    theme: NovaFormsTheme;
  }

  function InputDefault(props: InputDefaultProps): JSX.Element;

  // MARK: InputNumber

  interface InputNumberField {
    name: string;
    label?: string;

    /**
     * Default: `Enter a number`
     */
    placeholder?: string;

    description?: string;
    optional?: boolean;
    error?: string;

    // TODO: Are strings okay here? The technical input is `string | number`. -Josh
    min: number;
    max: number;
    step: number;
  }

  interface InputNumberProps {
    field: InputNumberField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputNumber(props: InputNumberProps): JSX.Element;

  // MARK: InputTextArea

  interface InputTextAreaField {
    name: string;
    title?: string;

    /**
     * Default: `4`
     */
    rows: number;

    /**
     * Default: `Enter text`
     */
    placeholder?: string;

    description?: string;
    optional?: boolean;
    error?: string;
  }

  interface InputTextAreaProps {
    field: InputTextAreaField;
    value: any;
    theme: NovaFormsTheme;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputTextArea(props: InputTextAreaProps): JSX.Element;

  // MARK: InputToggle

  interface InputToggleField {
    name: string;
    title?: string;
    description?: string;
    error?: string;
  }

  interface InputToggleProps {
    field: InputToggleField;
    value: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  }

  function InputToggle(props: InputToggleProps): JSX.Element;

  // MARK: MediaSelectorModal

  interface MediaSelectorModalProps {
    onSelect: (url: string) => void;

    value: any;

    /**
     * Default: `Select Media`
     */
    label?: string;
  }

  function MediaSelectorModal(props: MediaSelectorModalProps): JSX.Element;

  // MARK: MultiSelect

  // TODO: Verify & Validate optional and required field(s). -Josh
  interface MultiSelectOption {
    label: string;

    /**
     * For the dynamic `optionLabel` passed via `MultiSelectField` prop.
     */
    [optionLabel: string]: string;
  }

  type MultiSelectOptions = MultiSelectOption[];

  interface MultiSelectField {
    name: string;
    title?: string;

    /**
     * Default: `"Select options"`
     */
    placeholder?: string;

    /**
     * Default: `[]`
     */
    options?: MultiSelectOptions;

    /**
     * Default: `id`
     */
    optionId?: string;

    /**
     * Default: `name`
     */
    optionLabel?: string;

    error?: string;
  }

  interface MultiSelectProps {
    field: MultiSelectField;
    theme: NovaFormsTheme;
    onChange: (labels: any[]) => void;

    /**
     * Default: `[]`
     */
    value?: any[];
  }

  function MultiSelect(props: MultiSelectProps): JSX.Element;

  // MARK: Phone

  interface PhoneField {
    name: string;
    title?: string;

    /**
     * Default: `(123) 456-7890`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    helper?: string;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
  }

  interface PhoneProps {
    field: PhoneField;
    value: number | string;
    onChange: (arg: { name: string; value: string }) => void;
    theme: NovaFormsTheme;
  }

  function Phone(props: PhoneProps): JSX.Element;

  // #MARK: RadioGroup

  interface RadioGroupOption {
    label: string;
    value: React.Key;
  }

  interface RadioGroupField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
    error?: string;
    helper?: string;

    /**
     * Default: `[]`
     */
    options?: any[];
  }

  interface RadioGroupProps {
    field: RadioGroupField;
    value: any;
    onChange: (value: string) => void;
    theme: NovaFormsTheme;
  }

  function RadioGroup(props: RadioGroupProps): JSX.Element;

  // MARK: RatingInput

  interface RatingInputField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
    helper?: string;

    /**
     * Default: `5`
     */
    max?: number;

    /**
     * An icon from:
     * ```js
     * import ReturnIcon from "../utils/returnHeroIcon.jsx";
     * ```
     *
     * Default: `StarIcon`
     */
    icon?: string;
  }

  interface RatingInputProps {
    field: RatingInputField;
    value: any;
    onChange: (arg: { target: { name: string; value: number } }) => void;
    theme: NovaFormsTheme;
  }

  function RatingInput(props: RatingInputProps): JSX.Element;

  // MARK: ScaleInput

  interface ScaleInputField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
    helper?: string;

    /**
     * Default: `1`
     */
    min?: number;

    /**
     * Default: `10`
     */
    max?: number;

    /**
     * Default: `1`
     */
    step?: number;
  }

  interface ScaleInputProps {
    field: ScaleInputField;
    value: any;
    onChange: (arg: { name: string; value: number }) => void;
  }

  function ScaleInput(props: ScaleInputProps): JSX.Element;

  // MARK: SignatureInput

  interface SignatureInputField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
    helper?: string;
  }

  interface SignatureInputProps {
    field: SignatureInputField;
    value: any;
    onChange: (arg: { name: string; value: string }) => void;
    theme: NovaFormsTheme;
  }

  function SignatureInput(props: SignatureInputProps): JSX.Element;

  // MARK: SingleSelect

  // TODO: Verify & Validate optional and required field(s). -Josh
  interface SingleSelectOption {
    name: string;
    value: any;
    label: string;

    /**
     * For the dynamic `optionLabel` passed via `SingleSelectField` prop.
     */
    [optionLabel: string]: string;
  }

  interface SingleSelectField {
    name: string;
    title?: string;
    helper?: string;
    description?: string;

    /**
     * Default: `Select an option`
     */
    placeholder?: string;

    required?: boolean;
    error?: string;

    /**
     * Default: `[]`
     */
    options?: (SingleSelectOption | string)[];

    /**
     * Default: `id`
     */
    optionId?: string;

    /**
     * Default: `name`
     */
    optionLabel?: string;
  }

  interface SingleSelectProps {
    field: SingleSelectField;
    value: any;

    /**
     * TODO: Not sure if the type is broad or constrained to strings or casted strings. -Josh
     */
    onChange: (value: any) => void;

    theme: NovaFormsTheme;
  }

  function SingleSelect(props: SingleSelectProps): JSX.Element;

  // MARK: TimeInput

  interface TimeInputField {
    name: string;
    title?: string;

    /**
     * Default: `HH:MM`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    error?: string;
    helper?: string;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
    min?: string | number;
    max?: string | number;
    step?: string | number;
  }

  interface TimeInputProps {
    field: TimeInputField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    theme: NovaFormsTheme;
  }

  function TimeINput(props: TimeInputProps): JSX.Element;

  // MARK: ImageUploadBase64

  interface ImageUploadBase64Props {
    value: Base64URLString;
    onChange?: (base64String: Base64URLString) => void;

    /**
     * TODO: Maybe use `png` to simplify API without needing the `.`, unless this is a pattern selector format. -Josh
     * Default: `['.png', '.jpg', '.jpeg', '.gif']
     */
    accept?: string[];

    /**
     * Default: `10 * 1024 * 1024` (10 MB)
     */
    maxSize?: number;
  }

  function ImageUploadBase64(props: ImageUploadBase64Props): JSX.Element;

  // MARK: UrlInput

  interface UrlInputField {
    name: string;
    title?: string;

    /**
     * Default: `https://example.com`
     */
    placeholder?: string;

    description?: string;
    required?: boolean;
    helper?: string;
    leadingIcon?: JSX.Element;
    trailingIcon?: JSX.Element;
  }

  interface UrlInputProps {
    field: UrlInputField;
    value: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    theme: NovaFormsTheme;
  }

  function UrlInput(props: UrlInputProps): JSX.Element;

  // #endregion
}
