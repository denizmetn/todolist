import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100">
      {/* Sticky AddTodo */}
      <div className="w-full max-w-xl sticky top-0 z-10 bg-gray-100 pt-6 pb-2">
        <AddTodo onAddTodo={addTodo} />
      </div>

      {/* Scrollable Todo List */}
      <div className=" w-full max-w-xl overflow-y-auto px-2 pb-2">
        {todos.map((todo, index) => (
          <TodoItem key={index} title={todo.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
