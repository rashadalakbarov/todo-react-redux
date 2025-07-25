import { Box, Button, TextField, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../redux/todoSlice";

const NewTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const createTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };

  const handleUpdateTodo = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, newText: editText }));
      setIsEditing(null);
      setEditText("");
    }
  };

  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "70px" }}> To Do List</h1>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="standard-basic"
          label="Enter New Item"
          variant="standard"
          size="small"
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ flexGrow: 1 }}
          value={inputValue}
        />

        <Button
          variant="outlined"
          disableElevation
          size="small"
          disabled={!inputValue.trim()}
          startIcon={<AddIcon />}
          sx={{ textTransform: "capitalize", paddingRight: "10px" }}
          onClick={createTodo}
        >
          add item
        </Button>
      </Box>

      <div style={{ width: "100%", marginTop: "80px" }}>
        {todos.map((todo) => (
          <Card
            className="todo"
            key={todo.id}
            sx={{
              padding: 2,
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isEditing === todo.id ? (
              <TextField
                variant="standard"
                size="small"
                onChange={(e) => setEditText(e.target.value)}
                sx={{ flexGrow: 1 }}
                value={editText}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                  flexGrow: 1,
                }}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.text}
              </span>
            )}

            <div>
              <Button
                sx={{ minWidth: "0px" }}
                onClick={() => dispatch(deleteTodo(todo.id))}
                color="error"
              >
                <DeleteIcon />
              </Button>

              {isEditing === todo.id ? (
                <Button sx={{ minWidth: "0px" }}>
                  <CheckIcon
                    onClick={() => {
                      handleUpdateTodo(todo.id);
                    }}
                  />
                </Button>
              ) : (
                <Button sx={{ minWidth: "0px" }}>
                  <EditIcon
                    onClick={() => {
                      setIsEditing(todo.id);
                      setEditText(todo.text);
                    }}
                  />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewTodo;
