<template>
    <div class="password">
        <my-header title="密码修改" :fix="fix" :border="border"></my-header>
        <div class="password__box">
            <div class="cell">
                <input type="password" class="cell__input" placeholder="旧密码" v-model="opwd">
            </div>
            <div class="cell">
                <input type="password" class="cell__input" placeholder="新密码（6-20位字母+数字，字母开头）" v-model="pwd">
            </div>
            <div class="cell">
                <input type="password" class="cell__input" placeholder="确认新密码" v-model="spwd">
            </div>
        </div>
        <div class="button" @click="change()">确认修改</div>
    </div>
</template>
<script>
import Header from '../Common/Header'
export default {
    data() {
        return {
            fix: false,
            border: true,
            opwd: '', //原密码
            pwd: '', //新密码
            spwd: '' //确认密码
        }
    },
    components: {
        'my-header': Header
    },
    methods: {
        change() {
            if (!this.opwd) {
                this.$toast("请输入原密码")
                return false;
            }

            if (!this.pwd) {
                this.$toast("请输入新密码")
                return false;
            }
            if (!/^[a-zA-Z]\w{5,19}$/.test(this.pwd)) {
                this.$toast("密码格式错误,6-20位字母+数字组合，以字母开头")
                return false;
            }
            if (this.pwd == this.opwd) {
                this.$toast("新旧密码不能相同")
                return false;
            }
            if (!this.spwd) {
                this.$toast("请输入确定新密码")
                return false;
            }
            if (this.spwd != this.pwd) {
                this.$toast("设置2次密码不相同")
                return false;
            }
            let _this = this;
            this.$http.post('user/pwd', {
                pwdo: this.opwd,
                pwd: this.pwd,
            }).then(function(res) {
                _this.$toast("修改成功")
                _this.$store.commit('SET_USERINFO', {})
                // _this.plus.cook.delete('userInfo')  //清空个人信息
                window.localStorage.removeItem('userInfo')
                _this.opwd = ''
                _this.pwd = ''
                _this.spwd = ''
                setTimeout(() => {
                    _this.$router.push({ name: 'index' })
                }, 1000)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.password {
    &__box {
        padding-left: 0.3rem;
        background: #fff;
        margin-top: 0.2rem;
        margin-bottom: 0.78rem;
    }
    .cell__input {
        width: 6.9rem;
    }
}
</style>
