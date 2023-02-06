import Image from 'next/image'
import React, { FC } from 'react'
import styles from './downloadbutton.module.scss'

interface IRemoveButton {
  children: string,
  link: string,
  width: number,
  height: number,
  handler: (e: any) => void
}

const RemoveButton:FC<IRemoveButton> = ({children, link, width, height, handler}) => {
  return (
    <button onClick={handler} className={styles.myButton}>
      <div className={styles.myButton__block}>
        <Image alt='image' src={link} width={width} height={height}/>
        <span>{children}</span>
        <Image alt='image' src='/download-preview.png' width={22} height={17} />
      </div>
    </button>
  )
}

export default RemoveButton