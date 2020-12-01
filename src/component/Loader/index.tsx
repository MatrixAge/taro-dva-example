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
                        ${styles.loading_wrap} 
                        ${visible ? styles.visible : ''} 
                        ${maskVisible ? styles.maskVisible : ''}
                  `}
		>
			<View className='loading'>
				<View className='icon_source_bottom icon_source' />
				<View className='icon_source_top icon_source' />
			</View>
		</View>
	)
}
