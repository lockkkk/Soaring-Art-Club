<template>
<div>
    <el-carousel
        type="card"
        style="margin:20px 0;"
        indicator-position="outside">
        <el-carousel-item v-for="item in pictures" :key="item">
            <img class="head-image" :src="item"/>
        </el-carousel-item>
    </el-carousel>
    
    <store limit="4"></store>
    <works limit="8"></works>
</div>
</template>

<script>
import Works from './components/Works'
import Store from './components/Store'
export default {
  name: 'root',
  components: {
      Works, Store
  },
  data() {
    return {
      currentDate: new Date(),
      pictures: ['http://localhost:3000/static/main1.jpg', 'http://localhost:3000/static/main2.jpg','http://localhost:3000/static/main3.jpg','http://localhost:3000/static/main4.jpg'],
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
.head-image {
      object-fit: cover;
      max-height: 400px;
  }
</style>
