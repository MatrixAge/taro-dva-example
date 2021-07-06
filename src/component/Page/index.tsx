import React from 'react'
import { View } from '@tarojs/components'
import { Loader } from '@/component'

interface IProps {
	children: React.ReactNode
	className?: string
	loading?: boolean
}

const Index = (props: IProps) => {
	const { className, children, loading } = props

	return loading ? (
		<Loader visible maskVisible />
	) : (
		<View className={`${className} w_100 border_box flex flex_column`}>{children}</View>
	)
}

export default Index
