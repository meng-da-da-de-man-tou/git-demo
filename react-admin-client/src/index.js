import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

//读取local中保存的user,保存到内存中
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />,document.getElementById('root'))