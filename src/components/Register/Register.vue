<template>
  <div id="register" class="register">
    <login-header :num="1"></login-header>
    <register-form></register-form>
  </div>
</template>
<script>
import LoginHeader from '../Login/LoginHeader.vue'
import RegisterForm from './RegisterForm.vue'
export default {
  components: {
    'login-header': LoginHeader,
    'register-form': RegisterForm
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.register {
  min-height: 100vh;
  background: #fff;
}
</style>
