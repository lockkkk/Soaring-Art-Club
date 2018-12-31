<template>
<div>
    <el-row>
        <el-col :span="20" :offset="2" align="center">
            <h2>用户登录</h2>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="18" :offset="3">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="rawPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                    <el-button @click="handleLogin">注册</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
import md5 from 'blueimp-md5'
export default {
    name: "login",
    data() {
        return {
            username: "",
            rawPassword: ""
        }
    },
    computed: {
        password() {
            return md5(this.rawPassword)
        }
    }
}
</script>
