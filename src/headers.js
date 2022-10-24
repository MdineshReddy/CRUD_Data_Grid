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
      required: true,
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
      required: true,
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
    props: {
      required: true,
    },
    formElement: true,
  },
];

export default headers;
