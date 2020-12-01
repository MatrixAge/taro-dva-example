import React from 'react'
import { View } from '@tarojs/components'
import styles from './index.less'

interface IProps {
	visible: boolean
	maskVisible?: boolean
}

export default ({ visible, maskVisible }: IProps) => {
	return (
		<View
			className={`
                        ${styles._local} 
                        ${visible ? styles.visible : ''} 
                        ${maskVisible ? styles.maskVisible : ''}
                  `}
		>
			<View className='wrap'>
				<View className='inner' />
				<View className='text'>loading</View>
			</View>
		</View>
	)
}
