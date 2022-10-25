import React, { useState } from "react";
import headers from "../headers";
import { useGridContext } from "./Context";

const Row = ({ row, handleUpdate, handleDelete }) => {
  const {
    state: { validation },
  } = useGridContext();

  const [editMode, setEditMode] = useState(false);
  const columns = headers.map((header) => header.accessor);
  const defaultData = {};
  columns.forEach((column) => {
    defaultData[column] = row[column];
  });
  const [rowData, setRowData] = useState(defaultData);

  if (!editMode) {
    return (
      <tr>
        <td>
          <span
            className="icon blue"
            onClick={() => {
              setEditMode(true);
            }}
          >
            ✎
          </span>
          <span
            className="icon red"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            🗑
          </span>
        </td>
        {headers.map((header, index) => {
          return <td key={index}>{row[header.accessor]}</td>;
        })}
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <span
          className="icon green"
          onClick={() => {
            let errors = validation(rowData);
            console.log(errors);
            if (errors.length === 0) {
              handleUpdate(rowData);
              setEditMode(false);
            } else {
              let errMessage = errors.reduce((p, c) => (p += "\n" + c), "");
              alert(errMessage);
            }
          }}
        >
          ✓
        </span>
        <span
          className="icon red"
          onClick={() => {
            setRowData(defaultData);
            setEditMode(false);
          }}
        >
          X
        </span>
      </td>
      {headers.map((header, index) => {
        if (header.editable) {
          return (
            <td key={index}>
              {header.type === "select" ? (
                <select
                  value={rowData[header.accessor]}
                  onChange={(e) =>
                    setRowData({
                      ...rowData,
                      [header.accessor]: e.target.value,
                    })
                  }
                >
                  {header.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={header.type}
                  value={rowData[header.accessor]}
                  onChange={(e) =>
                    setRowData({
                      ...rowData,
                      [header.accessor]: e.target.value,
                    })
                  }
                  {...header.props}
                ></input>
              )}
            </td>
          );
        }
        return <td key={index}>{row[header.accessor]}</td>;
      })}
    </tr>
  );
};

export default Row;
