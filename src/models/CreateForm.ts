export interface Field {
  id: string;
  type: "number" | "string" | "multiline" | "boolean" | "date" | "enum";
  label: string;
  options?: string[];
}

export interface FormConfig {
  title: string;
  fields: Field[];
  buttons: string[];
}

export interface FormValues {
  [key: string]:
    | string
    | number
    | readonly string[]
    | boolean
    | Date
    | undefined;
}
