<template>
  <div id="app">
    <v-app id="inspire">
      <v-carousel id="carouselItem1" cycle height="900" hide-delimiter-background :show-arrows="false">
        <div class="displayBox" data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="400" id="carouselText1">
          <div>Happy House</div>
        </div>
        <div
          class="displayBox"
          data-aos="fade-right"
          data-aos-offset="400"
          data-aos-easing="ease-in-sine"
          data-aos-delay="600"
          data-aos-duration="1000"
          id="carouselText2"
        >
          <div>Make your life happy</div>
        </div>
        <v-carousel-item id="carouselItem" v-for="(slide, i) in slides" :src="slide.src" :key="i"> </v-carousel-item>
      </v-carousel>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: require("@/assets/img/carousel1.png"),
        },
        {
          src: require("@/assets/img/carousel2.png"),
        },
        {
          src: require("@/assets/img/carousel3.png"),
        },
      ],
      status: false,
    };
  },
  methods: {
    showComment() {
      this.status = true;
    },
  },
};
</script>

<style scoped>
#carouselText1 {
  position: absolute;
  z-index: 2;
  font-size: 70px;
  font-weight: 400;
  /* top: 400px;
  left: 200px; */
  color: white;
  width: 100%;
  height: 800px;
  padding: 20px;
  text-align: center;
  line-height: 900px;
}
#carouselText2 {
  position: absolute;
  z-index: 2;
  font-size: 20px;
  font-weight: 300;
  /* top: 500px;
  left: 200px; */
  color: white;
  width: 100%;
  height: 800px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  line-height: 1000px;
}
</style>
