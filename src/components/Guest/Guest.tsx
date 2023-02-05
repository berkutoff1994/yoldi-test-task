import { FC } from 'react';
import Image from 'next/image'
import { IUser } from '@/types';
import styles from './guest.module.scss';

interface IAboutUser {
  myUser: IUser,
}

export const Guest:FC<IAboutUser> = ({myUser}) => {
  return (
    <div className={styles.aboutUser}>
      <div className={styles.aboutUser__block}>
        <div className={styles.aboutUser__avatar}>
          <div className={styles.avatar__background}>
            {myUser?.image 
            ? 
            <div className={styles.avatar}>
              <Image alt='avatar' src={myUser.image?.url} width={100} height={100}/>
              <div />
            </div>
            :
            <div className={styles.avatar}>
              {myUser?.name && myUser.name[0]}
              <div />
            </div>
            }
          </div>
        </div>
        <div className={styles.aboutUser__topBLock}>
          <div className={styles.aboutUser__nameBlock}>
            <span className={styles.aboutUser__name}>{myUser?.name}</span>
            <span className={styles.aboutUser__email}>{myUser?.email}</span>
          </div>
        </div>
        <p className={styles.aboutUser__descr}>{myUser?.description}</p>
      </div>
    </div>
  );
}
