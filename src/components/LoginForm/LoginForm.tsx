import { Login } from '@/pages/api/hello';
import { ValidationEmail, ValidationPassword } from '@/utils/validation';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import FormButton from '../ui/FormButton/FormButton';
import MyInput from '../ui/MyInput/MyInput';
import styles from './loginform.module.scss';

interface ILoginForm {
  setLoading: (arg: boolean) => void
}

export const LoginForm:FC<ILoginForm> = ({setLoading}) => {
  const [value, setValue] = useState({email: '', password: ''})
  const [disabled, setDisabled] = useState<boolean>(true)
  const [valid, setValid] = useState({name: true, email: true, password: true})
  const [passswordType, setPasswordType] = useState<string>('password')
  const [apiError, setApiError] = useState('')
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const onChangeType = () => {
    if(passswordType === 'password') {
      setPasswordType('text')
    } else setPasswordType('password')
  }

  const inputHandler = (e: any) => {
    setValue(prev => ({...prev, [e.target.name]: e.target.value}))
    setApiError('')
  }

  useEffect(() => {
    if(value.email === '' && value.password === '') {
      setDisabled(true)
      setApiError('')
    } else setDisabled(false)
     if(!valid.email && ValidationEmail(value.email)) {
      setValid({...valid, email: true})
    }
    if(!valid.password && ValidationPassword(value.password)) {
      setValid({...valid, password: true})
    }
  }, [value])

  const formHandler = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    if(!ValidationEmail(value.email)) {
      setValid({...valid, email: false})
      setLoading(false)
      return
    }
    if(!ValidationPassword(value.password)) {
      setValid({...valid, password: false})
      setLoading(false)
      return
    }
    const response = await Login(value, mutate)
    if(response.message == 'Неправильный email или пароль') {
      setApiError(response.message)
      setLoading(false)
      return
    }
    localStorage.setItem('token', response.value)
    localStorage.setItem('email', value.email)
    router.push('/accounts')
  }

  return (
    <form className={styles.form} onSubmit={formHandler}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>
          Вход в&nbsp;Yoldi&nbsp;Agency
        </h2>
        <div className={styles.inputWrapper}>
          <MyInput 
            placeholder='E-mail' 
            type='e-mail' 
            firstWidth={20} 
            firstheight={14} 
            firstIcon='/email-icon.png'
            value={value.email}
            name='email'
            setValue={inputHandler}
            border={valid.email}
            />
            <span className={styles.validationBlock} style={{display: valid.email ? 'none' : 'inline'}}>
              Введите email в формате hello@gmail.com
            </span>
            <span className={styles.validationBlock} style={{display: apiError === '' ? 'none' : 'inline'}}>
              {apiError}
            </span>
        </div>
        <div className={styles.inputWrapper}>
          <MyInput 
            placeholder='Пароль' 
            type={passswordType}
            firstWidth={16} 
            firstheight={20} 
            firstIcon='/close-pass-icon.png'
            secondIcon='/open-pass-icon.png'
            secondWidth={24}
            secondHeight={12}
            value={value.password}
            name='password'
            setValue={inputHandler}
            border={valid.password}
            onChangeType={onChangeType}
            />
            <span className={styles.validationBlock} style={{display: valid.password ? 'none' : 'inline'}}>
              Длина пароля не может быть менее 6 символов
            </span>
        </div>
        <FormButton type='submit' disabled={disabled}>Войти</FormButton>
      </div>
    </form>
  );
}
