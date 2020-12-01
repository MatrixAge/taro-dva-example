import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Page, UnLoginMask, Loading } from '@/component'
import LoadMore from '@/icons/LoadMore'
import List from './component/List'
import Detail from './component/Detail'
import { IArticle } from './component/List'
import styles from './index.less'

class Index extends Component {
	render () {
		const { dispatch, has_login, loading, articles, visible_detail, item }: any = this.props

		const props_unlogin_mask = {
			visible: !has_login,
			login: () => dispatch({ type: 'app/login' })
		}

		const props_loading = {
			maskVisible: true,
			visible: loading.effects['app/login']
		}

		const props_list = {
			articles,
			loadMore ({ page, pageSize }: { page: number; pageSize?: number }) {
				dispatch({
					type: 'index/loadMore',
					payload: { page, pageSize }
				})

				props_loadmore.visible = loading.effects['index/loadMore']
			},
			showDetail (item: IArticle) {
				dispatch({
					type: 'index/updateState',
					payload: {
						visible_detail: true,
						item
					}
				})
			}
		}

		const props_loadmore = {
			visible: true
		}

		const props_detail = {
			visible: visible_detail && articles.length,
			item,
			hideDetail () {
				dispatch({
					type: 'index/updateState',
					payload: { visible_detail: false }
				})
			}
		}

		return (
			<Page
				className={`${styles._local}`}
				loading={loading.effects['index/getArticle']}
			>
				<UnLoginMask {...props_unlogin_mask} />
				<Loading {...props_loading} />
				<List {...props_list} />
				<LoadMore {...props_loadmore} />
				<Detail {...props_detail} />
			</Page>
		)
	}
}


export default connect(
	({ app: { has_login }, index: { articles, visible_detail, item }, loading }: any) => ({
		has_login,
		articles,
		visible_detail,
		item,
		loading
	})
)(Index)
