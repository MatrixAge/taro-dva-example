import Taro from '@tarojs/taro'
import Service from '@service/app'

export default {
	namespace: 'app',

	state: {
		has_login: false || Taro.getStorageSync('has_login')
	},

	effects: {
		*login ({}, { call, put }) {
			const code = yield call(Service.Service_login)

			if (!code) return

			yield put({
				type: 'updateState',
				payload: { has_login: true }
			})

			yield put({ type: 'index/query' })

			Taro.setStorageSync('has_login', true)
		}
	},

	reducers: {}
}
