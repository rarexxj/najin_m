<template>
  <div class="register">
    <login-header :num="0"></login-header>
    <login-form type="1"></login-form>
  </div>
</template>
<script>
import LoginHeader from '../Login/LoginHeader.vue'
import LoginForm from './LoginForm'
export default {
  components: {
    'login-header': LoginHeader,
    'login-form': LoginForm
  }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.register {
  min-height: 100vh;
  background: #fff;
}
</style>
