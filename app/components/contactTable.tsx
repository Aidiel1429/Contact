"use client"
import { useEffect, useState } from "react"
import { DeleteButton } from "./button"
import { FaEdit } from "react-icons/fa"
import { useRouter } from "next/navigation"

interface Contact {
    id: number
    name: string
    phone: string
    createdAt: string
}

const ContactTable = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalContacts, setTotalContacts] = useState(0);
  
    useEffect(() => {
      fetch(`/api/contacts?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error('Error fetching contacts:', data.error);
            return;
          }
          setContacts(data.contacts);
          setTotalContacts(data.totalContacts);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }, [page, limit]);

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(date);
    };

    const router = useRouter()

    const handleEdit = (id: number) => {
        router.push(`/operasi/update/${id}`)
    }

    const totalPages = Math.ceil(totalContacts / limit);

    return (
        <>
            <table className="table text-left">
                <thead className='text-left text-sm text-slate-700 bg-gray-300'>
                    <tr>
                        <th className='py-3 px-6'>No</th>
                        <th className='py-3 px-6'>Name</th>
                        <th className='py-3 px-6'>Phone</th>
                        <th className='py-3 px-6'>Created At</th>
                        <th className='py-3 px-6 text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                        <th className='py-3 px-6'>{index + 1}</th>
                        <td className='py-3 px-6'>{contact.name}</td>
                        <td className='py-3 px-6'>{contact.phone}</td>
                        <td className='py-3 px-6'>{formatDateTime(contact.createdAt)}</td>
                        <td className='py-3 px-6 flex justify-center gap-1'>
                            <button className="btn btn-sm btn-warning text-white" onClick={() => handleEdit(contact.id)}>
                                <FaEdit />
                            </button>
                            <DeleteButton id={contact.id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <div className="btn-group">
                    <button
                    className="btn"
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                    >
                    «
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${index + 1 === page ? 'btn-active' : ''}`}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                    ))}
                    <button
                    className="btn"
                    onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
                    disabled={page === totalPages}
                    >
                    »
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactTable
