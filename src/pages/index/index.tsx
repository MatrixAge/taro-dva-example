import React, { Component } from 'react'
import { Page } from '@/component'
import styles from './index.less'

class Index extends Component {
	render() {
		return <Page className={`${styles._local}`}>index</Page>
	}
}

export default Index
