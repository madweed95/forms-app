import React from "react";
import { Field, FormConfig, FormValues } from "../models/CreateForm";

const handleConfigChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setConfig: React.Dispatch<React.SetStateAction<FormConfig>>
) => {
  try {
    const parsedConfig = JSON.parse(event.target.value);
    setConfig(parsedConfig);
  } catch (error) {
    console.error("Invalid JSON format");
  }
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Form submitted!");
};

export const ConfigTab: React.FC<{
  textAreaValue: string;
  setTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
  setConfig: React.Dispatch<React.SetStateAction<FormConfig>>;
}> = ({ textAreaValue, setTextAreaValue, setConfig }) => {
  return (
    <div>
      <textarea
        value={textAreaValue}
        rows={10}
        cols={50}
        placeholder="Enter form configuration in JSON format"
        onChange={(event) => {
          handleConfigChange(event, setConfig);
          setTextAreaValue(event.target.value);
        }}
      />
    </div>
  );
};
export const ResultTab: React.FC<{
  config: FormConfig;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}> = ({ config, formValues, setFormValues }) => {
  const handleInputChange = (
    fieldId: string,
    value: string | number | readonly string[] | boolean | Date | undefined
  ) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [fieldId]: value,
    }));
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "number":
        return (
          <input
            type="number"
            id={field.id}
            value={(formValues[field.id] as number) || ""}
            onChange={(e) =>
              handleInputChange(field.id, e.target.valueAsNumber)
            }
          />
        );
      case "string":
        return (
          <input
            type="text"
            id={field.id}
            value={(formValues[field.id] as string) || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case "multiline":
        return (
          <textarea
            id={field.id}
            value={(formValues[field.id] as string) || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            id={field.id}
            checked={(formValues[field.id] as boolean) || false}
            onChange={(e) => handleInputChange(field.id, e.target.checked)}
          />
        );
      case "date":
        return (
          <input
            type="date"
            id={field.id}
            value={
              formValues[field.id]
                ? (formValues[field.id] as Date).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              handleInputChange(field.id, new Date(e.target.value))
            }
          />
        );
      case "enum":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formValues[field.id] === option}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>{config.title}</h3>

        {config.fields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            {renderField(field)}
          </div>
        ))}
        <br />
        {config.buttons.map((button, index) => (
          <button key={index} type="submit">
            {button}
          </button>
        ))}
      </form>
    </div>
  );
};
