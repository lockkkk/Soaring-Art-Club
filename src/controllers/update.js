const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'db',
        user: 'root',
        password: 'acat2333',
        database: 'SoaringDream'
    }
})
const mustache = require('mustache')
const fs = require('fs')

const index = async (ctx) => {
    const user = require('../models/user')
    console.log('update index is called!')
    await user.update.index()
        .then(function (id) {
            ctx.body = { status: "success", data: id }
            return console.log(id);
        })
        .catch(err => {
            ctx.body = { status: "fail" }
            console.log(err)
        })
}
//(username)->work info
const get = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    r= ctx.params
    await user.update.findupdate_un(r.username)
        .then(function (info) {
            if (info.length != 0) {
                ctx.body = { status: "success", data: info }
                return console.log(info);
            }
            else {
                console.log(info);
                ctx.body = { status: "fail" }
                return console.log('err')
            }
        })
}
//(title,id,address)//返回作品id
const create = async (ctx) => {
    const user = require('../models/user')
    console.log('create is called!')
    //console.log(ctx.require)
    //r = ctx.request.body
    r={
        title:"loving day",
        context:"aaaaaaa 12345",
        work_id: 1
    }
    await user.update.create(r.title, r.context, r.work_id)
        .then(
        (info) => {
            ctx.body = { status: "success", data: info }
            return console.log(info);
        }
        )
        .catch(err => {
            ctx.body = { status: "fail", data: err }
            console.log(err)
        })
}
//(id)
const del = async (ctx) => {
    const user = require('../models/user')
    console.log('del is called!')
    //console.log(ctx.require)
    r= ctx.params
    await user.update.delete(r.id)
        .then(
        (info) => {
            if (info == 1) {
                ctx.body =
                    { status: "success", data: info }
                return console.log(info);
            }
            else {
                ctx.body = { status: "fail", data: 'err' }
                return console.log('err')
            }
        }
        )
}

module.exports = {
    index, get, create, del
}