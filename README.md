# hexo-editor

vue + ant-design-vue + express hexo博客后台管理

## 使用

```
https://github.com/Yx1aoq1/hexo-editor.git
cd hexo-editor
npm install
npm run build
npm run serve:app
```

## 系统截图

![home](https://github.com/Yx1aoq1/hexo-editor/blob/master/docs/source/images/home.png)

![editor](https://github.com/Yx1aoq1/hexo-editor/blob/master/docs/source/images/editor.png)

## 配置系统 config.js

```
module.exports = {
  host: 'localhost', // 项目启动域
  port: 3000, // 项目启动端口
  base_dir: './docs', // hexo 文章保存的目录
  username: 'Yx1aoq1',
  password: '6a8c790e65d21ad5c6155f947dd3b5af' // md5加密后的密码
}
```

## TODO

* ~~文章增删改查~~
* ~~登录~~
* 图片上传
* hexo 博客部署
