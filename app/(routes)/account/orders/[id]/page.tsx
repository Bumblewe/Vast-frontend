import React, { Fragment } from 'react'
import classes from './index.module.scss'

export default async function Order() {
  
  return (
    <div>
      <h5>
        {`Order`}
        <span className={classes.id}>{`9`}</span>
      </h5>
      <div className={classes.itemMeta}>
        <p>{`ID: 9`}</p>
        <p>{`Payment Intent: lgh`}</p>
        <p>{`Ordered On: jhv`}</p>
        <p className={classes.total}>
          {'Total: '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'usd',
          }).format(7865 / 100)}
        </p>
      </div>

    </div>
  )
}
