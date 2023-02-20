import Image from 'next/image'
import React, { FC } from 'react'
import styles from './downloadbutton.module.scss'

interface IDownloadButton {
  children: string,
  link: string,
  width: number,
  height: number,
  handler: (e: React.ChangeEvent) => void
}

const DownloadButton:FC<IDownloadButton> = ({children, link, width, height, handler}) => {
  return (
    <button className={styles.myButton}>
      <div className={styles.myButton__block}>
        <Image alt='image' src={link} width={width} height={height}/>
        <span>{children}</span>
        <Image alt='image' src='/download-preview.png' width={22} height={17} />
        <input
          className={styles.cover__downloader} 
          onChange={handler} 
          type={"file"}
          name='file'
          accept='image/*,.png,.jpg'/>
      </div>
    </button>
  )
}

export default DownloadButton