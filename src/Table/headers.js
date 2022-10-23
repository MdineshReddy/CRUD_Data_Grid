const headers = [
  {
    accessor: "id",
    header: "Id",
    type: "number",
    formElement: false,
  },
  {
    accessor: "name",
    header: "Name",
    type: "text",
    editable: true,
    sortable: true,
    props: {
      required: true,
      minLength: 5,
    },
    formElement: true,
  },

  {
    accessor: "age",
    header: "Age",
    type: "number",
    sortable: true,
    editable: true,
    props: {
      min: 20,
    },
    formElement: true,
  },
  {
    accessor: "dob",
    header: "DOB",
    type: "date",
    sortable: true,
    editable: true,
    props: {
      //   min: "2022-10-22",
    },
    formElement: true,
  },

  {
    accessor: "role",
    header: "Role",
    type: "select",
    options: ["admin", "lead", "member"],
    sortable: true,
    editable: true,
    formElement: true,
  },
];

export default headers;
