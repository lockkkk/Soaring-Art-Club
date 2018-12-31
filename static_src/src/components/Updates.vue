<template>
<div>
    <el-row>
        <el-col :span="10" :offset="2">
            <h2>{{ title }}</h2>
        </el-col>
        <el-col align="right" class="self-filter" :span="8" :offset="0">
            <span>只看自己</span>
            <el-switch
                v-model="selfFilter"
                active-color="#13ce66"
                inactive-color="#ccc">
            </el-switch>
        </el-col>
    </el-row>
    <el-row>
      <el-col class="update-item" :span="18" v-for="(item, index) in updates" :key="index" :offset="3">
      <img :src="item.address" class="update-image">
      <div class="update-content">
            <div class="info-box info">
                <img class="avatar" :src="item.avator"></img>
                <el-button class="info-item" type="text" @click="to('/user/1')">{{ item.nickname }}</el-button>
                <span class="info-item">{{ new Date(item.create_time).toLocaleString() }}</span>
                <span class="info-item">{{ item.title }}</span>
            </div>
            <div class="update-text">{{ item.context }}</div>
            <div class="info-box" align="right"> 
                  <el-button type="primary" @click="to(`/work/${item.work_id}`)" round>前往作品</el-button>
                  <el-button icon="el-icon-circle-plus" round>转发</el-button>
            </div>
      </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'updates',
  props: {
      'limit': {},
      'title': {
          default: '全部动态'
      },
      url: {
          default: 'http://localhost:3000/api/update/index'
      }
  },
  data() {
    return {
      selfFilter: false,
      currentDate: new Date(),
      updates: []
    }
  },
  computed: {
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key, keyPath);
    },
    to(url) {
      this.$router.push(url)
    }
  },
  created() {
      axios.get(this.url)
          .then(res => {
              console.log('success!', res)
              this.updates = res.data.data
          })
          .catch(err => {
              console.log(err)
          })

  },
}
</script>

<style>
.self-filter {
    color: #bbb;
    padding: 25px;
}
.button {
    margin: 0 10px;
}
.update-image {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    width: 20vw;
}
.update-item {
    margin-bottom: 15px;
    border-radius: 10px;
    border-right: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    display: flex;
}
.update-content {
    flex-direction: column;
    display: flex;
    padding: 15px;
    flex: 1;
}
.update-text {
    flex: 1;
    padding: 15px;
}
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
