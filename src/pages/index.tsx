import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Yoldi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <SearchLine />
        <Heading user={true} />
      </header>
      <main className={styles.main}>
        sdfsdfdsfsd
      </main>
    </>
  )
}
