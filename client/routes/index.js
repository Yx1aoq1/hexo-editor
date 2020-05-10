import MainLayout from '@/layout/MainLayout'
import ArticleList from '@/modules/article/list'
import ArticleEdit from '@/modules/article/edit'

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
      { path: 'edit/:id', name: 'EDIT', component: ArticleEdit },
      { path: 'add/:id', name: 'ADD', component: ArticleEdit }
    ]
  }
]
