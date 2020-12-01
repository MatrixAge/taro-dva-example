import React, { memo, useState } from 'react'
import { useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import equal from 'fast-deep-equal'
import styles from './index.less'

export interface IArticle {
	id: string
	auth: string
	title: string
	content: string
	cover: string
	date: string
}

interface IProps {
	articles: Array<IArticle>
	loadMore: ({ page, pageSize }: { page: number; pageSize?: number }) => void
	showDetail: (item: IArticle) => void
}

const Index = ({ articles, loadMore, showDetail }: IProps) => {
	const [ state_page, setStatePage ] = useState<number>(1)

	useReachBottom(() => {
		loadMore({ page: state_page + 1, pageSize: 10 })
		setStatePage(state_page + 1)
	})

	return (
		<View className={`${styles._local} w_100 border_box flex flex_column`}>
			{articles.map((item) => (
				<View
					className='article w_100 border_box'
					onClick={() => showDetail(item)}
					key={item.id}
				>
					<Image
						className='image w_100'
						src={item.cover + `&r=${Math.random()}`}
						mode='widthFix'
					/>
					<View className='footer'>
						<Text className='title inline_block'>{item.title}</Text>
						<Text className='summary line_clamp_3'>{item.content}</Text>
						<View className='row w_100 flex justify_between align_center'>
							<View className='auth_wrap flex align_center'>
								<Image
									className='avatar'
									src={item.cover + `&r=${Math.random()}`}
									mode='scaleToFill'
								/>
								<Text className='auth'>{item.auth}</Text>
							</View>
							<Text className='date'>{item.date}</Text>
						</View>
					</View>
				</View>
			))}
		</View>
	)
}

export default memo(Index, (prev: IProps, next: IProps) => equal(prev.articles, next.articles))
