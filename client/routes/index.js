import MainLayout from '@/layout/MainLayout'
import Post from '@/modules/hexo/post'

export default [
  {
    path: '/',
    component: MainLayout,
    redirect: {
      name: 'POSTS'
    },
    children: [
      { path: 'posts', name: 'POSTS', component: Post },
      { path: 'drafts', name: 'DRAFTS', component: Post },
      { path: 'trash', name: 'TRASH', component: Post }
    ]
  }
]
