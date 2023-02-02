import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from './footer.module.scss';

export const Footer = () => {
  const router = useRouter()

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        {router.pathname.includes('register')
          ?
          <div className={styles.footer__contentBlock}>
            <span className={styles.footer__question}>
              Уже есть аккаунт?
            </span>
            <Link href='/login' className={styles.footer__link}> Войти</Link>
          </div>
          :
          <div className={styles.footer__contentBlock}>
            <span className={styles.footer__question}>
              Еще нет аккаунта?
            </span>
            <Link href='/register' className={styles.footer__link}> Зарегистрироваться</Link>
          </div>
        }
      </div>
    </footer>
  );
}
