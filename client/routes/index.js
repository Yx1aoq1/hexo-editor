import MainLayout from '@/layout/MainLayout'
import ArticleList from '@/modules/article/list'
import ArticleEdit from '@/modules/article/edit'
import Login from '@/modules/login'

export default [
  {
    path: '/',
    component: MainLayout,
    redirect: {
      name: 'POSTS'
    },
    children: [
      { path: 'posts', name: 'POSTS', component: ArticleList },
      { path: 'drafts', name: 'DRAFTS', component: ArticleList },
      { path: 'trash', name: 'TRASH', component: ArticleList },
      { path: ':workspace/edit/:key', name: 'EDIT', component: ArticleEdit },
      { path: 'add', name: 'ADD', component: ArticleEdit }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'LOGIN'
  }
]
