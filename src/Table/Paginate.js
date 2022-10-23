import React from "react";

const Paginate = ({ setPage, page, rows, pageCount, setPageCount }) => {
  return (
    <div className="paginate">
      <button onClick={() => setPage(1)}>&lt;&lt;</button>
      <button disabled={page === 1} onClick={() => setPage((page) => page - 1)}>
        &lt;
      </button>
      <input
        type="number"
        value={page}
        min="1"
        max={Math.ceil(rows.length / pageCount)}
        onChange={(e) => setPage(e.target.value)}
      />
      / <span>{Math.ceil(rows.length / pageCount)}</span>
      <button
        disabled={page === Math.ceil(rows.length / pageCount)}
        onClick={() => setPage((page) => page + 1)}
      >
        &gt;
      </button>
      <button onClick={() => setPage(Math.ceil(rows.length / pageCount))}>
        &gt;&gt;
      </button>
      <select
        value={pageCount}
        onChange={(e) => {
          setPageCount(Number(e.target.value));
          setPage(1);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default Paginate;
