import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'
import { useRouter } from 'next/router'
import { fetcher } from '../../api/hello'
import useSWR from 'swr'
import Loader from '@/components/ui/Loader/Loader'
import { Guest } from '@/components/Guest'
import styles from './guestpage.module.scss'

export default function AboutGuest() {
  const router = useRouter()
  const id = String(router.query.id).substring(0, String(router.query.id).length - 1)
  const {data} = useSWR(`https://frontend-test-api.yoldi.agency/api/user/${id}`, fetcher)
  return (
    <>
      {!data
        ?
        <Loader />
        :
        <>
        <header>
          <SearchLine />
          <Heading/>
        </header>
        <main className={styles.main}>
          <div className={styles.main__back} style={{background: !data.cover ? '#F3F3F3' : `url(${data.cover.url})`}}/>
          <div className={styles.container}>
            <Guest myUser={data} />
          </div>
        </main>
      </>
      }
    </>
  )
}