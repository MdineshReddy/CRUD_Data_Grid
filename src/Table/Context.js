import React, { useContext, useReducer } from "react";

const GridContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INSERT_ROW": {
      const newRows = [...state.rows, { ...action.payload }];
      return {
        ...state,
        rows: newRows,
      };
    }
    case "DELETE_ROW": {
      const newRows = state.rows.filter((row) => row.id !== action.payload);
      return {
        ...state,
        rows: newRows,
      };
    }
    case "UPDATE_ROW": {
      const newRows = state.rows.map((row) => {
        if (row.id === action.payload.id) {
          return action.payload;
        }
        return row;
      });
      return {
        ...state,
        rows: newRows,
      };
    }
    case "SORT_BY": {
      const property = action.payload.property;
      const asc = action.payload.asc;
      const sorted = [...state.rows].sort((a, b) => {
        if (a[property] === null) return 1;
        if (b[property] === null) return -1;
        if (a[property] === null && b[property] === null) return 0;
        return (
          a[property].toString().localeCompare(b[property].toString(), "en", {
            numeric: true,
          }) * (asc ? 1 : -1)
        );
      });
      return {
        ...state,
        sort: {
          property,
          asc,
        },
        rows: sorted,
      };
    }
    default:
      return state;
  }
}

export const ContextProvider = ({ children, headers, data, validation }) => {
  const initalState = {
    headers: headers,
    rows: data,
    validation,
    sort: {
      property: "",
      asc: true,
    },
    filters: [],
  };

  const [state, dispatch] = useReducer(reducer, initalState);

  const insertRow = (payload) => {
    dispatch({
      type: "INSERT_ROW",
      payload,
    });
  };

  const updateRow = (payload) => {
    dispatch({
      type: "UPDATE_ROW",
      payload,
    });
  };

  const deleteRow = (id) => {
    dispatch({
      type: "DELETE_ROW",
      payload: id,
    });
  };

  const sortBy = (property, asc) => {
    dispatch({
      type: "SORT_BY",
      payload: {
        property,
        asc,
      },
    });
  };

  return (
    <GridContext.Provider
      value={{
        state,
        dispatch,
        insertRow,
        updateRow,
        deleteRow,
        sortBy,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  return useContext(GridContext);
};
