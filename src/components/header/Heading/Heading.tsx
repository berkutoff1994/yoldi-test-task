import { FC } from 'react';
import Image from 'next/image';
import EnterButton from '@/components/ui/EnterButton/EnterButton';
import Link from 'next/link';
import { IUser } from '@/types';
import styles from './heading.module.scss';

interface IHeading {
  myUser?: IUser | undefined
}

export const Heading:FC<IHeading> = ({myUser}) => {
  return (
    <div className={styles.heading}>
      <div className={styles.container}>
        <div className={styles.heading__content}>
          <div className={styles.heading__logoBlock}>
            <Link href={'/accounts'}>
              <Image alt='logo' src='/logo.png' width={80} height={50} />
            </Link>
            <h2 className={styles.heading__title}>
              Разрабатываем и запускаем сложные веб проекты
            </h2>
          </div>
          {myUser 
            ? 
            <div className={styles.heading__avatarBlock}>
              <span className={styles.avatarBlock__name}>
                {myUser.name}
              </span>
              <Link href={`/account/owner/${myUser.email}`}>
                <div className={styles.avatarBlock__avatar}>
                  {myUser.image
                  ?
                  <Image alt='avatar' src={myUser.image.url} width={50} height={50}/>
                  :
                  <div className={styles.avatar}>{myUser.name[0]}</div>
                  }
                </div>
              </Link>
            </div>
            :
            <Link href='/login'><EnterButton>Войти</EnterButton></Link>
          }
        </div>
      </div>
    </div>
  );
}
