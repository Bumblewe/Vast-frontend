"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserInfo } from './UserInfo'
import classes from './index.module.scss'
import { profileNavItems } from '@/components/constants'
import { Gutter } from '@/components/ui/Gutter'
import Container from '@/components/ui/container'
import { useAuth } from '@/app/_providers/Auth'
import { useRouter } from 'next/navigation'
import Loading from '../loading'

export default function Layout({ children }: { children: React.ReactNode }) {
  const {logout, status} = useAuth();
  const router = useRouter();
  useEffect(()=>{
    if(status!="loggedIn") router.push("/")
  },[])
  return (<>
    {status== "loggedIn"?<Container className="nav-padding wrapper">
      <Gutter className='py-2'>
        <h3 className='ps-6'>My Profile</h3>
        <div className={classes.account}>
          <div className={classes.nav}>
            <UserInfo />
            <ul>
              {profileNavItems.map((item) => (
                <li key={item.title}>
                  <Link href={item?.url || ''} onClick={()=>{item.title=="Logout" && logout()}} className={classes.navItem}>
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
    </Container>:<Loading />}</>
  );
}
