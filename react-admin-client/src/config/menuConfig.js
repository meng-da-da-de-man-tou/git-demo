import {
    AppstoreOutlined,
    HomeOutlined,
    ShoppingOutlined,
    ShopOutlined,
    UserOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <HomeOutlined />
    },
    {
        title: '商品',
        key: '/shopp',
        icon: <ShoppingOutlined />,
        children: [{
            title: '品类管理',
            key: '/category',
            icon: <AppstoreOutlined />
        }, {
            title: '商品管理',
            key: '/product',
            icon: <ShopOutlined />
        }]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <UserOutlined />
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <UserSwitchOutlined />
    },
    {
        title: '图形图表',
        key: '/echars',
        icon: <LineChartOutlined />,
        children: [{
            title: '柱状图',
            key: '/Charts/bar',
            icon: <BarChartOutlined />
        }, {
            title: '线条图',
            key: '/Charts/line',
            icon: <LineChartOutlined />
        }, {
            title: '饼状图',
            key: '/Charts/pie',
            icon: <PieChartOutlined />
        }]
    },
]

export default menuList