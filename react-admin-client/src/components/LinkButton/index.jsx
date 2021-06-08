import React from 'react'
import './index.less'


//通用的像链接的按钮组件
export default function LinkButton(props) {
    return <button {...props} className="link-button">{props.children}</button>
}
