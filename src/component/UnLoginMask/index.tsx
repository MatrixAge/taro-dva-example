import React from 'react'
import { View } from '@tarojs/components'

export default ({ visible, login }) => {
	return (
		visible && (
			<View
				className={`w_100vw h_100vh fixed top_0 left_0 z_index_100 flex justify_center align_center bg_white`}
				onClick={() => login()}
			>
				未登录，请点击页面进行登录
			</View>
		)
	)
}
