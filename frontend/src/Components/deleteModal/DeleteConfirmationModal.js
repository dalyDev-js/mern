import React from "react";

export default function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <p className="text-xl font-semibold mb-4">
          Are you sure you want to delete this post?
        </p>
        <p className="text-gray-600 mb-6">
          This will delete this post permanently. You cannot undo this action.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
