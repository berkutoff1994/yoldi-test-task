import Image from 'next/image';
import EnterButton from '@/components/ui/EnterButton/EnterButton';
import Link from 'next/link';
import useSWR from 'swr'
import { GetMyProfile } from '@/pages/api/hello';
import styles from './heading.module.scss';
import { useGetToken } from '@/hooks';

export const Heading = () => {
  const token = useGetToken()
  const {data, error} = useSWR([token], ([token]) => GetMyProfile(token))
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
          {data 
            ? 
            <div className={styles.heading__avatarBlock}>
              <span className={styles.avatarBlock__name}>
                {data.name}
              </span>
              <Link href={`/account/owner/${data.slug}`}>
                <div className={styles.avatarBlock__avatar}>
                  {data.image
                  ?
                  <Image alt='avatar' src={data.image.url} width={50} height={50}/>
                  :
                  <div className={styles.avatar}>{data.name[0]}</div>
                  }
                </div>
              </Link>
            </div>
            :
            <Link href='/login'><EnterButton padding='7px 33px'>Войти</EnterButton></Link>
          }
        </div>
      </div>
    </div>
  );
}

