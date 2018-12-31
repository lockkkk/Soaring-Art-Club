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
    console.log('order index is called!')
    await user.order.index()
        .then(function (id) {
            ctx.body = { status: "success", data: id }
            return console.log(id);
        })
        .catch(err => {
            ctx.body = { status: "fail" }
            console.log(err)
        })
}
//(oid)->order info 订单号查询order
const get_id = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    r = ctx.params
    console.log(ctx.request.rawBody)
    console.log(r)
    //r={id:2}
    await user.order.findorder_oid(r.id)
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
//(gid)->order info 商品查询order
const get_gid = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    //r={id:1}
    //r = ctx.require.body
    //console.log(ctx.params)
    r = ctx.params
    await user.order.findorder_gid(r.id)
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

//(title,intr,type,createid,status,ifsale,cnum, wnum,wid[])//返回商品id
const create = async (ctx) => {
    const user = require('../models/user')
    console.log('create is called!')
    //console.log(ctx.require)
    //  r={
    //     comment:'I want this',
    //     amount:20,
    //     good_id:2
    // } 
    r = ctx.request.body
    console.log(r)
    await user.order.create(r.comment, r.amount, r.good_id)
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
    r = ctx.params
    await user.order.delete(r.id)
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
    index, get_id,get_gid, create, del
}