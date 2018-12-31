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
//()->all user info
const index = async (ctx) => {
    const user = require('../models/user')
    console.log('index is called!')
    await user.user.index()
        .then(function (id) {
            ctx.body = { status: "success", data: id }
            return console.log(id);
        })
        .catch(err => {
            ctx.body = { status: "fail" }
            console.log(err)
        })
}
//(username)->user info
const get = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    r=ctx.params
    await user.user.get_user_name(r.username)
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
//(id)->user info
const get_id = async (ctx) => {
    const user = require('../models/user')
    console.log('get is called!')
    //console.log(ctx.require)
    r=ctx.params
    await user.user.get_user_id(r.id)
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
//(username,nickname,password)
const create_user = async (ctx) => {
    const user = require('../models/user')
    console.log('create is called!')
    r=ctx.request.body
    id =await  user.user.create_user(r.username, r.nickname,r.password)
    await user.user.create_auths(id,1,r.username,r.password)
        .then(
        (info) => {
            ctx.body = { status: "success", data: info }
            return console.log(id);
        }
        )
        .catch(err => {
            ctx.body = { status: "fail", data: err }
            console.log(err)
        })
}
//(id,sex,grade,major,tel,email,birthday)
const create_info = async (ctx) => {
    const user = require('../models/user')
    console.log('create_info is called!')
    r=ctx.request.body
    await user.user.create_info(r.id,r.sex,r.grade,r.major,r.tel,r.email,r.birthday)
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
//( id,grade,major,tel,email,birthday,motto) 更新某一id用户的附属信息表
const update_info = async (ctx) => {
    const user = require('../models/user')
    console.log('update info is called!')
    r=ctx.request.body
    await user.user.update_info(r.id,r.grade,r.major,r.tel,r.email,r.birthday,r.motto)
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
//(id,nickname,sex,avator)更新某一id用户的基本信息表
const update_user = async (ctx) => {
    const user = require('../models/user')
    console.log('update user is called!')
    r=ctx.request.body

    await user.user.update_user(r.id,r.nickname,r.sex,r.avator)
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

const del = async (ctx) => {
    const user = require('../models/user')
    console.log('del is called!')
    r=ctx.params
    await user.user.permit_user(r.id,0)
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
//(id,permit) 修改权限--1：社员，2：管理人员，3：社长 
const permit = async (ctx) => {
    const user = require('../models/user')
    console.log('del is called!')
    r=ctx.request.body
    await user.user.permit_user(r.id,r.permit)
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
const newuser = async (ctx) => {

}

const page = async (ctx) => {
    const template = fs.readFileSync('/usr/src/app/views/index.html').toString()
    ctx.body = template
}

module.exports = {
    index, create_user,create_info, update_user,update_info, get, del, permit,newuser, page,get_id
}