const routes = [
    {
        path: '/chat',
        component: resolve => require(['./components/pages/chat.vue'], resolve),
        meta: {
            title: 'Avaliação enviada',
        }
    }
]

export default routes
