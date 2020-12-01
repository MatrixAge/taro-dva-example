import Taro from '@tarojs/taro'

export default {
	namespace: 'cart',

	state: {},

	subscriptions: {
		setup ({ dispatch }) {
			dispatch({ type: 'checkCartItems' })
			dispatch({ type: 'query' })
		}
	},

	effects: {
		*query () {}
	},

	reducers: {
		checkCartItems () {
                  const cart_items = Taro.getStorageSync('cart_items')

			if (!cart_items) Taro.setStorageSync('cart_items', [])
		}
	}
}
