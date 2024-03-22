import React from 'react'
import classes from './index.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.container}>
      <h3>My Profile</h3>
      {children}
    </div>
  );
}
