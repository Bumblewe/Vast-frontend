'use client'

import { Product } from '@/types';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

export interface User {
  _id: string;
  name?: string;
  roles?: ('admin' | 'customer')[];
  orders?: string[] | Product[];
  cart?: {
    items?: CartItems;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  hash?: string;
}
export type CartItems = {
  product?: string | Product;
  quantity?: number;
  id?: string;
}[];



type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { email: string }) => Promise<void> // eslint-disable-line no-unused-vars

type Create = (args: { email: string; password: string; passwordConfirm: string }) => Promise<void> // eslint-disable-line no-unused-vars

type Login = (args: { response:any}) => Promise<any> // eslint-disable-line no-unused-vars

type newAccountLogin = (args: { response:any}) => Promise<any> // eslint-disable-line no-unused-vars

type Logout = () => Promise<void>

type AuthContext = {
  user?: User | null
  setUser: (user: User | null) => void // eslint-disable-line no-unused-vars
  logout: Logout
  login: Login
  newAccountLogin: newAccountLogin
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
  status: undefined | 'loggedOut' | 'loggedIn'
}

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>();

  // used to track the single event of logging in or logging out
  // useful for `useEffect` hooks that should only run once
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>()
  const create = useCallback<Create>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
          passwordConfirm: args.passwordConfirm,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus('loggedIn')
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const login = (response:any) => {
    setUser(response?.user)
    sessionStorage.setItem("token",response?.token);
    setStatus('loggedIn')
    return response?.user;
  }

  const newAccountLogin = (response:any) => {
    setUser(response)
    setStatus('loggedIn')
    return response;
  }

  const logout = useCallback<Logout>(async () => {
    try {
        sessionStorage.setItem("token",'');
        setUser(null)
        setStatus('loggedOut')
    } catch (e) {
      throw new Error('An error occurred while attempting to logout.')
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      if (sessionStorage.getItem('token') != '') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          },
        })

        if (res.ok) {
          let data = await res.json()
          let user = data.user
          setUser(user || null)
          setStatus(user ? 'loggedIn' : undefined)
        } else {
          console.log('An error occurred while fetching your account.')
        }
      }
    }
    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const resetPassword = useCallback<ResetPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        newAccountLogin,
        logout,
        create,
        resetPassword,
        forgotPassword,
        status,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context)
