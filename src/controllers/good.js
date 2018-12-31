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
    console.log('work index is called!')
    await user.good.index()
        .then(function (id) {
            ctx.body = { status: "success", data: id }
            return console.log(id);
        })
        .catch(err => {
            ctx.body = { status: "fail" }
            console.log(err)
        })
}
//(id)->user info 商品id
const get = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    r= ctx.params
    //r = ctx.request.body
    await user.good.findgood_id(r.id)
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
/*     r={
        title:'LOCKs ART',
        intr:'lovvvve',
        type:1,
        createid:1,
        status:1,
        ifsale:1,
        cnum:100,
        wnum:2,
        wid:[1,2]
    } */
    r = ctx.request.body
    id=await user.good.create(r.title, r.intr,r.type,r.createid,r.status,r.ifsale,r.cnum, r.wnum)
    for(i=0;i<r.wnum;i++)
    {
        await user.good.connect(id,r.wid[i])
    }
    ctx.body = { status: "success", data: id };
    return (console.log(id))

    
        // .then(
        // (info) => {
        //     ctx.body = { status: "success", data: info }
        //     return console.log(info);
        // }
        // )
        // .catch(err => {
        //     ctx.body = { status: "fail", data: err }
        //     console.log(err)
        // })
}
//(id)
const del = async (ctx) => {
    const user = require('../models/user')
    console.log('del is called!')
    //console.log(ctx.require)
    r= ctx.params
    await user.good.delete(r.id)
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