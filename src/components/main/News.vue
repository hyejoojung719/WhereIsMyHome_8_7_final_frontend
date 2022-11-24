<template>
  <div id="content" class="pt-16">
    <div class="displayBox" data-aos="fade-up" data-aos-duration="1000">
      <div id="title" class="mb-16">
        <h1>부동산 뉴스</h1>
      </div>
      <v-row justify="center" id="cards">
        <div>
          <v-card class="mx-auto" min-width="250" max-width="250" min-height="400">
            <v-card-title id="title1" @click="toNews1()"
              ><p class="title">{{ news1.title }}</p>
            </v-card-title>
            <v-card-subtitle id="pubDate1"> {{ news1.pubDate }} </v-card-subtitle>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text id="desc1"> {{ news1.description }} </v-card-text>
            </div>
          </v-card>
        </div>
        <div class="pl-10">
          <v-card class="mx-auto" min-width="250" max-width="250" min-height="400">
            <v-card-title id="title1" @click="toNews2()"
              ><p class="title">{{ news2.title }}</p>
            </v-card-title>
            <v-card-subtitle id="pubDate1"> {{ news2.pubDate }} </v-card-subtitle>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text id="desc1"> {{ news2.description }} </v-card-text>
            </div>
          </v-card>
        </div>
        <div class="pl-10">
          <v-card class="mx-auto" min-width="250" max-width="250" min-height="400">
            <v-card-title id="title1" @click="toNews3()"
              ><p class="title">{{ news3.title }}</p>
            </v-card-title>
            <v-card-subtitle id="pubDate1"> {{ news3.pubDate }} </v-card-subtitle>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text id="desc1"> {{ news3.description }} </v-card-text>
            </div>
          </v-card>
        </div>
        <div class="pl-10">
          <v-card class="mx-auto" min-width="250" max-width="250" min-height="400">
            <v-card-title id="title1" @click="toNews4()"
              ><p class="title">{{ news4.title }}</p>
            </v-card-title>
            <v-card-subtitle id="pubDate1"> {{ news4.pubDate }} </v-card-subtitle>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text id="desc1"> {{ news4.description }} </v-card-text>
            </div>
          </v-card>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";

export default {
  data: () => ({
    show: true,
    news: [],
    news1: {},
    news2: {},
    news3: {},
    news4: {},
  }),
  async created() {
    await this.getNews();

    // console.log("this.news[0].title : ", this.news);

    this.news1 = {
      title: this.news[0].title.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      link: this.news[0].link.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      pubDate: this.news[0].pubDate.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      description: this.news[0].description.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
    };

    // console.log("news1 : ", this.news1);

    this.news2 = {
      title: this.news[1].title.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      link: this.news[1].link.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      pubDate: this.news[1].pubDate.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      description: this.news[1].description.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
    };

    this.news3 = {
      title: this.news[2].title.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      link: this.news[2].link.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      pubDate: this.news[2].pubDate.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      description: this.news[2].description.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
    };

    this.news4 = {
      title: this.news[3].title.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      link: this.news[3].link.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      pubDate: this.news[3].pubDate.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
      description: this.news[3].description.replace(/(<([^>]+)>)|(&([^;]+);)/gi, ""),
    };
  },
  methods: {
    async getNews() {
      try {
        const { data } = await http.get("/news");
        // console.log("data : ", data.items);
        this.news = data.items;
        // console.log("news : ", this.news);
      } catch (error) {
        console.log(error);
      }
    },

    toNews1() {
      location.href = `${this.news1.link}`;
    },
    toNews2() {
      location.href = `${this.news2.link}`;
    },
    toNews3() {
      location.href = `${this.news3.link}`;
    },
    toNews4() {
      location.href = `${this.news4.link}`;
    },
  },
};
</script>

<style>
#content {
  width: 100%;
  height: 700px;
  background-color: #dcd7c9;
  position: relative;
}
#title {
  width: 100%;
  text-align: center;
  color: rgb(37, 37, 37);
}

.title:hover {
  cursor: pointer;
}
</style>
