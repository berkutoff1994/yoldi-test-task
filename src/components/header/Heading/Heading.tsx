import { FC } from 'react';
import Image from 'next/image';
import styles from './heading.module.scss';
import EnterButton from '@/components/ui/EnterButton/EnterButton';

interface IHeadingProps {
  user: boolean,
}

export const Heading:FC<IHeadingProps> = ({user}) => {
  return (
    <div className={styles.heading}>
      <div className={styles.container}>
        <div className={styles.heading__content}>
          <div className={styles.heading__logoBlock}>
            <Image alt='logo' src='/logo.png' width={80} height={50}></Image>
            <h2 className={styles.heading__title}>
              Разрабатываем и запускаем сложные веб проекты
            </h2>
          </div>
          <EnterButton>Войти</EnterButton>
        </div>
      </div>
    </div>
  );
}
