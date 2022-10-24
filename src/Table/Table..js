import React, { useEffect, useState } from "react";
import { useGridContext } from "./Context";
import Form from "./Form";
import Row from "./Row";
import Paginate from "./Paginate";

const Table = () => {
  const {
    state: { rows, headers, sort },
    updateRow,
    deleteRow,
    sortBy,
  } = useGridContext();
  const [page, setPage] = useState(1);
  const [form, showForm] = useState(false);

  const [pageCount, setPageCount] = useState(5);

  const handleUpdate = (data) => {
    updateRow(data);
  };

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this record")) deleteRow(id);
  };

  const handleSort = (property, asc) => {
    sortBy(property, asc);
  };

  return (
    <>
      <button className="add-btn" onClick={() => showForm(true)}>
        Add Record
      </button>
      {form && <Form showForm={showForm} />}
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
                          sort.property === headerItem.accessor && sort.asc
                            ? "activeSort"
                            : ""
                        }
                        onClick={() => handleSort(headerItem.accessor, true)}
                      >
                        ↑
                      </span>
                      <span
                        style={{
                          marginLeft: "0.2rem",
                          cursor: "pointer",
                        }}
                        className={
                          sort.property === headerItem.accessor && !sort.asc
                            ? "activeSort"
                            : ""
                        }
                        onClick={() => handleSort(headerItem.accessor, false)}
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
