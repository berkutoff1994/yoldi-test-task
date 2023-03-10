import Head from 'next/head'
import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'
import { Footer } from '@/components/Footer'
import { UsersList } from '@/components/UsersList'
import { IUser } from '@/types'
import useSWR from 'swr'
import { fetcher } from './api/hello'
import { useGetEmail, useGetToken } from '@/hooks'
import Loader from '@/components/ui/Loader/Loader'
import styles from '@/styles/accounts.module.scss'
import { useContext } from 'react'
import { AuthContext } from '@/hooks/context'

export default function Accounts() {
  const {data, error} = useSWR<IUser[] | undefined>('https://frontend-test-api.yoldi.agency/api/user', fetcher)
  const email = useGetEmail()
  const token = useGetToken()
  const {setToken} = useContext(AuthContext)
  setToken(token)
  const myUser: IUser | undefined = data?.find((user) => user.email === email)
  if(!data) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <Head>
        <title>Yoldi accounts list</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <header>
          <Heading token={token} />
        </header>
        <main className={styles.main}>
          <div className={styles.container}>
            <UsersList myUser={myUser} userList={data} />
          </div>
        </main>
        {!token && <Footer />} 
      </div>
    </>
  )
}