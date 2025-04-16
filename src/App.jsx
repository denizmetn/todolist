import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searching, setSearching] = useState("");

  const addTodo = (todo) => {
    const updatedTodos = [
      ...todos,
      { ...todo, isNotComplete: false, isComplete: false },
    ];
    setTodos(updatedTodos);
    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }
  };

  const handleSearch = (query, list = todos) => {
    setSearching(query);
    const filtered = list.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const deleteTodo = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }
  };

  const toggleNotComplete = (indexToToggle) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return { ...todo, isNotComplete: !todo.isNotComplete };
      }
      return todo;
    });

    setTodos(updatedTodos);

    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }
  };
  const toggleComplete = (indexToToggle) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });

    setTodos(updatedTodos);

    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }
  };

  const todosToDisplay = searching.trim() ? filteredTodos : todos;

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100">
      {/* Sticky AddTodo */}
      <div className="w-full max-w-xl sticky top-0 z-10 bg-gray-100 pt-6 pb-2">
        <AddTodo onAddTodo={addTodo} onSearch={handleSearch} />
      </div>

      {/* Scrollable Todo List */}
      <div className=" w-full max-w-xl overflow-y-auto px-2 pb-2">
        {todosToDisplay.map((todo, index) => (
          <TodoItem
            key={index}
            title={todo.title}
            onDelete={() => deleteTodo(index)}
            onToggleNotComplete={() => toggleNotComplete(index)}
            isNotComplete={todo.isNotComplete}
            isComplete={todo.isComplete}
            onToggleComplete={() => toggleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
