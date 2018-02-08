const routes = [
    {
        path: '/congratulations',
        component: resolve => require(['./components/pages/congratulations.vue'], resolve),
        meta: {
            title: 'Avaliação enviada',
        }
    },
    {
        path: '/',
        component: resolve => require(['./components/pages/evaluation.vue'], resolve),
        meta: {
            title: 'Avaliação',
        }
    },
    {
        path: '/:secure_id',
        component: resolve => require(['./components/pages/evaluation.vue'], resolve),
        meta: {
            title: 'Avaliação',
        }
    }
]

export default routes
