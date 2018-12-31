<template>
    <el-row>
        <el-col :span="18" :offset="3">
            <el-steps class="step" :active="step" finish-status="success" align-center>
                <el-step title="基本信息" description="填写用户名和密码"></el-step>
                <el-step title="个人信息" description="完善用户的个人信息"></el-step>
                <el-step title="完成" ></el-step>
            </el-steps>

            <el-form v-if="step == 1" ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="step += 1">下一步</el-button>
                </el-form-item>
            </el-form>
            <el-form v-if="step == 2" ref="form" :model="form" label-width="80px">
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.major"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.year"></el-input>
                </el-form-item>
                <el-form-item label="上传头像">
                    <el-upload
                      action="http://localhost:3000/api/upload"
                      type="avatar-uploader"
                      :on-success="handleSuccess"
                      :on-error="handleError"
                      :before-upload="beforeUpload"
                      name="picture"
                      list-type="picture"
                      >
                      <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
            <div v-if="step == 3">
                <p>注册成功！</p>
                <el-button type="primary">点击返回我的主页</el-button>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: "register",
    data() {
        return {
            password: '',
            step: 1,
            form: {
                name: '',
                nickname: '',
                password: '',
                gender: '',
                year: '',
                major: 0,
                phone: '',
                email: '',
                birthday: '',
            }
        }
    },
    methods: {
        onSubmit() {
            this.step += 1
            console.log('submit!')
        },
        handleSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
            this.path = res
        },
        handleError(err) {
            console.log(err)
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

<style>
.step {
    margin: 20px 0;
}
</style>
