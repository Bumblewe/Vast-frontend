import React from 'react'

import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <div className='pb-4 pt-4'>
      <h5 className={classes.personalInfo}>Personal Information</h5>
      <AccountForm />
    </div>
  )
}
