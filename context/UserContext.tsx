'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

type User = {
    userId: number
    name: string
    email: string
    image?: string
    biography?: string
    role: string
    access_token: string
} | null

type UserContextType = {
    user: User
    setUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()
    const [user, setUser] = useState<User>(null)

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUser({
                userId: (session.user as any).userId ?? '',
                name: session.user.name ?? '',
                email: session.user.email ?? '',
                image: session.user.image,
                biography: (session.user as any).biography ?? '',
                role: (session.user as any).role ?? '',
                access_token: (session.user as any).access_token ?? ''
            })
        }
    }, [session, status])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
