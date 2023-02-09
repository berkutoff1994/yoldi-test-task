import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'
import useSWR from 'swr'
import { ChangeMyAvatar, ChangeMyProfile, GetMyProfile } from '../../api/hello'
import { Owner } from '@/components/Owner'
import Loader from '@/components/ui/Loader/Loader'
import DownloadButton from '@/components/ui/DownloadButton/DownloadButton'
import { useContext, useState } from 'react'
import RemoveButton from '@/components/ui/DownloadButton/RemoveButton'
import { AuthContext, UserContext } from '@/hooks/context'
import styles from './ownerpage.module.scss'

export default function AboutOwner() {
  const [loading, setLoading] = useState<boolean>(false)
  const {token} = useContext(AuthContext)
  const {data, mutate} = useSWR([token], ([token]: string[]) => GetMyProfile(token))

  const onDownloadCover = async(e: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const response = await ChangeMyAvatar(formData, mutate)
    const value = {...data, coverId: response.data.id}
    const res = await ChangeMyProfile(value, mutate, token)
    if (res) {
      setLoading(false)
    }
  }

  const onRemoveCover = async() => {
    setLoading(true)
    const value = {...data, coverId: null}
    const res = await ChangeMyProfile(value, mutate, token)
    if (res) {
      setLoading(false)
    }
  }

  if(!data) {
    return (
      <Loader />
    )
  }
  return (
    <UserContext.Provider value={{data, mutate}}>
      <>
        <header>
          <Heading token={token} />
        </header>
        <main className={styles.main}>
          {loading && <Loader />}
          <div className={styles.main__back} style={{background: !data.cover ? '#F3F3F3' : '', backgroundImage: data.cover ? `url(${data.cover.url})` : 'none'}}>
            {!data.cover 
              ? 
              <div className={styles.buttonWrapper}>
                <DownloadButton handler={onDownloadCover} link='/download.png' width={14} height={19}>
                  Загрузить
                </DownloadButton> 
              </div>
              :
              <div className={styles.buttonWrapper}>
                <RemoveButton handler={onRemoveCover} link='/basket.png' width={17} height={19}>
                  Удалить
                </RemoveButton>
              </div>
              }
          </div>
          <div className={styles.container}>
            <Owner />
          </div>
        </main>
        </>
    </UserContext.Provider>
  )
}