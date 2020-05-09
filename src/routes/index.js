import MainLayout from '@/layout/MainLayout'
import PageA from '@/modules/moduleA/pageA'

export default [
  {
    path: '/',
    component: MainLayout,
    redirect: {
      name: 'PAGEA'
    },
    children: [
      { path: 'a', name: 'PAGEA', component: PageA }
    ]
  }
]
