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
const src = require('./md5.js')
var myDate = new Date();

var crypto = require('crypto');
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
function IsPermit(d) {
    var err;
    err = (d == 0|d == 1 | d == 2 | d == 3)
    console.log("check permit" + d + "----" + err);
    if (!err) throw'permit wrong';
    return err;
}//此处不允许执行删除操作
function IsAmount(d) {
    var err;
    err = (d <100&&d>0)
    console.log("check amount" + d + "----" + err);
    if (!err) throw 'amount wrong';
    return err;
}//此处不允许执行删除操作
function IsMajor(d) {
    var err;
    var reg = /^(([1-2]{1}[0-9]{1})|[0-9]{1}|[7]{1}[9]{1})$/;
    err = reg.test(d)
    console.log("check" + d + "----" + err);
    if (!err) throw 'major wrong';
    return err;
}
function IsGrade(d) {
    var err;
    err = !(d > myDate.getFullYear() || d < 2000) //获取完整的年份(4位,1970-????))
    console.log("check" + d + "----" + err);
    if (!err) throw 'grade wrong';
    return err;
}
function IsSex(d) {
    var err;
    var reg = /^[0-1]{1}$/;
    err = reg.test(d)
    console.log("check" + d + "----" + err);
    if (!err) throw 'sex wrong';
    return err;
}
function IsBirth(str) {
    var err;
    var reg = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))+/;
    err = reg.test(str)
    console.log("check" + str + "----" + (err | str.length == 0))
    if (!err && str.length != 0) throw 'email address wrong';
    return err;
}//可为空 1997-06-29
function IsEmail(str) {
    var err;
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    err = reg.test(str)
    console.log("check" + str + "----" + (err | str.length == 0));
    if (!err && str.length != 0) throw 'email address wrong';
    return err;
}//可为空
function IsTelCode(str) {
    var err;
    var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    err = reg.test(str)
    console.log("check" + str + "----" + err);
    if (!err) throw 'telphone number wrong';
    return err;
}
function IsUsername(str) {
    var err;
    var reg = /^[a-zA-Z0-9_-]{4,15}$/;
    err = reg.test(str)
    console.log("check" + str + "----" + err);
    if (!err) throw 'username is invaliable';
    return err;
}
function IsNickname(str) {
    var err;
    var reg = /^[\u4E00-\u9FA5 a-zA-Z0-9_-]{4,15}$/;
    err = reg.test(str)
    console.log("check" + str + "----" + err);
    if (!err) throw 'nickname is invaliable';
    return err;
}//需要由中文字符、英文、数字、下划线组成
function IsPasswaord(str) {
    var err;
    var reg = /^[\u4E00-\u9FA5 a-zA-Z0-9_-]{6,15}$/;
    err = reg.test(str)
    console.log("check" + str + "----" + err);
    if (!err) throw 'password is invaliable';
    return err;
}//需要由中文字符、英文、数字、下划线组成
function IsIdtype(d, str) {
    var err;
    if (d == 1)
        IsUsername(str);
    else if (d == 2)
        IsEmail(str);
    else if (d == 3)
        IsTelCode(str);
    else {
        console.log("check id type" + d + "----" + false);
        throw 'username is invaliable';
        return false;

    }
}
function IsTitle(title) {
    var err;
    err = (title.length < 20 && title.length > 2)
    console.log("check" + title + "----" + err);
    if (!err) throw 'title wrong';
    return err;
}


