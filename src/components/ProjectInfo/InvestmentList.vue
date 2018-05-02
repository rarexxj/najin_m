<template>
    <div class="investment" style="padding-top:1.68rem">
        <my-header title="投资记录"></my-header>
        <div class="investment__title">
            <div class="investment__title__item">投资人</div>
            <div class="investment__title__item">购买金额</div>
            <div class="investment__title__item">购买时间</div>
        </div>
        <div class="scroll-box" v-if="list.length > 0">
            <div class="bubble-box" :style="{'top':top + 'px'}">
            <bubble :y="bubbleY"></bubble>
        </div>
            <scroll class="investment__list__scroll" :data="list" :pullup="pullup" @scrollToEnd="loadBottom" :pulldown="pulldown" @pulldown="loadTop" :listenScroll="listenScroll" @scroll="scroll">
                <div class="scroll-wrapper">
                    <div class="investment__list__item" v-for="(item,index) in list" :key="index">
                        <div class="investment__list__item__name">{{item.nickname}}</div>
                        <div class="investment__list__item__money">{{item.money | formatNumber}}元</div>
                        <div class="investment__list__item__time">{{item.create_at}}</div>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="empty-gray" v-else></div>
    </div>
</template>
<script>
import Header from "../Common/Header";
import Scroll from "../Common/Scroll";
import Bubble from "../Common/Bubble";
import scrollText from "../Common/ScrollText";
import { Indicator } from "mint-ui";
export default {
  name: "investmentlist",
  data() {
    return {
      bubbleY: 0,
      listenScroll: true,
      posY: 0,
      pullup: true,
      pulldown: true,
      showScrollText: false,
      page: 1,
      total: 0,
      size: 15,
      list: []
    };
  },
  computed: {
    top() {
      return this.posY - 80;
    },
    canScroll() {
      //判断是否为最后一页，是否能再次加载
      if (this.page >= Math.ceil(this.total / this.size)) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    "my-header": Header,
    scroll: Scroll,
    bubble: Bubble,
    "scroll-text": scrollText
  },
  methods: {
    loadTop() {
      this.page = 1;
      this.getInvestmentList();
    },
    loadBottom() {
      this.page++;
      this.getInvestmentList();
    },
    scroll(pos) {
      this.posY = pos.y;
      this.bubbleY = pos.y - 80;
    },
    getInvestmentList(page) {
      //加载投资列表
      var _this = this;
      Indicator.open();
      this.$http
        .get("/project/investmentList", {
          params: {
            pid: _this.$route.query.id,
            page: _this.page,
            size: _this.size
          }
        })
        .then(function(res) {
          if (_this.page == 1) {
            _this.list = res.data.returnData.list;
          } else {
            _this.list = _this.list.cancat(res.data.returnData.list);
          }
          _this.total = Number(res.data.returnData.total);
          Indicator.close();
        })
        .catch(function() {
          Indicator.close();
        });
    }
  },
  mounted() {
    this.getInvestmentList();
  }
};
</script>
<style lang="scss" scoped>
.investment {
  &__title {
    width: 100%;
    height: 0.8rem;
    background: #ecf1f6;
    position: absolute;
    left: 0;
    top: 0.88rem;
    display: flex;
    &__item {
      flex: 1;
      height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      color: #666;
      line-height: 1;
    }
  }
  &__list {
    width: 100%;
    height: 100%;
    &__scroll {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    &__item {
      background: #fff;
      width: 100%;
      height: 1.24rem;
      display: flex;
      font-size: 0.26rem;
      line-height: 1;
      &__name {
        display: flex;
        width: 2.7rem;
        justify-content: center;
        align-items: center;
        color: #000;
      }
      &__money {
        display: flex;
        width: 2.1rem;
        justify-content: center;
        align-items: center;
        color: #ff5a59;
      }
      &__time {
        display: flex;
        width: 2.7rem;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #666666;
      }
    }
  }
}
</style>
