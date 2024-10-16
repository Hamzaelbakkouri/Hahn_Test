import React, { useState } from "react";
import TicketType from "../../Types/Ticket";

interface UpdateTicketFormProps {
  ticket: TicketType;
  onClose: () => void;
  onUpdate: (ticket: TicketType) => Promise<void>;
}

const UpdateTicketForm: React.FC<UpdateTicketFormProps> = ({ ticket, onClose, onUpdate }) => {
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);
  const [date, setDate] = useState(ticket.date);
  const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);  
    const updatedTicket = { ...ticket, description, status, date };

    try {
      await onUpdate(updatedTicket);  
      onClose();  
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setIsSubmitting(false);  
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-[#1d232a] rounded-lg shadow-lg p-6 w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-stone-300 font-semibold">Update Ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded"
              required
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white">Date</label>
            <input
              type="date"
              value={new Date(date).toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}  {/* Add loading indicator */}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicketForm;
