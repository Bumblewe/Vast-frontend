import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { UserInfo } from './UserInfo'

import classes from './index.module.scss'
import { profileNavItems } from '@/components/constants'
import { Gutter } from '@/components/ui/Gutter'
import Container from '@/components/ui/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="nav-padding wrapper">
      <Gutter>
        <h3>My Profile</h3>
        <div className={classes.account}>
          <div className={classes.nav}>
            <UserInfo />

            <ul>
              {profileNavItems.map((item) => (
                <li key={item.title}>
                  <Link href={item.url} className={classes.navItem}>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={24}
                      height={24}
                    />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </Gutter>
    </Container>
  );
}
