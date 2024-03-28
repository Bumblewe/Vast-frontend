'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { Message } from '@/components/ui/Message'

type FormData = {
  name: string
  email: string
  password: string
  mobile: string
  role: string
  otp?: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams?.toString() ? `?${searchParams.toString()}` : ''
  const { login, newAccountLogin } = useAuth()
  const router = useRouter()
  const [verifyOtp, setVerifyOtp] = useState<boolean>();
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      data.role = "User";
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sent-otp`, {
        method: 'POST',
        body: JSON.stringify({mobile:data.mobile}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if(response.status == 200){
        setVerifyOtp(true);
      }
    },
    [login, router, searchParams],
  )

  const onSubmitOtp = useCallback(
    async (data: FormData) => {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({ mobile: data.mobile, otp: data.otp, data:data, new_user:true }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
debugger      
      if (!resp.ok) {
        const message = 'Invalid OTP.'
          setError(message)
          return
      }
      if (resp.ok) {
        delete data.otp
        let res = await resp.json()
        let token = res?.token;
        const redirect = searchParams?.get('redirect')
        try {
          sessionStorage.setItem("token",token);
          newAccountLogin(res?.user)
          if (redirect) router.push(redirect as string)
          else router.push(`/`)
        } catch (_) {
          setError('There was an error with the credentials provided. Please try again.')
        }
      }
    },
    [login, router, searchParams],
  )

  return (
    <>
      {verifyOtp ? (
        <form onSubmit={handleSubmit(onSubmitOtp)} className={classes.form}>
          <Input
            name="otp"
            type="number"
            label="One Time Password(OTP)"
            required
            register={register}
            error={errors.otp}
          />
          <Button
            type="submit"
            className={classes.submit}
          >Submit</Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Message error={error} className={classes.message} />
          <Input
            name="email"
            label="Email Address"
            required
            register={register}
            error={errors.email}
            type="email"
          />
          <Input
            name="name"
            label="Full name"
            required
            register={register}
            error={errors.name}
            type="text"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            required
            register={register}
            error={errors.password}
          />
          <Input
            name="mobile"
            type="number"
            label="Mobile No."
            required
            register={register}
            error={errors.mobile}
          />
          <Button
            type="submit"
            className={classes.submit}
          >Sign up</Button>
          <div>
            {'Already have an account? '}
            <Link href={`/login${allParams}`}>Login</Link>
          </div>
        </form>
      )}
    </>
  )
}

export default CreateAccountForm
