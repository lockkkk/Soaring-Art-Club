<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <h2>{{ title }}</h2>
        </el-col>
    </el-row>
    <el-row>
      <el-col class="col" :span="5" v-for="(item, index) in works" :key="index" :offset="1">
        <el-card :body-style="{ margin: '0px', padding: '0px'}">
            <img :src="item.address" class="image">
          <div style="padding: 14px;">
              <span><router-link :to="'/work/' + item.id">{{ item.title }}</router-link></span>
            <div class="bottom clearfix">
              <time class="time">{{ new Date(item.create_time).toLocaleString() }}</time>
              <p>作者: {{ item.nickname }}</p>
              <el-button class="button" icon="el-icon-star-off" size="mini" round>收藏</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'works',
    props: {
        'limit': {},
        'title': {
            default: '受欢迎的作品'
        },
        url: {
            default: 'http://localhost:3000/api/work/index'
        }
    },
  data() {
    return {
      works: [{"nickname":"洛可","id":1,"title":"1111","create_time":"2017-12-23T02:04:46.000Z","address":"1231"},{"nickname":"洛可","id":2,"title":"2222","create_time":"2017-12-23T02:04:46.000Z","address":"2311313"},{"nickname":"洛可","id":3,"title":"1111","create_time":"2017-12-23T02:04:49.000Z","address":"1231"}]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key, keyPath);
    }
  },
  created() {
      axios.get(this.url)
          .then(res => {
              console.log('success!', res)
              this.works = res.data.data
          })
          .catch(err => {
              console.log(err)
          })

  },
}
</script>

<style>
.col {
    margin-bottom: 15px;
}
</style>
