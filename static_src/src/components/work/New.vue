<template>
<div>
<el-row>
    <el-col :span="20" :offset="2">
        <h2>上传作品</h2>
    </el-col>
</el-row>
<el-row>
  <el-col :span="16" :offset="2">
    <el-form :model="form">
      <el-form-item label="作品名">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上传作品">
        <el-upload
          action="http://localhost:3000/api/upload"
          type="avatar-uploader"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :name="fileField"
          list-type="picture"
          >
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'new-work',
    data() {
        return {
            path: '',
            imageUrl: '',
            fileField: 'picture',
            form: {
                id: 1,
            }
        }
    },
    methods: {
        handleSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
            this.form.address = res.url
        },
        handleError(err) {
            console.log(err)
        },
        handleSubmit() {
            axios.post('http://localhost:3000/api/work/create', this.form)
                .then(res => {
                    // clear all and show dialog
                    // some dialog. click and jump
                    console.log('created!', res);
                    this.$router.push(`/work/${res.data.data[0]}`)
                    this.$message('创建作品成功!')
                })
                .catch(err => {
                    console.log('create Error!', err);
                })
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isEmpty = this.path.length == 0

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isEmpty) {
                this.$message.error('已经上传过一张文件了!')
            }
            return isJPG && isEmpty
        }
    }
}
</script>
