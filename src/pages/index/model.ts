import Service from './service'

export default {
	namespace: 'index',

	state: {
            articles: [],
            visible_detail:false,
		item: {}
	},

	subscriptions: {
		setup ({ dispatch }) {
			dispatch({ type: 'query' })
		}
	},

	effects: {
		*query ({}, { put, select }) {
			const has_login = yield select(({ app: { has_login } }) => has_login)

			if (!has_login) return

			yield put({
				type: 'getArticle',
				payload: { keyword: '123' }
			})
		},
		*loadMore ({ payload: { page, pageSize } }, { call, put, select }) {
			const articles = yield select(({ index: { articles } }) => articles)

			const {
				data: { code, data: { list } }
			} = yield call(Service.Service_getArticle, {
				page,
				pageSize
			})

			if (code !== 0) return

			yield put({
				type: 'updateState',
				payload: { articles: articles.concat(list) }
			})
		},
		*getArticle ({ payload: { keyword } }, { call, put }) {
			const {
				data: { code, data: { list } }
			} = yield call(Service.Service_getArticle, { keyword })

			if (code !== 0) return

			yield put({
				type: 'updateState',
				payload: { articles: list }
			})
		}
	},

	reducers: {}
}
