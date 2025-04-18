import React, { useState } from "react";

function TodoDetails({ description, date, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const handleSave = () => {
    const updatedTodo = { description: newDescription };
    onSave(updatedTodo);
    setIsEditing(false);
  };

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
      {isEditing ? (
        <>
          <div className="mb-2">
            <label className="text-sm text-gray-600">Tarih:</label>
            {date}
          </div>
          <div className="mb-2">
            <label className="text-sm text-gray-600">Açıklama:</label>
            <textarea
              className="w-full p-1 border rounded mt-1"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kaydet
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Tarih:</strong> {date || "Belirtilmedi."}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Detaylar:</strong> {description || "Açıklama yok."}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Güncelle
          </button>
        </>
      )}
    </div>
  );
}

export default TodoDetails;
