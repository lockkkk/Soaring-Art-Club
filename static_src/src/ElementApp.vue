<template>
<el-container>
  <el-header>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="/">Soaring Dream</el-menu-item>
      <el-menu-item index="/works">作品</el-menu-item>
      <el-menu-item index="/updates">动态</el-menu-item>
      <!-- <el-menu-item index="/activities">社团活动</el-menu-item> -->
        <el-menu-item index="/store">商城</el-menu-item>
      <el-submenu index="2">
        <template slot="title">创建</template>
        <el-menu-item index="/work/new">作品</el-menu-item>
        <el-menu-item index="/update/new">动态</el-menu-item>
        <el-menu-item index="/good/new">商品</el-menu-item>
      </el-submenu>
      <el-menu-item index="/register" style="float:right;">注册</el-menu-item>
      <el-menu-item index="/login" style="float:right;">登录</el-menu-item>
    </el-menu>
  </el-header>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-aside class="hidden-md-and-down">
        <el-row class="aside">
            <h3>今日插画排行榜</h3>
            <div v-for="(item, index) in ranking_works" :key="index" class="rank-item">
                <img class="rank-img" @click="to(`/work/${item.id}`)" :src="item.address"></img>
                <div>
                    <span class="rank-rank">Rank #{{ index + 1 }}</span>
                    <div @click="to(`/work/${item.id}`)">{{ item.title }}</div>
                <el-button class="info-item" type="text" @click="to('/user/1')">{{ item.nickname }}</el-button>
                </div>
            </div>
        </el-row>
    </el-aside>
  </el-container>
</el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'element-app',
  data() {
    return {
      visible: false,
      currentDate: new Date(),
      ranking_works: []
    }
  },
  computed: {
      permission() {
          return this.$localStorage.get('user').permission
      },
      loggedIn() {
          return this.$localStorage.get('loggedIn')
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
    const url = `http://localhost:3000/api/work/index`
    axios.get(url)
          .then(res => {
              console.log('success!', res)
              this.ranking_works = res.data.data.slice(0, 3)
          })
          .catch(err => {
              console.log(err)
          })
  }
}
</script>

<style>
  .aside {
      padding: 20px;
      border-radius: 20px;
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .image {
      object-fit: cover;
      max-height: 400px;
  }

  // for ad
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .rank-img {
      height: 80px;
      width: 80px;
      background-color: #eeeeee;
      margin-right: 15px;
  }
  .rank-item {
      padding: 15px;
      display: flex;
      border: 1px soild black;
      align-items: center;
  }
  .rank-rank {
      font-witght: bold;
      font-size: 1.2em;
  }
</style>