const user = {
    //输出所有用户基本信息
    index: function () {
        console.log("model_user")
        return knex.select('id', 'username', 'nickname', 'tel', 'email', 'permit')
            .from('AUTHOR').andWhere('permit', '>', 0);
    },
    //根据用户名查找某一用户全部信息
    get_user_name: function (username) {
        console.log("model_get_user_name")
        console.log(username)
        return knex.select('id', 'username', 'nickname', 'sex', 'create_time', 'grade',
            'birthday', 'major', 'tel', 'email', 'permit').from('AUTHOR').where('username', username).andWhere('permit', '>', 0);
    },

    //根据id查找某一用户全部信息
    get_user_id: function (id) {
        console.log("model_get_user_id")

        return knex.first('id', 'username', 'nickname', 'sex', 'create_time', 'grade', 'avator',
            'birthday', 'major', 'tel', 'email', 'permit').from('AUTHOR').where('id', id).andWhere('permit', '>', 0)
    },


    // 创建新用户基本信息 检查用户信息完整性 并返回用户id (对于数据库自己返回的错误类型如何处理？)
    create_user: function (username, nickname, password) {
        console.log("model_create_user")
        try {
            IsUsername(username)
            IsNickname(nickname)
            IsPasswaord(password)
        } catch (e) {
            return Promise.reject(e);
        }
        return knex('Users').insert({ 'username': username, 'nickname': nickname, 'permit': 0 })

    },

    //创建授权记录 检查id_type合法和对应性
    create_auths: function (id, id_type, identify, credential) {

        var data = md5(credential)//加密
        IsIdtype(id_type, identify)
        return knex('User_auths').insert({ 'user_id': id, 'indentity_type': id_type, 'identify': identify, 'credential': data })
    },

    // 通过id创建新用户附加信息 检查信息完整性 并返回用户id //email,birthday可为空（birthday数据库不允许为空，设置默认值2000-01-01）
    create_info: function (id, sex, grade, major, tel, email, birthday) {
        console.log("model_create_ifo")
        try {
            IsSex(sex)
            IsGrade(grade)
            IsMajor(major)
            IsEmail(email)
            IsTelCode(tel)
            IsBirth(birthday)
        } catch (e) {
            return Promise.reject(e);
        }
        return knex('User_info').insert({ 'id': id, 'sex': sex, 'grade': grade, 'birthday': birthday, 'major': major, 'tel': tel, 'email': email })

    },

    //根据id更新用户信息表(User_info)的记录 ,检查更新内容的合法性 //不能修改已删除用户？
    update_info: function (id, grade, major, tel, email, birthday, motto) {
        console.log("model_update_ifo")
        try {
            IsGrade(grade)
            IsMajor(major)
            IsEmail(email)
            IsTelCode(tel)
            IsBirth(birthday)
        } catch (e) {
            return Promise.reject(e);
        }
        return knex('User_info').where('id', id).update({ 'grade': grade, 'birthday': birthday, 'major': major, 'tel': tel, 'email': email, 'motto': motto })
    },

    //根据id更新用户基本表(User)的记录
    update_user: function (id, nickname, sex, avator) {
        console.log("model_update_user")
        try {
            IsNickname(nickname)
            IsSex(sex)
        } catch (e) {
            return Promise.reject(e);
        }
        return knex('Users').where('id', id).update({ 'nickname': nickname, 'sex': sex, 'avator': avator })
    },

    //根据username删除用户记录(permit置为0,1,2,3)
    permit_user: function (id, permit) {
        console.log("model_permit_user")
        try {
        IsPermit(d)
        }catch (e) {
            return Promise.reject(e);
        }
        
        return knex('AUTHOR').where('id', id).update('permit', permit)
    }

}
const work = {
    index: function () {
        console.log("model_work_Index")

        return knex('Works')
            .join('Users', 'Users.id', '=', 'Works.user_id')
            .select('Users.nickname', 'Works.id', 'title', 'create_time', 'address')
    },

    findwork_un: function (username) {
        console.log("model_work_find(username)")
        return knex('Works')
            .join('Users', 'Users.id', '=', 'Works.user_id')
            .select('Users.nickname', 'Works.id', 'title', 'create_time', 'address').where('Users.username', username)

    },
    findwork_uid: function (id) {
        console.log("model_work_find(userid)")
        return knex('Works')
            .join('Users', 'Users.id', '=', 'Works.user_id')
            .select('Users.nickname', 'Works.id', 'title', 'create_time', 'address').where('Users.id',id)

    },
    findwork_wid: function (id) {
        console.log("model_work_find(wid)")
        return knex('Works')
            .join('Users', 'Users.id', '=', 'Works.user_id')
            .first('Users.nickname', "Users.avator", 'Works.id', 'title', 'create_time', 'address').where('Works.id', id)

    },
    create: function (title, user_id, address) {
        console.log("model_work_create")
        try { IsTitle(title) }
        catch (e) {
            return Promise.reject(e);
        }
        return knex('Works')
            .insert({ 'title': title, 'user_id': user_id, 'address': address })
    },
    delete: function (id) {
        console.log("model_work_delate(id)")
        return knex('Works').where('id', id).del()
    }

}
const good = {
    index: function () {
        console.log("model_good_Index")
        return knex.select("id", "create_time", "title", "intr", "type", "create_id", "status", "if_sale", "num_c", "num_o", "num_w")
            .from('Goods')
    },
//通过作品id找作品
    findgood_id: function (id) {
        console.log("model_goods_find(id)")
        return knex('Goods')
            .select("id", "create_time", "title", "intr", "type", "create_id", "status", "if_sale", "num_c", "num_o", "num_w")
            .where('id', id)

    },
    create: function ( title, intr, type, create_id, status, if_sale, num_c,num_w) {
        console.log("model_good_create")
        try { 
            IsTitle(title)
            IsPermit(type)
            IsPermit(status)
        }
        catch (e) {
            return Promise.reject(e);
        }
        return knex('Goods')
            .insert({ 'title': title, 'intr': intr, 'type': type,'create_id':create_id,"status":status,"if_sale":if_sale,"num_c":num_c,"num_w":num_w })
    },
    delete: function (id) {
        console.log("model_goods_delate(id)")
        return knex('Goods').where('id', id).del()
    },
    connect:function(good_id,work_id){
        console.log("model_goods_connect")
        console.log(good_id,work_id)
        return knex('goods_work')
        .insert({'good_id':good_id,'w_id':work_id })
    }


}

