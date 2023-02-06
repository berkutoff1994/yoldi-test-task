import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'
import useSWR, { useSWRConfig } from 'swr'
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
  const {data} = useSWR([token], ([token]: string[]) => GetMyProfile(token))
  const [userData, setUserData] = useState(data)
  const { mutate } = useSWRConfig()

  const onDownloadCover = async(e: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const response = await ChangeMyAvatar(formData, mutate)
    const value = {
      name: data.name,
      imageId: data.id,
      slug: data.slug,
      coverId: response.data.id,
      description: data.description
    }
    const res = await ChangeMyProfile(value, mutate, token)
    if (res) {
      setLoading(false)
      setUserData(res.data)
    }
  }

  const onRemoveCover = async() => {
    setLoading(true)
    const value = {
      name: data.name,
      imageId: data.id,
      slug: data.slug,
      coverId: null,
      description: data.description
    }
    const res = await ChangeMyProfile(value, mutate, token)
    if (res) {
      setLoading(false)
      setUserData(res.data)
    }
  }

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <>
        {!userData
        ?
        <Loader />
        :
        <>
        <header>
          <SearchLine />
          <Heading token={token} />
        </header>
        <main className={styles.main}>
          {loading && <Loader />}
          <div className={styles.main__back} style={{background: !userData.cover ? '#F3F3F3' : 'none', backgroundImage: userData.cover ? `url(${userData.cover.url})` : 'none'}}>
            {!userData.cover 
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
        }
      </>
    </UserContext.Provider>
  )
}