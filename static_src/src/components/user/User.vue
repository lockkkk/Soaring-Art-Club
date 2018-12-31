<template>
<div>
    <el-row>
        <el-col :span="16" :offset="2">
            <div class="info-box info">
                <img class="avatar" :src="user.avator"></img>
                <el-button class="info-item" type="text">{{ user.username }}</el-button>
                <el-button class="info-item" type="text">昵称: {{ user.nickname }}</el-button>
                <span class="info-item">加入时间: {{ new Date(user.create_time).toLocaleString() }}</span>
                <span class="info-item">电话: {{ user.tel }}</span>
                <span class="info-item">邮箱: {{ user.email }}</span>
            </div>
        </el-col>
        <el-col :span="4" :offset="2">
            <div class="info-box" align="right"> 
                  <el-button type="danger" icon="el-icon-warning" round>删除</el-button>
            </div>
        </el-col>
    </el-row>
    <works title="用户的所有插画" :url="`http://localhost:3000/api/work/uid/${$route.params.id}`"></works>
    <updates title="用户的所有动态" :url="`http://localhost:3000/api/update/username/${user.username}`"></updates>
</div>
</template>

<script>
import axios from 'axios'
import Works from '../Works.vue'
import Updates from '../Updates.vue'
export default {
    name: 'user',
    components: {
        Works, Updates
    },
    data() {
        return {
            user: {}
        }
    },
  created() {
    const url = `http://localhost:3000/api/user/get_id/${this.$route.params.id}`
    axios.get(url)
          .then(res => {
              console.log('success!', res)
              this.user = res.data.data
          })
          .catch(err => {
              console.log(err)
          })
  }

}

</script>

<style>
.avatar {
    height: 50px;
    width: 50px;
    background-color: #ffffff;
    border-radius: 25px;
    margin: 0 15px ;
}
.info-box {
    padding: 5px 15px;
    margin-bottom: 20px;
}
.info-item {
    margin: 0 8px;
}
.info{
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    border-radius: 15px;
}
</style>
