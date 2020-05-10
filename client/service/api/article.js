export default [
  {
    name: 'list',
    method: 'POST',
    path: '/article/list',
    params: {
      workspace: ''
    }
  },
  {
    name: 'update',
    method: 'POST',
    path: '/article/update',
    params: {
      id: '',
      title: '',
      content: '',
      date: '',
      tags: [],
      categories: '',
      status: ''
    }
  },
  {
    name: 'delete',
    method: 'GET',
    path: '/article/delete/:id',
    params: {
      id: ''
    }
  },
  {
    name: 'detail',
    method: 'GET',
    path: '/article/detail/:id',
    params: {
      id: ''
    }
  }
]
