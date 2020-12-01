import Taro from '@tarojs/taro'

const Service = {
	Service_login: async (): Promise<string> => {
		const getCode = (): Promise<string> => {
			return new Promise(async (resolve) => {
				const { code } = await Taro.login()

				setTimeout(() => {
					resolve(code)
				}, 3000)
			})
		}

		return await getCode()
	}
}

export default Service
