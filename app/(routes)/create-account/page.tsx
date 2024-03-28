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
          </div>
          <CreateAccountForm />
        </div>
      </div>
    </section>
  )
}
