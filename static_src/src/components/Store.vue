<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <h2>{{ title }}</h2>
        </el-col>
    </el-row>
    <el-row>
      <el-col class="col" :span="8" v-for="(item, index) in goods" :key="index" :offset="3">
        <el-card :body-style="{ margin: '0px', padding: '0px'}">
          <div style="padding: 14px;">
            <span><router-link to="/good/1">{{ item.title }}</router-link></span>
            <p>{{ item.intr }}</p>
            <div class="bottom clearfix">
              <time class="time">{{ new Date(item.create_time).toLocaleString() }}</time>
              <p>已售: {{ item.num_o }}, 剩余: {{ item.num_c }}</p>
              <span>
                  <el-button @click="to(`/good/${item.id}`)"class="button" size="mini" round>查看</el-button>
                  <el-button @click="purchase(item.id)" class="button" icon="el-icon-circle-plus" size="mini" round>快速预购</el-button>
              </span>
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
  name: 'goods',
  props: {
      'limit': {},
      'title': {
          default: '受欢迎的商品'
      },
      url: {
          default: 'http://localhost:3000/api/good/index'
      }
  },
  data() {
    return {
      currentDate: new Date(),
      goods: [{}]
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
    purchase(good_id) {
      axios.post('http://localhost:3000/api/order/create', {
        comment: '',
        amount: 1,
        good_id: good_id
      })
      .then(res => {
        this.$alert(`您的预购码是 ${res.data.data[0]}.`, '预购成功!', {
          confirmButtonText: '确定'
        });
      })
    }
  },
  created() {
      axios.get(this.url)
          .then(res => {
              console.log('success!', res)
              this.goods = res.data.data
          })
          .catch(err => {
              console.log(err)
          })

  },
}
</script>

<style>
.button {
    margin: 0 10px;
}
.col {
    margin-bottom: 15px;
}
</style>
