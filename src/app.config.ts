export default {
	pages: ['pages/index/index'],
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	},
	tabBar: {
		backgroundColor: '#fff',
		borderStyle: 'white',
		color: '#cdcdcd',
		selectedColor: '#000',
		list: [
			{
				pagePath: 'pages/index/index',
				text: '首页',
				iconPath: 'image/icon_nav_home.png',
				selectedIconPath: 'image/icon_nav_home_active.png'
			},
			{
				pagePath: 'pages/index/index',
				text: '购物车',
				iconPath: 'image/icon_nav_cart.png',
				selectedIconPath: 'image/icon_nav_cart_active.png'
			},
			{
				pagePath: 'pages/index/index',
				text: '表单',
				iconPath: 'image/icon_nav_form.png',
				selectedIconPath: 'image/icon_nav_form_active.png'
			}
		]
	}
}
