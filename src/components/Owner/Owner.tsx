import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import EnterButton from '../ui/EnterButton/EnterButton';
import { useSWRConfig } from 'swr'
import Image from 'next/image'
import { ChangeMyAvatar, ChangeMyProfile} from '@/pages/api/hello';
import { IUser } from '@/types';
import { RedactionModal } from '../RedactionModal';
import styles from './owner.module.scss';
import { useGetToken } from '@/hooks';
import Loader from '../ui/Loader/Loader';

interface IAboutUser {
  myUser: IUser,
}

export const Owner:FC<IAboutUser> = ({myUser}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const token = useGetToken()
  const router = useRouter()
  const { mutate } = useSWRConfig()

  // запрос картинки /api/image/{id}
  // const {data, error} = useSWR([token, imageId], ([token, imageId]) => GetMyAvatar(token, imageId))
  const [modal, setModal] = useState(false)

  const onExit = () => {
    localStorage.clear()
    router.push('/accounts')
  }

  const onRedaction = () => {
    setModal(true)
    router.push(`/account/owner/edit=${myUser?.email}`)
  }
  const exitRedaction = () => {
    setModal(false)
    router.push(`/account/owner/${myUser?.email}`)
  }

  const onImageChange = async(e: any) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const response = await ChangeMyAvatar(formData, mutate)
    const value = {
      name: myUser?.name,
      imageId: response.data.id,
      slug: myUser?.slug,
      coverId: myUser?.cover?.id,
      description: myUser?.description
    }
    const res = await ChangeMyProfile(value, mutate, token)
    if (res) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.aboutUser}>
      {loading ? <Loader /> : null}
      <div className={styles.aboutUser__block}>
        <div className={styles.aboutUser__avatar}>
          <div className={styles.avatar__background}>
            {myUser?.image 
            ? 
            <div className={styles.avatar}>
              <Image alt='avatar' src={myUser.image?.url} width={100} height={100}/>
              <div />
              <input
                className={styles.avatar__download} 
                onChange={onImageChange} 
                type={"file"}
                name='file'
                accept='image/*,.png,.jpg'/>
            </div>
            :
            <div className={styles.avatar}>
              {myUser?.name ? myUser.name[0] : null}
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
            <span className={styles.aboutUser__name}>{myUser?.name}</span>
            <span className={styles.aboutUser__email}>{myUser?.email}</span>
          </div>
            <EnterButton padding='7px 22px 7px 25px' onClick={onRedaction} icon='/redaction.png'>Редактировать</EnterButton>
        </div>
        <p className={styles.aboutUser__descr}>{myUser?.description}</p>
          <EnterButton padding='7px 22px 7px 25px' onClick={onExit} icon='/exit.png'>Выйти</EnterButton>
      </div>
      <RedactionModal 
        aboutUser={myUser} 
        onCloseModal={exitRedaction} 
        exitRedaction={exitRedaction} 
        modal={modal}
        setModal={setModal}/>
    </div>
  );
}
