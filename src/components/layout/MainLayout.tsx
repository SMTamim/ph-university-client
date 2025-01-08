import { Layout, Menu, MenuProps } from 'antd';
import { createElement } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;


const items: MenuProps['items'] = [
    {
        key: '1',
        icon: createElement(UploadOutlined),
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: createElement(VideoCameraOutlined),
        label: 'Profile'
    },
    {
        key: '3',
        icon: createElement(UserOutlined),
        label: 'User Management',
        children: [
            {
                key: '4',
                icon: createElement(UploadOutlined), label: 'Create Admin'
            },
            {
                key: '5',
                icon: createElement(UploadOutlined), label: 'Create Student'
            },
            {
                key: '6',
                icon: createElement(UploadOutlined), label: 'Create Faculty'
            },]
    },
];
const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <h1>PH University</h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <h1>The main content goes here</h1>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;