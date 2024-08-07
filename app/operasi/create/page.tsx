"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Create = () => {

    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            router.push('/')
        } else {
            console.error('Failed to create kategori');
        }
        }

        return (
            <div className='max-w-screen-sm mx-auto mt-5'>
                <h1 className='text-white text-2xl font-semibold text-center mb-5'>Add Contact</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-5 w-full'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="input input-bordered block w-full" />
                    </div>
                    <div className='mb-5 w-full'>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" className="input input-bordered block w-full" />
                    </div>
                    <button type='submit' className='btn btn-md text-white btn-primary w-full'>Add</button>
                </form>
            </div>
        )
        }
export default Create
