import React, { useState } from "react";
import { Button } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

function NewTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = () => {
    if (title.trim() && description.trim()) {
      const newTodo = { title, description };
      onAddTodo(newTodo);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl w-full max-w-md mt-8">
      <Input
        className=" p-2 border rounded-lg w-full mb-4"
        placeholder="Başlık Giriniz"
        allowClear
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        rows={4}
        placeholder="Açıklama Giriniz"
        allowClear
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4"
      />
      <Button
        className=" w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 transition"
        onClick={handleCreateTodo}
      >
        EKLE
      </Button>
    </div>
  );
}

export default NewTodo;
