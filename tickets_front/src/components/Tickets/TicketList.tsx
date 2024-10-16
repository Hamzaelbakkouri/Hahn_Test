import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '../Bars/Pagination';
import Ticket from './Ticket';
import Modal from '../PopUp/Modal';
import InsertTicketForm from '../PopUp/InsertTicketForm';
import TicketType from "../../Types/Ticket";
import UpdateTicketForm from "../PopUp/UpdateTicketForm";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [ticketToUpdate, setTicketToUpdate] = useState<TicketType | null>(null);


  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize] = useState<number>(5);

  type PaginatedResult = {
    items: TicketType[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };

  useEffect(() => {
    const fetchTickets = async (pageNumber: number) => {
      try {
        const response = await axios.get<PaginatedResult>('https://localhost:5001/api/Tickets', {
          params: {
            pageNumber,
            pageSize,
            sortBy: 'id',
            sortOrder: 'asc'
          }
        });

        setTickets(response.data.items);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets(currentPage);
  }, [currentPage]);


  const handleUpdate = async (updatedTicket: TicketType): Promise<void> => {
    try {
      await axios.put(`https://localhost:5001/api/Tickets/${updatedTicket.id}`, updatedTicket, {
        headers: { "Content-Type": "application/json" },
      });
    
      setTickets(tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket)));
    } catch (error) {
      console.error("Failed to update the ticket", error);
    }
  };  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://localhost:5001/api/Tickets/${id}`);

      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Failed to delete the ticket', error);
    }
  };

  const handleInsertTicket = async (description: string, status: string, date: string) => {
    const newTicket = { description, status, date };

    try {
      const response: any = await axios.post(
        "https://localhost:5001/api/Tickets",
        newTicket,
        {
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => {
        setTickets((prevTickets: any) => [...prevTickets, response.data]);
        setIsModalOpen(false);
      });

    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const openUpdateModal = (ticket: TicketType) => {
    setTicketToUpdate(ticket);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <div className='p-9 bg-[#1d232a]'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#196d91] font-semibold text-white px-4 py-2 rounded-md"
            >
              Insert New Ticket
            </button>

            <div className="relative">
              <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Id</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Loading...</td></tr>
              ) : (
                tickets.map((ticket) => (
                  <Ticket key={ticket.id} ticket={ticket} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InsertTicketForm onInsert={handleInsertTicket} />
      </Modal>

    </>
  );
};

export default TicketList;