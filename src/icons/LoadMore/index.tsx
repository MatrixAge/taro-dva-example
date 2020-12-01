import React from 'react'
import { View } from '@tarojs/components'
import styles from './index.less'

interface IProps {
	visible: boolean
	scale?: number
	color?: string
}

export default ({ visible, scale = 3, color = 'black' }: IProps) => {
	return (
		<View
			className={`
                        ${styles._local} 
                        ${visible ? styles.visible : ''}
                        w_100 justify_center
                  `}
		>
			<View className='loadmore' style={{ transform: `scale(${scale})`, color }} />
		</View>
	)
}
