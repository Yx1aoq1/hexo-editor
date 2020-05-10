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
    name: 'detail',
    method: 'GET',
    path: '/article/detail/:id',
    params: {
      id: ''
    }
  },
  {
    name: 'publish',
    method: 'GET',
    path: '/article/publish',
    params: {
      id: '',
      workspace: ''
    }
  },
  {
    name: 'stash',
    method: 'GET',
    path: '/article/stash',
    params: {
      id: '',
      workspace: ''
    }
  },
  {
    name: 'delete',
    method: 'GET',
    path: '/article/delete',
    params: {
      id: '',
      workspace: ''
    }
  },
  {
    name: 'deleteSource',
    method: 'GET',
    path: '/article/deleteSource',
    params: {
      id: ''
    }
  }
]
