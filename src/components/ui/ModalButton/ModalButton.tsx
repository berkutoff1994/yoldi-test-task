import { FC } from 'react'
import styles from './modalbutton.module.scss';

interface IFormButton {
  children: string,
  type: "button" | "submit" | "reset",
  onClick?: (e: any) => void
  background: string
}

const ModalButton:FC<IFormButton> = ({children, type, onClick, background}) => {
  return (
    <button 
      onClick={onClick}
      type={type}
      className={background === 'white' ? styles.modalButton + ' ' + styles.whiteButton : styles.modalButton + ' ' + styles.blackButton}>
      {children}
    </button>
  )
}

export default ModalButton