import React from 'react'
import { Provider } from 'react-redux'
import { addInterceptor } from '@tarojs/taro'
import interceptor from '@util/interceptor'
import createApp from './util/dva'
import models from './util/model'
import './app.less'

addInterceptor(interceptor)

const store = createApp({ models: models }).getStore()

export default ({ children }) => <Provider store={store}>{children}</Provider>
