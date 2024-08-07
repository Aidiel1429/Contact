'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const Edit = () => {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        console.log(`Fetching contact with id: ${id}`);
        const response = await fetch(`/api/contacts/${id}`);
        if (response.ok) {
          const contact = await response.json();
          console.log('Contact fetched:', contact);
          setName(contact.name || '');
          setPhone(contact.phone || '');
        } else {
          console.error('Failed to fetch contact');
        }
      } catch (error) {
        console.error('Error: ' + error);
      }
    };

    if (id) {
      fetchContact();
    } else {
      console.log('No ID provided');
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: any = {};
    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error: ' + error);
    }
  };

  return (
    <div className='max-w-screen-sm mx-auto mt-5'>
      <h1 className='text-white text-2xl font-semibold text-center mb-5'>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-5 w-full'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered block w-full"
          />
        </div>
        <div className='mb-5 w-full'>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered block w-full"
          />
        </div>
        <button type='submit' className='btn btn-md text-white btn-primary w-full'>Edit</button>
      </form>
    </div>
  );
};

export default Edit;
