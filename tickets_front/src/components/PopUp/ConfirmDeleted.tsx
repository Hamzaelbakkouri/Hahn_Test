import React from 'react';

interface ConfirmDeletedProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleted = ({ onConfirm, onCancel }: ConfirmDeletedProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1d232a] p-4 rounded shadow-lg">
        <p>Are you sure you want to delete this ticket?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-[#196d91] text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleted;
