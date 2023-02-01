import Image from 'next/image'
import { FC } from 'react'
import styles from './enterbutton.module.scss'

interface IEnterButtonProps {
  children: string
  icon?: string
}

const EnterButton:FC<IEnterButtonProps> = ({children, icon}) => {
  return (
    <button className={styles.EnterButton}>
      <div>
        {icon ? <Image alt='button' src={icon} width={19} height={19}/> : null}
        {children}
      </div>
    </button>
  )
}

export default EnterButton