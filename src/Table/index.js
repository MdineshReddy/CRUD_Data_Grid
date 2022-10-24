import React from "react";
import Table from "./Table.";
import { ContextProvider } from "./Context";

const CRUDDataGrid = ({ headers, data, validation }) => {
  return (
    <ContextProvider headers={headers} data={data} validation={validation}>
      <Table />
    </ContextProvider>
  );
};

export default CRUDDataGrid;
