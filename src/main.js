import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Page6 from './pages/nav3/Page6.vue'
import echarts from './pages/charts/echarts.vue'

// start mock
import Mock from './mock';
Mock.bootstrap();

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

NProgress.configure({showSpinner: false});

const routes = [
    {
        path: '/login',
        component: Login,
        hidden: true//不显示在导航中
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: '',//图标样式class
        children: [
            {path: '/table', component: Table, name: 'Table'},
            {path: '/form', component: Form, name: 'Form'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: '',
        children: [
            {path: '/page4', component: Page4, name: '页面4'},
            {path: '/page5', component: Page5, name: '页面5'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: '',
        leaf: true,//只有一个节点
        children: [
            {path: '/page6', component: Page6, name: '导航三'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: '',
        children: [
            {path: '/echarts', component: echarts, name: 'echarts'}
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({path: '/login'})
    }
    next()
})

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: {App}
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')

