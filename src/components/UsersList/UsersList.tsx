import { IUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './userslist.module.scss';

interface IUserList {
  myUser?: IUser | undefined,
  userList: IUser[] | undefined
}

export const UsersList:FC<IUserList> = ({myUser, userList}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.userList}>
        <h2 className={styles.userList__title}> 
          Список аккаунтов
        </h2>
        <div>
          {userList ? userList.map(user => 
            <Link 
              className={styles.userList__item} 
              key={user.email} 
              href={`/account/${myUser?.email == user.email ? 'owner' : 'guest'}/${user.email}}`}>
              <div className={styles.avatarBlock}>
                {user.image
                  ?
                  <Image className={styles.avatar} alt='avatar' src={user.image.url} width={50} height={50} />
                  :
                  <div className={styles.avatar + ' ' + styles.avatar__none}>{user.name[0]}</div>
                }
              </div>
              <div className={styles.userAbout}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            </Link>
            )
            :
            null
          }
        </div>
      </div>
    </div>
  );
}
