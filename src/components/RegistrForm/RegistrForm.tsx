import { ValidationEmail, ValidationName, ValidationPassword } from '@/utils/validation';
import React, { useEffect, useState } from 'react';
import FormButton from '../ui/FormButton/FormButton';
import MyInput from '../ui/MyInput/MyInput';
import { useSWRConfig } from 'swr'
import { Registration } from '@/pages/api/hello';
import styles from './registrform.module.scss';
import { useRouter } from 'next/router';

export function RegistrForm() {
  const [value, setValue] = useState({email: '', name: '', password: ''})
  const [disabled, setDisabled] = useState<boolean>(true)
  const [valid, setValid] = useState({name: true, email: true, password: true})
  const [errorValidation, setErrorValidation] = useState({name: '', email: ''})
  const [passswordType, setPasswordType] = useState('password')
  const [apiError, setApiError] = useState('')
  let router= useRouter()
  const { mutate } = useSWRConfig()

  const onChangeType = () => {
    if(passswordType === 'password') {
      setPasswordType('text')
    } else setPasswordType('password')
  }

  const inputHandler = (e: any) => {
    setValue(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  
  useEffect(() => {
    if(value.name === '' && value.email === '' && value.password === '') {
      setDisabled(true)
    } else setDisabled(false)
    if(!valid.name && ValidationName(value.name)[0]) {
      setValid({...valid, name: true})
    }
    if(!valid.email && ValidationEmail(value.email)) {
      setValid({...valid, email: true})
    }
    if(!valid.password && ValidationPassword(value.password)) {
      setValid({...valid, password: true})
    }
  }, [value])

  const formHandler = async (e: any) => {
    e.preventDefault()
    if(!ValidationName(value.name)[0]) {
      const [verifiedName, err] = ValidationName(value.name)
      setErrorValidation({...errorValidation, name: err})
      setValid({...valid, name: verifiedName})
      return
    }
    if(!ValidationEmail(value.email)) {
      setValid({...valid, email: false})
      return
    }
    if(!ValidationPassword(value.password)) {
      setValid({...valid, password: false})
      return
    }
    try {
      const response = Registration(value, mutate)
    } catch(err: any) {
      setApiError(err)
    }
    setValue({email: '', name: '', password: ''})
    router.push('/login')
  }


  return (
    <form className={styles.form} onSubmit={formHandler}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>
          Регистрация в&nbsp;Yoldi&nbsp;Agency
        </h2>
        <div className={styles.inputWrapper}>
          <MyInput 
            placeholder='Имя' 
            type='text' 
            firstWidth={16} 
            firstheight={17} 
            firstIcon='/name-icon.png'
            value={value.name}
            name='name'
            setValue={inputHandler}
            border={valid.name}
             />
            <span 
              className={styles.validationBlock} 
              style={{display: valid.name ? 'none' : 'inline'}}>
                {errorValidation.name}
              </span>
        </div>
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
              Email должен соответствовать виду hello@gmail.com
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
        <FormButton type='submit' disabled={disabled}>Создать аккаунт</FormButton>
      </div>
    </form>
  );
}

