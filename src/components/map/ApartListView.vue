<template>
  <div id="app" class="d-flex justify-content-start">
    <v-app id="inspire">
      <v-card v-if="houses[0] && houses[0].length != 0" class="mx-auto" min-width="300" min-height="700">
        <v-list>
          <v-list-item-group color="secondary">
            <v-list-item v-for="(house, i) in houses[0]" :key="i">
              <v-list-item-icon>
                <!-- <v-icon large color="secondary"> mdi-home </v-icon> -->
                <v-img src="@/assets/img/home_icon.png" width="30px"></v-img>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="house.apartmentName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-card v-else class="mx-auto" min-width="300" min-height="700"> </v-card>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("mapStore", ["houses"]),
  },
};
</script>

<style scoped>
.v-card {
  height: 700px;
  overflow-y: auto;
}
</style>
