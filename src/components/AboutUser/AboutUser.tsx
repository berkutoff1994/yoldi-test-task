import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import EnterButton from '../ui/EnterButton/EnterButton';
import useSWR from 'swr'
import Image from 'next/image'
import { fetcher } from '@/pages/api/hello';
import { IUser } from '@/types';
import styles from './aboutuser.module.scss';
import axios from 'axios';
import Loader from '../ui/Loader/Loader';

interface IAboutUser {
  myUser: IUser | undefined,
}

export const AboutUser:FC<IAboutUser> = ({myUser}) => {
  const router = useRouter()
  const {data, error} = useSWR<IUser | undefined>(`https://frontend-test-api.yoldi.agency/api/user/${myUser?.slug}`, fetcher)
   
  const onExit = () => {
    localStorage.removeItem('email')
    router.push('/accounts')
  }

  const onRedaction = () => {

  }

  return (
    <>
    {data
      ?
      <div className={styles.aboutUser}>
        <div className={styles.aboutUser__block}>
          <div className={styles.aboutUser__avatar}>
            {data?.image
            ? 
            <div className={styles.avatar}>
              <Image alt='avatar' src={data.image.url} width={100} height={100}/>
              <div />
            </div>
            :
            <div className={styles.avatar}>{data.name ? data.name[0] : null}</div>
            }
          </div>
          <div className={styles.aboutUser__topBLock}>
            <div className={styles.aboutUser__nameBlock}>
              <span className={styles.aboutUser__name}>{data?.name}</span>
              <span className={styles.aboutUser__email}>{data?.email}</span>
            </div>
            {router.pathname.includes('owner')
              ?
              <EnterButton onClick={onRedaction} icon='/redaction.png'>Редактировать</EnterButton>
              :
              null
            }
          </div>
          <p className={styles.aboutUser__descr}>{data?.description}</p>
          {router.pathname.includes('owner')
            ?
            <EnterButton onClick={onExit} icon='/exit.png'>Выйти</EnterButton>
            :
            null
          }
        </div>
      </div>
      :
      null
    }
  </>
  );
}
