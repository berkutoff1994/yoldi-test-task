import { ValidationEmail, ValidationName, ValidationPassword } from '@/utils/validation';
import React, { useEffect, useState } from 'react';
import FormButton from '../ui/FormButton/FormButton';
import MyInput from '../ui/MyInput/MyInput';
import axios from 'axios';
import useSWR from 'swr'
import styles from './registrform.module.scss';
import { fetcher } from '@/pages/api/hello';

export function RegistrForm() {
  const [value, setValue] = useState({email: '', name: '', password: ''})
  const [disabled, setDisabled] = useState<boolean>(true)
  const [valid, setValid] = useState({name: true, email: true, password: true})
  const [errorValidation, setErrorValidation] = useState({name: '', email: ''})
  const [passswordType, setPasswordType] = useState('password')
  const [apiError, setApiError] = useState('')
  const {data, error} = useSWR('https://frontend-test-api.yoldi.agency/api/auth/sign-up', fetcher)

  //скрыть/показать пароль
  const onChangeType = () => {
    if(passswordType === 'password') {
      setPasswordType('text')
    } else setPasswordType('password')
    
  }

  //значения инпутов для отправки формы
  const inputHandler = (e: any) => {
    setValue(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  //следим за инпутами для обновления состояния disabled у кнопки submit
  useEffect(() => {
    if(value.name === '' && value.email === '' && value.password === '') {
      setDisabled(true)
    } else setDisabled(false)
    //если имя невалидно то следим за заполнением поля ввода
    if(!valid.name && ValidationName(value.name)[0]) {
      setValid({...valid, name: true})
    }
    //если email невалидный то следим за заполнением поля ввода
    if(!valid.email && ValidationEmail(value.email)) {
      setValid({...valid, email: true})
    }
     //если пароль невалидный то следим за заполнением поля ввода
    if(!valid.password && ValidationPassword(value.password)) {
      setValid({...valid, password: true})
    }
  }, [value])

  //отправка формы и валидация
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
      const response = await axios.post(
        'https://frontend-test-api.yoldi.agency/api/auth/sign-up', value)
      console.log(response)
    } catch(err: any) {
      console.log(err)
      setApiError(err.response.data.message)
    }
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
