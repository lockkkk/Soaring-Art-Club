const router = require('koa-router')()
const mustache = require('mustache')
const fs = require('fs')
const multer = require('koa-multer')
const serve = require('koa-router-static')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/pictures')
    },
    filename: function (req, file, cb) {
      console.log(file);
      var fileObj = {
        "image/png": ".png",
        "image/jpeg": ".jpeg",
        "image/jpg": ".jpg"
      };
      if (fileObj[file.mimetype] == undefined) {
        cb(new Error("file format not valid"));
      } else {
        cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
      }
    }
  })
// const upload = multer({ dest: 'public/pictures' })
const upload = multer({ storage })

//作用：于html和Javascript的中间层，
const user_controller = require('./controllers/user')
const work_controller = require('./controllers/work')
const good_controller = require('./controllers/good')
const order_controller = require('./controllers/order')
const update_controller = require('./controllers/update')
router.get('/', async (ctx) => {
    const template = fs.readFileSync('./views/homepage.html')
    ctx.body = mustache.render(template.toString(), {
        theme: 'EAT',
        items: ['rice', 'beef', 'durian']
    })
})

// router.use((ctx, next) => {
//     ctx.require = 'lock'
//     next();
// }

// )
router.get('/user/get/:username', user_controller.get)
router.get('/user/get_id/:id', user_controller.get_id)
router.get('/user/index', user_controller.index)
//router.get('/user/page', user_controller.page)
router.post('/user/updateinfo', user_controller.update_info)
router.post('/user/updateuser', user_controller.update_info)
router.post('/user/createinfo', user_controller.create_info)
router.post('/user/createuser', user_controller.create_user)
router.post('/user/permit', user_controller.permit)
router.get('/user/delate/:id', user_controller.del)

router.get('/work/index', work_controller.index)
router.get('/work/username/:username', work_controller.get)
router.get('/work/uid/:id', work_controller.get_uid)
router.get('/work/id/:id', work_controller.getw)
router.post('/work/create', work_controller.create)
router.get('/work/delate/:id', work_controller.del)

router.get('/good/index', good_controller.index)
router.get('/good/get/:id', good_controller.get)
router.post('/good/create', good_controller.create)
router.get('/good/delate/:id', good_controller.del)

router.get('/order/index', order_controller.index)
router.get('/order/getgid/:id', order_controller.get_gid)
router.get('/order/getid/:id', order_controller.get_id)
router.post('/order/create', order_controller.create)
router.get('/order/delate/:id', order_controller.del)

router.get('/update/index', update_controller.index)
router.get('/update/username/:username', update_controller.get)
router.get('/update/create', update_controller.create)
router.get('/update/delate/:id', update_controller.del)

router.post('/upload', upload.single('picture'), async (ctx) =>{
    const prefix = 'http://localhost:3000/'
    ctx.body = {url: prefix + ctx.req.file.path} 
})

module.exports = router
