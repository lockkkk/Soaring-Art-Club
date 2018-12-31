const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'db',
      user : 'root',
      password : 'acat2333',
      database : 'SoaringDream'
    }
  })
const mustache = require('mustache')
const fs = require('fs')

const index = async (ctx) => {
    console.log('user_index is called')
    const template = fs.readFileSync('/usr/src/app/views/user/indexdemo.html').toString()
    await knex.select('user_id','username','nickname')
    .from('Users')
    .then(users => {
        //ctx.body = mustache.render(template, { users })
        ctx.body = JSON.stringify(users);
    })
    
}//获取所有用户信息


const create = async (ctx) => {
    console.log('user_create is called')
    const id ;//id自增
    const username = ctx.params
    const nickname = ctx.params
    const pass = ctx.params


    const template = fs.readFileSync('/usr/src/app/views/user/index.html').toString()
    await knex('Users').insert({username: 'username',nickname:'nickname'})
    await knex.select('id')
    .from('Users')
    .where('id', id)

    await knex('User_auths').insert({user_id: 'id',identity_type:1,identify: 'username',credencial:pass})

    await knex.select('id','name','motto')
    .from('user')
    .where('id', id)
    .then(users => {
        if (users.length == 0) {
            ctx.body = mustache.render(template, { errormsg: '==' })
        } else
            ctx.body = mustache.render(template, { users })
    })
}//创建新用户,获取基本信息

const update = async (ctx) => {
    
}
const get = async (ctx) => {
    console.log('get is called')
    const id = ctx.params.id
    const template = fs.readFileSync('/usr/src/app/views/user/index.html').toString()

    await knex.select('id','name','motto')
    .from('user')
    .where('id', id)
    .then(users => {
        if (users.length == 0) {
            ctx.body = mustache.render(template, { errormsg: '==' })
        } else
            ctx.body = mustache.render(template, { users })
    })
}
const del = async (ctx) => {
    
}
const newuser = async (ctx) => {

}

const page = async (ctx) => {
    const template = fs.readFileSync('/usr/src/app/views/index.html').toString()
    ctx.body = template
}

module.exports = {
    index, create, update, get, del, newuser, page
}