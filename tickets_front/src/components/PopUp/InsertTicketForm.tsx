import React, { useState } from "react";

type InsertTicketFormProps = {
  onInsert: (description: string, status: string, date: string) => Promise<void>;
};

const InsertTicketForm: React.FC<InsertTicketFormProps> = ({ onInsert }) => {
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("open");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const localDate = new Date(date);
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

    onInsert(description, status, utcDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-stone-300">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-stone-300">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-stone-300">
          Date
        </label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-[#196d91] font-semibold text-white rounded-md"
        >
          Save Ticket
        </button>
      </div>
    </form>
  );
};

export default InsertTicketForm;
