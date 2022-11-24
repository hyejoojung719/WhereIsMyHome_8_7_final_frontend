<template>
  <div>
    <Carousel></Carousel>
    <Intro></Intro>
    <News></News>
  </div>
</template>

<script>
import Carousel from "@/components/main/Carousel.vue";
import Intro from "@/components/main/Intro.vue";
import News from "@/components/main/News.vue";

export default { components: { Carousel, Intro, News } };
</script>

<style></style>
