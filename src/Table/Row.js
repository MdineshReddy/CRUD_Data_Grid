import React, { useState, useEffect } from "react";
import headers from "./headers";

const Row = ({ row, handleUpdate, handleDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const columns = headers.map((header) => header.accessor);
  const defaultData = {};
  columns.forEach((column) => {
    defaultData[column] = row[column];
  });
  const [rowData, setRowData] = useState(defaultData);

  useEffect(() => {
    setRowData(defaultData);
  }, [editMode]);

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
            handleUpdate(rowData);
            setEditMode(false);
          }}
        >
          ✓
        </span>
        <span
          className="icon red"
          onClick={() => {
            setEditMode(false);
          }}
        >
          ×
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
