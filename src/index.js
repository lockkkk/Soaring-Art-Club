const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa-cors')
const mount = require('koa-mount')
const serve = require('koa-static')

app.use(cors())

app.use(session({
    store: redisStore({
        host: 'redis'
    })
}));
app.use(bodyParser({
    onerror: function (err, ctx) {
        console.log(err)
    }
}))


app.use(mount('/api', router.routes()))
app.use(mount('/static', serve('./static')))

app.listen(3000)

