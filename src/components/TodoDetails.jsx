import React from "react";

function TodoDetails({ description, date }) {
  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
      <p className="text-sm text-gray-600 mt-2">
        <strong>Tarih:</strong> {date || "Belirtilmedi."}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Detaylar:</strong> {description || "Açıklama yok."}
      </p>
    </div>
  );
}

export default TodoDetails;
