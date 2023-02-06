import Image from 'next/image'
import { FC } from 'react'
import styles from './myinput.module.scss'

interface IMyInput {
  placeholder: string,
  type: string,
  firstIcon?: string,
  firstWidth: number,
  firstheight: number,
  secondIcon?: string,
  secondWidth?: number,
  secondHeight?: number,
  name: string,
  value: string,
  setValue: (e: any) => void,
  border: boolean;
  onChangeType?: () => void
}

const MyInput:FC<IMyInput> = (props) => {
  return (
    <div className={styles.wrapper}>
      <input 
        className={styles.myinput}
        placeholder={props.placeholder} 
        type={props.type}
        style={{paddingRight: props.secondIcon ? '55px' : '20px', border: props.border ? 'none' : '1px solid red'}}
        value={props.value}
        name={props.name}
        onChange={(e) => props.setValue(e)}
         />
         {props.firstIcon
          ?
          <Image className={styles.firstIcon} alt='icon' src={props.firstIcon} width={props.firstWidth} height={props.firstheight} />
          :
          null
         }
         {props.secondIcon
          ?
          <div className={styles.secondIcon}>
            <Image onClick={props.onChangeType} alt='icon' src={props.secondIcon} width={props.secondWidth} height={props.secondHeight} />
          </div>
          :
          null
         }
    </div>
  )
}

export default MyInput