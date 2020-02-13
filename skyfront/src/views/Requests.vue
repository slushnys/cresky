<template>
  <v-row>
    <v-col>
      Requests
      <v-list three-line>
        <template v-for="request in state.requests">
          <v-divider :key="request.id"></v-divider>

          <v-list-item :key="request.id" @click="openRequest">
            <v-list-item-avatar justify-center>
              <v-img
                src="https://images.unsplash.com/photo-1563580853122-1ea105e0e92a"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                <span v-if="request.ferry"></span>
                Flight from {{ request.origin }} to {{ request.destination }}
              </v-list-item-title>
              <v-list-item-subtitle class="font-weight-regular">
                <div>Block hours: {{ request.blockHours }}</div>
                <div>
                  Time required
                  {{ request.timeRequired }}
                  until {{ request.timeRequired }}
                </div>
              </v-list-item-subtitle>
              <v-row class="font-weight-light">
                <v-col>
                  <div>PAX {{ request.pax }}</div>
                </v-col>
                <v-col v-if="request.stops">
                  Stops {{ request.stops }}

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" small>mdi-information</v-icon>
                      <!-- <v-btn color="primary" dark >Left</v-btn> -->
                    </template>
                    <div
                      v-for="stop in request.stopsInfo"
                      class="pa-2"
                      :key="stop.origin"
                    >
                      <div class="font-weight-regular">
                        {{ stop.origin }} > {{ stop.destination }}
                      </div>
                      <div class="font-weight-light">
                        {{ stop.timeLiftoff }} > {{ stop.timeArrival }}
                      </div>
                    </div>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { createComponent, reactive, onMounted } from "@vue/composition-api";
import RequestLine from "../components/Requests/RequestLine.vue";
import router from "@/router";
import { useRequestStore } from "@/store/requests";
const component = createComponent({
  components: { RequestLine },
  setup() {
    const { state } = useRequestStore();
    const openRequest = (id: String) => router.push(`/requests/${id}`);
    return {
      state,
      openRequest
    };
  }
});
export default component;
</script>

<style scoped></style>
