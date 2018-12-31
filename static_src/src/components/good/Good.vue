<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2">
            <h2>这是作品的名字</h2>
        </el-col>
        <el-col :span="8" :offset="2">
            <div class="info-box info">
                <img class="avatar"></img>
                <el-button class="info-item" type="text" @click="to('/user/1')">作者</el-button>
                <span class="info-item">时间</span>
            </div>
        </el-col>
        <el-col :span="12" :offset="2">
            <div class="info-box" align="right"> 
                  <el-button type="primary" @click="to('/good/1')" round>收藏</el-button>
                  <el-button @click="purchase($route.params.id)" icon="el-icon-circle-plus" round>购买</el-button>
            </div>
        </el-col>

    </el-row>
    <el-row>
        <works limit="2" title="同商品相关的作品..."></works>
    </el-row>


</div>
</template>

<script>
import Works from '../Works.vue'
export default {
  name: 'good',
  components: { Works },
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
