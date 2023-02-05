import { FC } from 'react';
import styles from './formbutton.module.scss';

interface IFormButton {
  children: string,
  disabled: boolean,
  type: "button" | "submit" | "reset",
  onClick?: (e: any) => void
}

const FormButton:FC<IFormButton> = ({children, disabled, type, onClick}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={disabled ? styles.formButton + ' ' + styles.formButton__disabled : styles.formButton}>
      {children}
    </button>
  )
}

export default FormButton