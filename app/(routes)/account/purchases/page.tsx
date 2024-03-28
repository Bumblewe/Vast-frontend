import React from 'react'
import Link from 'next/link'

// import { Media } from '../../../_components/Media'
// import { Price } from '../../../_components/Price'
// import { formatDateTime } from '../../../_utilities/formatDateTime'
// import { getMeUser } from '../../../_utilities/getMeUser'

import classes from './index.module.scss'

export default async function Purchases() {

  return (
    <div>
      <h5>Purchased Products</h5>
      <div>
        {0 || 0 > 0 ? (
          <ul className={classes.purchases}>
            {[].map((purchase, index) => {
              return (
                <li key={index} className={classes.purchase}>
                  {typeof purchase === 'string' ? (
                    <p>{purchase} Test</p>
                  ) : (
                    <Link href={`/products/}`} className={classes.item}>
                      <div className={classes.mediaWrapper}>
                        {true && (
                          <div className={classes.placeholder}>No image</div>
                        )}
                      
                      </div>
                      <div className={classes.itemDetails}>
                        <h6>{"Purchase"}</h6>
                       
                      </div>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={classes.noPurchases}>You have no purchases.</div>
        )}
      </div>
    </div>
  )
}