const order = {
    index: function () {
        console.log("model_order_Index")
        return knex.select("id", "create_time", "comment", "amount", "good_id")
            .from('Orders')
    },

    findorder_oid: function (id) {
        console.log("model_orders_find(id)")
        return knex('Orders')
            .select("id", "create_time", "comment", "amount", "good_id")
            .where('id', id)

    },
    findorder_gid: function (id) {
        console.log("model_orders_find(gid)")
        return knex('Orders')
            .select("id", "create_time", "comment", "amount", "good_id")
            .where('good_id', id)

    },
    create: function ( comment, amount, good_id) {
        console.log("model_order_create")
        try { 
            IsAmount(amount)
        }
        catch (e) {
            return Promise.reject(e);
        }
        return knex('Orders')
            .insert({ 'comment': comment, 'amount': amount, 'good_id': good_id})
    },
    delete: function (id) {
        console.log("model_order_delate(id)")
        return knex('Orders').where('id', id).del()
    },



}
const update = {

    index: function () {
        console.log("model_update_Index")
       // var subquery = knex('Updates').join('Works', 'Works.id', '=', 'Updates.work_id').select('Works.user_id')
        
        return knex('Updates')
        .join('Works', 'Works.id', '=', 'Updates.work_id')
        .join('Users','Users.id', '=', 'Works.user_id')
        .select("Users.username","Updates.id", "Updates.create_time", "Updates.title", "Updates.context", "Updates.work_id","Works.address","Users.avator","Users.nickname")
        .orderBy('id', 'desc')
    },

    findupdate_un: function (username) {
        console.log("model_uodate_find(username)")
        return  knex('Updates')
        .join('Works', 'Works.id', '=', 'Updates.work_id')
        .join('Users','Users.id', '=', 'Works.user_id')
        .select("Users.username","Updates.id", "Updates.create_time", "Updates.title", "Updates.context", "Updates.work_id")
            .where('Users.username', username).orderBy('id', 'desc')

    },

    create: function (title, context,work_id) {
        console.log("model_update_create")
        try { 
            IsTitle(title)
        }
        catch (e) {
            return Promise.reject(e);
        }
        return knex('Updates')
            .insert({ 'title': title, 'context': context, 'work_id': work_id})
    },
    delete: function (id) {
        console.log("model_update_delate(id)")
        return knex('Updates').where('id', id).del()
    },
}

module.exports = { user, work,good ,order,update}
//module.exports = {user,work}

// Usage:
// const user = import('./modules/user')
// user.create().then(num => console.log())
