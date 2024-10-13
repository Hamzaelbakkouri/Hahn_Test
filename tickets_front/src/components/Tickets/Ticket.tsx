import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import TicketType from "../../Types/Ticket";

interface TicketProps {
  ticket: TicketType;
}

export default function Ticket({ ticket }: TicketProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <div className="font-normal text-gray-300">{ticket.id}</div>
      </th>
      <td className="px-6 py-4">{ticket.description}</td>
      <td className="px-6 py-4">{new Date(ticket.date).toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full ${ticket.status === 'Open' ? 'bg-green-500' : 'bg-red-500'} me-2`}></div> 
          {ticket.status}
        </div>
      </td>
      <td className="px-6 py-4 flex justify-start items-center gap-7">
        <PencilIcon width={20} className="text-blue-600 cursor-pointer" />
        <TrashIcon width={20} className="text-red-600 cursor-pointer" />
      </td>
    </tr>
  );
}
