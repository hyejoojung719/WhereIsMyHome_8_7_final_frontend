<template>
  <v-app>
    <SearchView />
    <div class="d-flex justify-content">
      <ApartListView />
      <ApartMapView />
    </div>
  </v-app>
</template>

<script>
import SearchView from "@/components/map/SearchView.vue";
import ApartListView from "@/components/map/ApartListView.vue";
import ApartMapView from "@/components/map/ApartMapView.vue";

export default {
  components: {
    SearchView,
    ApartListView,
    ApartMapView,
  },
};
</script>

<style></style>
