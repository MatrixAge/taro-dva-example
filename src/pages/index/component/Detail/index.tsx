import React, { memo, useState } from 'react'
import { ScrollView, View, Text, Image, Icon } from '@tarojs/components'
import { IArticle } from '../List'
import { onTouchMove } from '@/util/event'
import useDoubleClick from '@/util/hook/useDoubleClick'
import icon_back_top from '@/image/icon_backtop.svg'
import styles from './index.less'

interface IProps {
	visible: boolean
	item: IArticle
	hideDetail: () => void
}

const Index = ({ visible, item, hideDetail }: IProps) => {
	const [state_scroll_top, setStateScrollTop] = useState<number | undefined>(undefined)
	const doubleClickHideDetail = useDoubleClick()

	return (
		<ScrollView
			className={`
                        ${styles._local} 
                        ${visible ? styles.visible : ''} 
                        w_100 h_100vh border_box fixed top_0 left_0 z_index_10
                  `}
			scrollY
			enableFlex
			scrollTop={state_scroll_top}
			onTouchMove={onTouchMove}
		>
			<Icon
				className='icon_close absolute'
				type='cancel'
				size='24'
				color='white'
				onClick={() => hideDetail()}
			/>
			<View
				className='icon_back_top_wrap fixed border_box flex justify_center align_center'
				onClick={() => {
					setStateScrollTop(0)
					setStateScrollTop(undefined)
				}}
			>
				<Image className='icon_back_top' src={icon_back_top} mode='widthFix' />
			</View>
			<Image
				className='image w_100'
				src={item.cover + `&r=${Math.random()}`}
				mode='widthFix'
			/>
			<View
				className='content_wrap w_100 border_box'
				onClick={(e) => doubleClickHideDetail(e, () => hideDetail())}
			>
				<View className='title'>{item.title}</View>
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
				<Text className='content'>{item.content}</Text>
			</View>
		</ScrollView>
	)
}

export default memo(Index)
