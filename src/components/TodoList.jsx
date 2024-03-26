import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';



export default function TodoList() {

  const [columns] = useState([
    { field: "desc", sortable: true, filter: true },
    {
      field: "priority", sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
    },
    { field: "date", sortable: true, filter: true }
  ]);

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ desc: "", priority: "", date: "" });
  const gridRef = useRef();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ desc: "", priority: "", date: "" });
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  };

  const handleChangeDate = (date) => {
    setTodo({ ...todo, date });
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs">
        <Tab label="Home" />
        <Tab label="Todos" />
      </Tabs>
      <div role="tabpanel" hidden={tabValue !== 0}>
        <Typography variant="h3" align="center">Teretulemast ToDoListalle!</Typography>
      </div>
      <div role="tabpanel" hidden={tabValue !== 1}>
        <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
          <TextField
            placeholder="Description"
            onChange={e => setTodo({ ...todo, desc: e.target.value })}
            value={todo.desc} />
          <TextField
            placeholder="Priority"
            onChange={e => setTodo({ ...todo, priority: e.target.value })}
            value={todo.priority} />
          <DatePicker
            label="Date"
            onChange={handleChangeDate}
            value={todo.date || null}
            renderInput={(params) => <TextField {...params} />} />
          <Button variant="contained" onClick={addTodo}>Add</Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        </Stack>
        <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
          <AgGridReact
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowData={todos}
            columnDefs={columns}
            rowSelection="single"
          />
        </div>
      </div>
    </>
  );
}  