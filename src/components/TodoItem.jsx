import React from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function TodoItem({ title, description }) {
  return (
    <div className=" border border-gray-300 p-4 w-[400px] my-2 rounded-lg shadow-md bg-white">
      <div className=" flex justify-between  mb-2 bg-gray-100 p-2 rounded-lg">
        <span className=" text-lg font-medium">{title}</span>
        <div className=" flex gap-2 text-lg cursor-pointer">
          <CheckCircleOutlined className="hover:text-blue-500 hover:scale-110 transition" />
          <CloseCircleOutlined className="hover:text-red-500 hover:scale-110 transition" />
          <DeleteOutlined className="hover:text-gray-500 hover:scale-110 transition" />
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
}

export default TodoItem;
