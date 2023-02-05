import { FC, useState } from 'react';
import { ChangeMyProfile } from '@/pages/api/hello';
import { IUser } from '@/types';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import ModalButton from '../ui/ModalButton/ModalButton';
import styles from './redactionmodal.module.scss';
import { useGetToken } from '@/hooks';

interface IRedactionModal {
  modal: boolean,
  setModal: (arg: boolean) => void
  exitRedaction: () => void,
  onCloseModal: () => void,
  aboutUser: IUser
}

export const RedactionModal:FC<IRedactionModal> = (props) => {
  console.log(props.aboutUser)
  const [value, setValue] = useState(
    {
      name: props.aboutUser?.name, 
      slug: props.aboutUser?.slug, 
      description: props.aboutUser?.description
    })
    console.log(value)
  const { mutate } = useSWRConfig()
  const token = useGetToken()
  const router = useRouter()
  
  const valueChange = (e: any) => {
    setValue(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const formHandler = async(e: any) => {
    e.preventDefault()
    const response = await ChangeMyProfile(value, mutate, token)
    props.setModal(false)
    router.push(`/account/owner/${response?.data.email}`)
  }
  return (
    <div id='edit' onClick={props.exitRedaction} className={props.modal ? styles.modal + ' ' + styles.modal__active : styles.modal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal__content}>
        <h2 className={styles.modal__title}>Редактировать профиль</h2>
        <form className={styles.modal__form} onSubmit={formHandler}>
          <label className={styles.form__label}>
            <span>Имя</span>
            <input 
              type="text" 
              name='name'
              className={styles.form__input + ' ' + styles.aboutInput} 
              value={value.name}
              onChange={valueChange} />
          </label>
          <label className={styles.form__label}>
            <span>Адрес профиля</span>
            <div className={styles.form__inputSlugBlock}>
              <div className={styles.form__inputDescr}>example.com/</div>
              <input
                name='slug'
                className={styles.form__input + ' ' + styles.slugInput} 
                value={value.slug}
                onChange={valueChange} />
            </div>
          </label>
          <label className={styles.form__label}>
            <span>Описание</span>
            <textarea 
              className={styles.form__textarea} 
              onChange={valueChange}
              name='description'
              value={value.description || ''}
              />
          </label>
          <div className={styles.form__btns}>
            <ModalButton background='white' onClick={props.onCloseModal} type='button'>Отмена</ModalButton>
            <ModalButton background='black' type='submit'>Сохранить</ModalButton>
          </div>
        </form>
      </div>
    </div>
  );
}
