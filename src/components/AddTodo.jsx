import React, { useState } from "react";
import "antd/dist/reset.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

import NewTodo from "./NewTodo";

function AddTodo({ onAddTodo, onSearch }) {
  const [newTodo, setNewTodo] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleNewTodo = () => {
    setNewTodo(!newTodo);
  };
  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  return (
    <div className=" flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-3xl font-semibold mb-4">To-Do List</h1>
      <div className="flex gap-3 items-center mb-4 w-full">
        <input
          type="text"
          className=" p-2 border rounded-lg flex-grow"
          placeholder="Görev Ara"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          className=" w-20"
          icon={<SearchOutlined />}
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button className="w-20" onClick={handleNewTodo}>
          Yeni Ekle
        </Button>
      </div>

      {newTodo && <NewTodo onAddTodo={onAddTodo} />}
    </div>
  );
}

export default AddTodo;
