"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa"

interface Contact {
    id: number
    name: string
    phone: string
    createdAt: string
}

export const CreateButton = () => {
    return (
        <div>
            <Link href={'/operasi/create'}>
                <button
                    className="btn btn-md text-white btn-primary"
                >
                    Add
                </button>
            </Link>
        </div>
    )
}

export const DeleteButton = ({ id }: { id: number }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isOpen, setOpen] = useState(false);

    const handleModal = () => { 
        setOpen(!isOpen);
    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                const updatedContacts = contacts.filter((contact) => contact.id !== id);
                setContacts(updatedContacts);
            } else {
                console.error('Failed to delete contact');
            }
        } catch (error) {
            console.error('Error: ' + error);
        }
        setOpen(false);
    }

    return (
        <div>
            <button className="btn btn-sm text-white btn-error" onClick={handleModal}><FaTrash /></button>
            <dialog id="my_modal_2" className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Data</h3>
                    <p className="py-4">Are you sure you want to delete data?</p>
                    <form className="modal-action">
                        <button 
                            onClick={(event) => { event.preventDefault(); handleModal(); }} 
                            className="btn btn-neutral"
                        >
                            Tutup
                        </button>
                        <button 
                            className="btn btn-error text-white" 
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleModal}>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default DeleteButton;