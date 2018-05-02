<template>
  <div class="gain">
    <!-- 切换 -->
      <tab></tab>
    <!-- 切换 --> 

    <!-- 待收收益 -->
    <income v-show="choose == 0"></income>
    <!-- 待收收益 -->

     <!-- 已收收益  -->
    <received v-show="choose == 1" v-if="loadGain"></received>
    <!-- 已收收益  -->
  </div>
</template>
<script>
import Tab from './Tab'
import Income from './Income'
import Received from './Received'
import { mapState } from 'vuex' 
export default {
  computed: mapState({
        choose: state => state.gain.choose,  //显示 待收收益/已收收益
        loadGain: state => state.gain.loadGain,  //是否加载过已收收益  
    }),
  components:{
    'tab':Tab,
    'income':Income,
    'received':Received
  }
}
</script>
<style lang="scss" scoped>
.gain{
  height: 100%;
  padding-top: .88rem;
}
</style>
