import React from 'react'
import Image from 'next/image'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

export default async function CreateAccount() {

  return (
    <section className={classes.createAccount}>
      <div className={classes.heroImg}>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>

          <div className={classes.formTitle}>
            <h3>Create Account</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p>Please enter details</p>

          <CreateAccountForm />
        </div>
      </div>
    </section>
  )
}
