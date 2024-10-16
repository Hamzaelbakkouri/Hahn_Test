import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import ConfirmDeleted from '../PopUp/ConfirmDeleted';
import UpdateTicketForm from '../PopUp/UpdateTicketForm';
import TicketType from '../../Types/Ticket';

interface TicketProps {
  ticket: TicketType;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (ticket: TicketType) => Promise<void>;
}

export default function Ticket({ ticket, onDelete, onUpdate }: TicketProps) {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(ticket.id);
    setIsDeletePopupVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="font-normal text-gray-300">{ticket.id}</div>
        </th>
        <td className="px-6 py-4">{ticket.description}</td>
        <td className="px-6 py-4">{new Date(ticket.date).toLocaleDateString()}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${ticket.status.toLocaleLowerCase() === 'open' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div>
            {ticket.status.toUpperCase()}
          </div>
        </td>
        <td className="px-6 py-4 flex justify-start items-center gap-7">
          <PencilIcon width={20} className="text-blue-600 cursor-pointer" onClick={handleUpdateClick} />
          <TrashIcon width={20} className="text-red-600 cursor-pointer" onClick={handleDeleteClick} />
        </td>
      </tr>

      {isDeletePopupVisible && (
        <ConfirmDeleted
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateTicketForm
          ticket={ticket}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}