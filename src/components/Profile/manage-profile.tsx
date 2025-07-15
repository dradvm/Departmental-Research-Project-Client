'use client'

import { useSession } from 'next-auth/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ProfileForm() {
    const { data: session, update } = useSession()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [name, setName] = useState('')
    const [biography, setBiography] = useState('')
    const [nameError, setNameError] = useState('')
    const avatarUrl = session?.user?.image || ''

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '')
            // @ts-ignore: custom field
            setBiography(session.user.biography || '')
        }
    }, [session])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (name.trim() === '') {
            setNameError('Name is required')
            return
        } else {
            setNameError('')
        }

        if (!session?.user?.access_token) {
            alert('Session not available or expired.')
            return
        }

        const accessToken = session.user.access_token
        const formData = new FormData()
        if (file) formData.append('file', file)
        formData.append('name', name)
        formData.append('biography', biography)

        try {
            const response = await axios.post(
                'http://localhost:3001/api/users/update-profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            const updatedImage = response.data?.data?.image || session.user?.image

            await update({
                name,
                biography,
                image: updatedImage,
            })

            toast.success('Profile updated!')
            setFile(null)
        } catch (err) {
            console.error('Update error:', err)
            toast.error('Update failed.')
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm"
            >
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`mt-2 block w-full rounded-lg border px-4 py-2 text-gray-900 shadow-sm sm:text-sm ${nameError
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                    }`}
                            />
                            {nameError && (
                                <p className="mt-1 text-sm text-red-600">{nameError}</p>
                            )}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <div className="mt-3 flex items-center gap-4">
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-300"
                                />
                            ) : avatarUrl ? (
                                <img
                                    src={`${avatarUrl}?v=${Date.now()}`}
                                    alt="User Avatar"
                                    className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-300"
                                />
                            ) : (
                                <UserCircleIcon className="h-14 w-14 text-gray-300" />
                            )}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100"
                            >
                                Change
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Biography */}
                    <div>
                        <label htmlFor="biography" className="block text-sm font-medium text-gray-700">
                            Biography
                        </label>
                        <textarea
                            id="biography"
                            name="biography"
                            rows={4}
                            value={biography}
                            onChange={(e) => setBiography(e.target.value)}
                            placeholder="Write a few sentences about yourself..."
                            className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end gap-4">
                    <button
                        type="button"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}
