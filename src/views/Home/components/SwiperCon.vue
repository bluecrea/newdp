<template>
  <div class="swiper-container swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="https://goss.cfp.cn/creative/vcg/800/new/VCG41N728851723.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="https://img5.51tietu.net/pic/2019-081313/101l4yex5sj101l4yex5sj.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import Swiper, {Autoplay, EffectCoverflow, Pagination, Navigation} from 'swiper'
Swiper.use([Autoplay, EffectCoverflow, Pagination, Navigation])
import '@/assets/style/swiper.less'

export default defineComponent({
  name: 'SwiperCon',
  setup() {
    onMounted(() => {
      new Swiper('.swiper', {
        loop:!0,
        spaceBetween: 25,
        effect: "cube",
        grabCursor: true,
        centeredSlides: true,
        //slidesPerView: 'auto',
        autoplay: {
          delay: 3500,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }
        /*on: {
          navigationShow: () => {
            console.log("按钮显示了");
          }
        },*/
      })
    })
  }
})
</script>

<style lang="less" scoped>
.swiper-slide {
  img {
    width: 193px;
    height: 252px;
  }
}
</style>