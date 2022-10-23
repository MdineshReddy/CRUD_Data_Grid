import React, { useEffect, useState } from "react";
import headers from "./headers";
import data from "./data";
import Form from "./Form";
import Row from "./Row";
import Paginate from "./Paginate";

const Table = () => {
  const [rows, setRows] = useState(data);
  const [sortBy, setSortBy] = useState({ property: "", asc: false });
  const [page, setPage] = useState(1);
  const [form, showForm] = useState(false);

  const [pageCount, setPageCount] = useState(5);

  const handleUpdate = (data) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === data.id) {
          return data;
        }
        return row;
      })
    );
  };

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this record"))
      setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSort = (property, type, asc) => {
    setSortBy({ property, asc });
    const sorted = [...rows].sort((a, b) => {
      if (a[property] === null) return 1;
      if (b[property] === null) return -1;
      if (a[property] === null && b[property] === null) return 0;
      return (
        a[property].toString().localeCompare(b[property].toString(), "en", {
          numeric: true,
        }) * (asc ? 1 : -1)
      );
    });
    setRows(sorted);
  };

  return (
    <>
      <button className="add-btn" onClick={() => showForm(true)}>
        Add Record
      </button>
      {form && <Form setRows={setRows} showForm={showForm} />}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              {headers.map((headerItem) => (
                <th key={headerItem.header}>
                  {headerItem.header}
                  {headerItem.sortable && (
                    <>
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          cursor: "pointer",
                        }}
                        className={
                          sortBy.property === headerItem.accessor && sortBy.asc
                            ? "activeSort"
                            : ""
                        }
                        onClick={() =>
                          handleSort(headerItem.accessor, headerItem.type, true)
                        }
                      >
                        ↑
                      </span>
                      <span
                        style={{
                          marginLeft: "0.2rem",
                          cursor: "pointer",
                        }}
                        className={
                          sortBy.property === headerItem.accessor && !sortBy.asc
                            ? "activeSort"
                            : ""
                        }
                        onClick={() =>
                          handleSort(
                            headerItem.accessor,
                            headerItem.type,
                            false
                          )
                        }
                      >
                        ↓
                      </span>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice((page - 1) * pageCount, (page - 1) * pageCount + pageCount)
              .map((row, index) => (
                <Row
                  key={row.id}
                  row={row}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
        </table>
      </div>
      {rows.length > 0 ? (
        <Paginate
          page={page}
          pageCount={pageCount}
          rows={rows}
          setPage={setPage}
          setPageCount={setPageCount}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No Records!</p>
      )}
    </>
  );
};

export default Table;
