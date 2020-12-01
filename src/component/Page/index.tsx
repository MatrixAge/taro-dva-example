import React from 'react'
import { View } from '@tarojs/components'
import { Loader } from '@/component'

export default ({ className, children, loading }) => {
	return loading ? (
		<Loader visible maskVisible />
	) : (
		<View className={`${className} w_100 border_box flex flex_column`}>{children}</View>
	)
}
