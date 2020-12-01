import Taro from '@tarojs/taro'

export default {
	Service_add: async (params): Promise<boolean> => {
		const cart_items = Taro.getStorageSync('cart_items')

		cart_items.push(params)

		try {
			Taro.setStorageSync('cart_items', cart_items)

			return true
		} catch (_) {
			return false
		}
	}
}
