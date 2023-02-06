import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import EnterButton from '../ui/EnterButton/EnterButton';
import Image from 'next/image'
import { ChangeMyAvatar, ChangeMyProfile } from '@/pages/api/hello';
import { RedactionModal } from '../RedactionModal';
import Loader from '../ui/Loader/Loader';
import { AuthContext, UserContext } from '@/hooks/context';
import styles from './owner.module.scss';

export const Owner = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {token, setToken} = useContext(AuthContext)
  const {data, mutate} = useContext(UserContext)
  const router = useRouter()
  const [modal, setModal] = useState(false)

  const onExit = () => {
    localStorage.clear()
    router.push('/accounts')
    setToken(null)
  }

  const onRedaction = () => {
    setModal(true)
    router.push(`/account/owner/edit=${data?.slug}`)
  }

  const exitRedaction = () => {
    setModal(false)
    router.push(`/account/owner/${data?.slug}`)
  }

  const onImageChange = async(e: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const response = await ChangeMyAvatar(formData, mutate)
    const body = {...data, imageId: response.data.id}
    const res = await ChangeMyProfile(body, mutate, token)
    if (res) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.aboutUser}>
      {loading && <Loader />}
      <div className={styles.aboutUser__block}>
        <div className={styles.aboutUser__avatar}>
          <div className={styles.avatar__background}>
            {data?.image 
            ? 
            <div className={styles.avatar}>
              <Image alt='avatar' src={data.image?.url} width={100} height={100}/>
              <div />
              <input
                className={styles.avatar__download} 
                onChange={onImageChange} 
                type={"file"}
                name='file'
                accept='image/*,.png,.jpg'/>
            </div>
            :
            <div className={styles.avatar + ' ' + styles.avatar__noneImage}>
              {data?.name && data.name[0]}
              <div />
              <input
                className={styles.avatar__download} 
                onChange={onImageChange} 
                type={"file"}
                name='file'
                accept='image/*,.png,.jpg'/>
            </div>
            }
          </div>
        </div>
        <div className={styles.aboutUser__topBLock}>
          <div className={styles.aboutUser__nameBlock}>
            <span className={styles.aboutUser__name}>{data?.name}</span>
            <span className={styles.aboutUser__email}>{data?.email}</span>
          </div>
            <EnterButton padding='7px 22px 7px 25px' onClick={onRedaction} icon='/redaction.png'>Редактировать</EnterButton>
        </div>
        <p className={styles.aboutUser__descr}>{data?.description}</p>
          <EnterButton padding='7px 22px 7px 25px' onClick={onExit} icon='/exit.png'>Выйти</EnterButton>
      </div>
      <RedactionModal 
        onCloseModal={exitRedaction} 
        exitRedaction={exitRedaction} 
        modal={modal}
        setModal={setModal}/>
    </div>
  );
}

