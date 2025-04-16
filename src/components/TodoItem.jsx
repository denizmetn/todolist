import React from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function TodoItem({
  title,
  description,
  onDelete,
  isNotComplete,
  isComplete,
  onToggleNotComplete,
  onToggleComplete,
}) {
  return (
    <div className="flex flex-col bg-white w-full max-w-lg p-4 rounded-lg shadow-md border border-gray-300 my-2">
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
        <span
          className={`text-lg font-medium ${
            isNotComplete
              ? "line-through text-red-400"
              : isComplete
              ? "text-green-400"
              : ""
          }`}
        >
          {title}
        </span>
        <div className=" flex gap-3 text-lg">
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
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
}

export default TodoItem;
