const _import = require('./_import_' + process.env.NODE_ENV);
/* Layout */
import Layout from '../views/layout/Layout';
const Routers = [{
        id: 1,
        title: '征订中心',
        path: '/batch',
        children: [{
                id: 2,
                path: '/batch',
                component:Layout,
                redirect: '/batch/index',
                name: 'batch',
                meta: {
                    title: '批次管理',
                    icon: 'example',
                    noCache: false,
                    new: true
                },
                children: [{
                    id: 3,
                    parentId: 2,
                    path: 'index',
                    name: 'batchIdex',
                    component: _import('batch/index'),
                    hidden: false,
                    meta: {
                        title: '批次管理',
                        icon: 'form',
                        noCache: false,
                        new: true
                    },
                }]
            },
            {
                id: 4,
                path: '/book',
                component: Layout,
                redirect: 'book/student',
                name: 'book',
                meta: {
                    title: '用书管理',
                    icon: 'form',
                    noCache: false,
                    new: true
                },
                children: [{
                    id: 5,
                    parentId: 4,
                    path: 'student',
                    name: 'bookStudent',
                    component: _import('book/student/index'),
                    hidden: false,
                    name: 'book',
                    meta: {
                        title: '学生用书',
                        icon: 'form',
                        noCache: false,
                        new: true
                    },
                }]
            },
            {
                id: 6,
                title: '信息维护',
                path: '/info',
                component: Layout,
                redirect: 'info/colleges',
                name: 'info',
                meta: {
                    title: '信息维护',
                    icon: 'example',
                    noCache: false,
                    new: true
                },
                children: [{
                    id: 7,
                    parentId: 6,
                    path: 'colleges',
                    name: 'infoColleges',
                    component: _import('info/colleges/index'),
                    hidden: false,
                    meta: {
                        title: '院校信息',
                        icon: 'form',
                        noCache: false,
                        new: true
                    },
                }]
            }
        ]
    },
    {
        id: 8,
        title: '教材中心',
        path: '/material',
        children: [{
            id:9,
            path: '/material',
            component: Layout   ,
            redirect: '/material/teaching',
            name: 'material',
            meta: {
                title: '教材管理',
                icon: 'example',
                noCache: false,
                new: true
            },
            children: [{
                id: 10,
                parentId: 9,
                path: 'teaching',
                name: 'materialTeaching',
                component: _import('material/teaching/index'),
                hidden: false,
                meta: {
                    title: '教材管理',
                    icon: 'example',
                    noCache: false,
                    new: true
                }
            }]

        }]

    }
];
export default Routers;
