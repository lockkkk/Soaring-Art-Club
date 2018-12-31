<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <h2>{{ work.title }}</h2>
        </el-col>
        <el-col :span="8" :offset="2">
            <div class="info-box info">
                <img class="avatar" :src="work.avator"></img>
                <el-button class="info-item" type="text" @click="to(`/user/${work.uid}`)">{{ work.nickname }}</el-button>
                <span class="info-item">{{ new Date(work.create_time).toLocaleString() }}</span>
            </div>
        </el-col>
        <el-col :span="12" :offset="2">
            <div class="info-box" align="right"> 
                  <el-button type="primary" @click="to('/good/1')" round>收藏</el-button>
                  <el-button icon="el-icon-circle-plus" round>购买</el-button>
            </div>
        </el-col>

    </el-row>
    <el-row>
        <el-col :span="22" :offset="2">
            <img class="img-main" :src="work.address"></img>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="20" :offset="2">
            <h2>相关推荐</h2>
        </el-col>
    </el-row>


</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'work',
  data() {
    return {
      currentDate: new Date(),
      work: {}
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key, keyPath);
    },
    to(url) {
      this.$router.push(url)
    },
  },
  created() {
    const url = `http://localhost:3000/api/work/id/${this.$route.params.id}`
    axios.get(url)
          .then(res => {
              console.log('success!', res)
              this.work = res.data.data
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
.img-main {
    width: 100%;
}
</style>
