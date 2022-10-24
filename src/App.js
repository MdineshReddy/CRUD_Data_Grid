import logo from "./logo.svg";
import "./App.css";
import CRUDDataGrid from "./Table";
import headers from "./headers";
import data from "./data";

const validation = (values) => {
  let errors = [];
  if (!values.name) {
    errors.push("Name is Required");
  }

  if (!values.age) {
    errors.push("Age is Required");
  }

  if (!values.dob) {
    errors.push("DOB is required");
  }

  if (!values.role) {
    errors.push("Role is required");
  }

  return errors;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CRUDDataGrid headers={headers} data={data} validation={validation} />
      </header>
    </div>
  );
}

export default App;
