import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();
  if (!Array.isArray(data)) {
    // Handle the case when data is not an array
    // For example, you can set a default empty array
    data = [];
  }

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTable;
