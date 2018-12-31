# soaring-dream

> webset for soaring dream

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## TODO List
- [ ] 个人主页: 个人的商品列表，动态Top3和商品示例
- [ ] 商城：减少商品的状态
- [ ] Vuex 和 
- [ ] 个人: 头像
后端: Uploader, uploader callback
(ctx, next) {
    if (ctx.session.user) {
        await next;
    } else {
        return {status: false, msg: "Require Login"}
    }
}

use axios
hook on create
