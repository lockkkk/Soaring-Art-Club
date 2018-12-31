<template>
<div>
<el-row>
        <el-col :span="20" :offset="2">
            <h2>用户管理</h2>
        </el-col>
  <el-table
    :data="userData"
    style="width: 100%">
     <el-table-column
        prop="id"
        label="ID"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-col :span="20" :offset="2">
        <h2>订单管理</h2>
    </el-col>
    <el-table
    :default-sort = "{prop: 'date', order: 'descending'}"
    :data="orderData"
    style="width: 100%">
     <el-table-column
        prop="id"
        label="ID"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="good_id"
        label="商品ID"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="备注"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="总量"
        sortable
        width="180">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'users',
  data() {
    return {
      userData: [],
      orderData: [],
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      console.log(key, keyPath);
    }
  },
  created() {
      axios.get('http://localhost:3000/api/user/index')
          .then(res => {
              console.log('success!', res)
              this.userData = res.data.data
          })
          .catch(err => {
              console.log(err)
          })
    axios.get('http://localhost:3000/api/order/index')
          .then(res => {
              console.log('success!', res)
              this.orderData = res.data.data
          })
          .catch(err => {
              console.log(err)
          })

  },
}
</script>