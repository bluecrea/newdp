<template>
  <div class="swiper-container swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imgLength" :key="index">
        <img :src="item.showImage" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted } from 'vue'
import Swiper, {Autoplay, EffectCoverflow, Pagination, Navigation} from 'swiper'
Swiper.use([Autoplay, EffectCoverflow, Pagination, Navigation])
import '@/assets/style/swiper.less'

export default defineComponent({
  name: 'SwiperCon',
  emits: ['realIndex'],
  props: {
    imgLength: {
      type: Array
    }
  },
  setup(prop, ctx) {
    onMounted(() => {
      nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true, // false: this.activeIndex
          initialSlide: 0,
          observer:true,
          observeParents:true,
          spaceBetween: 25,
          effect: "cube",
          grabCursor: true,
          centeredSlides: true,
          //slidesPerView: 'auto',
          autoplay: true,
          /*autoplay: {
            delay: 4500,
            disableOnInteraction: false,
          },*/
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          },
          on: {
            slideChange: (e) => {
              ctx.emit('realIndex', e.realIndex)
            },
          },
        })
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