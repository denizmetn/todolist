import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searching, setSearching] = useState("");

  const getTodo = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(
      "https://v1.nocodeapi.com/denizmetin/google_sheets/XHBDwKGRXGTIiOBU?tabId=Tablo1",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const fetchGet = async () => {
      const result = await getTodo();
      setTodos(result.data);
    };

    fetchGet();
  }, []);

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      isNotComplete: false,
      isComplete: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([
        [newTodo.title, newTodo.description, newTodo.date, "TRUE"],
      ]),
    };

    fetch(
      "https://v1.nocodeapi.com/denizmetin/google_sheets/XHBDwKGRXGTIiOBU?tabId=Tablo1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log("Google Sheets'e eklendi:", result))
      .catch((error) => console.log("Google Sheets hatası:", error));
  };

  const handleSearch = (searchtext, list = todos) => {
    setSearching(searchtext);
    const filtered = list.filter((todo) =>
      todo.title.toLowerCase().includes(searchtext.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const deleteTodo = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    const row_id = indexToDelete + 2;
    console.log(todos[indexToDelete].row_id);
    setTodos(updatedTodos);
    if (searching.trim()) {
      handleSearch(searching, updatedTodos);
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "delete",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://v1.nocodeapi.com/denizmetin/google_sheets/XHBDwKGRXGTIiOBU?tabId=Tablo1&row_id=" +
        { row_id },
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const toggleNotComplete = (indexToToggle) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return { ...todo, State: "FALSE" };
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
        return { ...todo, State: "TRUE" };
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
      <div className="w-full max-w-xl sticky top-0 z-10 bg-gray-100 pt-6 pb-2">
        <AddTodo onAddTodo={addTodo} onSearch={handleSearch} />
      </div>

      <div className=" w-full max-w-xl overflow-y-auto px-2 pb-2">
        {todosToDisplay.map((todo, index) => (
          <TodoItem
            key={index}
            title={todo.Title}
            description={todo.Description}
            date={todo.Date}
            onDelete={() => deleteTodo(index)}
            onToggleNotComplete={() => toggleNotComplete(index)}
            isComplete={todo.State}
            onToggleComplete={() => toggleComplete(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
