import React, { useState } from "react";
import { FormConfig, FormValues } from "../models/CreateForm";
import "./FormsGenerator.css";
import { ConfigTab, ResultTab } from "./Tabs";

export const FormsGenerator: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [tab, setTab] = useState<"config" | "result">("config");
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [config, setConfig] = useState<FormConfig>({
    title: "",
    fields: [],
    buttons: [],
  });

  return (
    <div>
      <div className="forms-tabs-box">
        <button
          className={`tab-button ${tab === "config" ? "active" : ""}`}
          onClick={() => setTab("config")}
        >
          Config
        </button>
        <button
          className={`tab-button ${tab === "result" ? "active" : ""}`}
          onClick={() => setTab("result")}
        >
          Result
        </button>
      </div>
      {tab === "config" ? (
        <ConfigTab
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          setConfig={setConfig}
        />
      ) : (
        <ResultTab
          config={config}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}
    </div>
  );
};
