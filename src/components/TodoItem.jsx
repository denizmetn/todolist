import TodoDetails from "./TodoDetails";
import React, { useState } from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function TodoItem({
  title,
  description,
  date,
  row_id,
  onDelete,
  isComplete,
  onToggleNotComplete,
  onToggleComplete,
  onSaveChanges,
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  const handleSave = (updatedDetails) => {
    const updatedTodo = {
      row_id, // row_id'yi ekleyin
      title,
      description: updatedDetails.description,
      date,
    };
    onSaveChanges(updatedTodo); // Güncellenmiş todo'yu gönder
    setOpen(false); // Detayları kapat
  };

  return (
    <div className="flex flex-col bg-white w-full max-w-lg p-4 rounded-lg shadow-md border border-gray-300 my-2">
      <div
        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg  cursor-pointer"
        onClick={toggle}
      >
        <span
          className={`text-lg font-medium ${
            isComplete === "FALSE"
              ? "line-through text-red-400"
              : "text-green-400"
          }`}
        >
          {title}
        </span>
        <div
          className=" flex gap-3 text-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircleOutlined
            className="hover:text-blue-500 hover:scale-110 transition"
            onClick={onToggleComplete}
          />
          <CloseCircleOutlined
            className="hover:text-red-500 hover:scale-110 transition"
            onClick={onToggleNotComplete}
          />
          <DeleteOutlined
            className="hover:text-gray-500 hover:scale-110 transition"
            onClick={onDelete}
          />
        </div>
      </div>
      {open && (
        <TodoDetails
          description={description}
          date={date}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default TodoItem;
