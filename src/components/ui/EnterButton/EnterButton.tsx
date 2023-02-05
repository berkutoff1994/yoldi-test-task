import Image from 'next/image'
import { FC } from 'react'
import styles from './enterbutton.module.scss'

interface IEnterButtonProps {
  children: string
  icon?: string
  onClick?: () => void,
  padding?: string
}

const EnterButton:FC<IEnterButtonProps> = ({children, icon, onClick, padding}) => {
  return (
    <button className={styles.enterButton} onClick={onClick} style={{padding: padding}}>
      <div>
        {icon ? <Image className={styles.enterButton__icon} alt='button' src={icon} width={19} height={19}/> : null}
        {children}
      </div>
    </button>
  )
}

export default EnterButton