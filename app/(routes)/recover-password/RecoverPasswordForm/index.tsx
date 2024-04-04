'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import classes from './index.module.scss'
import { Message } from '@/components/ui/Message'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/button'

type FormData = {
  mobile: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <>
      {!success && (
        <>
          <p>Enter your registered mobile no. We will send you a code to reset your password.</p>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Message error={error} className={classes.message} />
            <Input
              name="mobile"
              label="Mobile No."
              required
              register={register}
              error={errors.mobile}
              type="number"
            />
            <Button
              type="submit"
              className={classes.submit}
            >Recover password</Button>
          </form>
        </>
      )}
      {success && (
        <>
          <h1>Request submitted</h1>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </>
      )}
    </>
  )
}
