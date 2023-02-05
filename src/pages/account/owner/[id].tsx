import { SearchLine } from '@/components/header/SearchLine'
import { Heading } from '@/components/header/Heading'
import useSWR, { useSWRConfig } from 'swr'
import { ChangeMyAvatar, ChangeMyProfile, GetMyProfile } from '../../api/hello'
import { Owner } from '@/components/Owner'
import Loader from '@/components/ui/Loader/Loader'
import DownloadButton from '@/components/ui/DownloadButton/DownloadButton'
import { useContext, useState } from 'react'
import { AuthContext } from '@/hooks/authContext'
import styles from './ownerpage.module.scss'

export default function AboutOwner() {
  const [loading, setLoading] = useState<boolean>(false)
  const token = useContext(AuthContext);
  const {data, error} = useSWR([token], ([token]: string[]) => GetMyProfile(token))
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
    }
  }

  return (
    <>
      {!data
      ?
      <Loader />
      :
      <>
      <header>
        <SearchLine />
        <Heading />
      </header>
      <main className={styles.main}>
        {loading && <Loader />}
        <div className={styles.main__back} style={{background: !data.cover ? '#F3F3F3' : 'none', backgroundImage: data.cover ? `url(${data.cover.url})` : 'none'}}>
          {!data.cover 
            ? 
            <div className={styles.buttonWrapper}>
              <DownloadButton downloader={true} handler={onDownloadCover} link='/download.png' width={14} height={19}>
                Загрузить
              </DownloadButton> 
            </div>
            :
            <div className={styles.buttonWrapper}>
              <DownloadButton downloader={false} handler={onRemoveCover} link='/basket.png' width={17} height={19}>
                Удалить
              </DownloadButton>
            </div>
            }
        </div>
        <div className={styles.container}>
          <Owner myUser={data} />
        </div>
      </main>
      </>
      }
    </>
  )
}