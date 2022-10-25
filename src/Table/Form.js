import React, { useState } from "react";
import headers from "../headers";
import { useGridContext } from "./Context";

const Form = ({ showForm }) => {
  const { insertRow } = useGridContext();
  const formElements = headers.filter((header) => header.formElement);
  const columns = formElements.map((header) => header.accessor);
  const defaultData = {};
  columns.forEach((column) => {
    defaultData[column] = "";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    insertRow(formData);
    showForm(false);
  };

  const [formData, setFormData] = useState(defaultData);

  return (
    <div className="form-container">
      <h1>Add Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {formElements.map((formElement) => {
            return (
              <div key={formElement.accessor} className="form-item">
                <label htmlFor={formElement.accessor}>
                  {formElement.header}
                </label>
                {formElement.type === "select" ? (
                  <select
                    value={formData[formElement.accessor]}
                    id={formElement.accessor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [formElement.accessor]: e.target.value,
                      })
                    }
                  >
                    {formElement.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={formElement.type}
                    id={formElement.accessor}
                    value={formElement[formElement.accessor]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [formElement.accessor]: e.target.value,
                      })
                    }
                    {...formElement.props}
                  ></input>
                )}
              </div>
            );
          })}
        </div>
        <div className="btn-container">
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => showForm(false)}
          >
            Cancel
          </button>
          <button style={{ backgroundColor: "blue" }} type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
