import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// import { Gutter } from '../../_components/Gutter'
// import { getMeUser } from '../../_utilities/getMeUser'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  // await getMeUser({
  //   validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  // })

  return (
    <section className={classes.login}>
      <div className={classes.heroImg}>
     
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>

          <div className={classes.formTitle}>
            <h3>Welcome</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Please login here</p>

          <LoginForm />
        </div>
      </div>
    </section>
  )
}

