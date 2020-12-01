const BASEURL = 'http://192.168.0.184:8888/api'

export default (chain: any) => {
	const requestParams = chain.requestParams

	requestParams.url = `${BASEURL}${requestParams.url}`

	return chain.proceed(requestParams).then((res: any) => res)
}
