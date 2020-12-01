import { request } from '@tarojs/taro'

export default {
	Service_getArticle: async (params: {
		keyword: string
		page: number
		pageSize: number
	}): Promise<any> => {
		return await request({
			url: `/articles`,
			data: params,
			method: 'GET'
		})
	}
}