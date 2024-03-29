'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import classes from './index.module.scss'
import useCart from '@/hooks/use-cart'
import { Message } from '@/components/ui/Message'
import Button from '@/components/ui/button'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams?.get('order_id')
  const error = searchParams?.get('error')

  // const { clearCart } = useCart()

  // useEffect(() => {
  //   clearCart()
  // }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button>View account</Button>
            <Button> View all orders</Button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Thank you for your order!</h1>
          <p>
            {`Your order has been confirmed. You will receive an email confirmation shortly. Your order ID is ${orderID}.`}
          </p>
          <div className={classes.actions}>
            {/* <Button
              href={`/account/orders/${orderID}`}
              label="View order"
              appearance="primary"
            />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="View all orders"
              appearance="secondary"
            /> */}
          </div>
        </Fragment>
      )}
    </div>
  );
}
