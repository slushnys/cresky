<template>
  <v-sheet class="mx-auto" color="lightgrey">
    <div class="d-flex">
      <div>id: {{ id }}</div>
      <div>from: {{ from }}</div>
      <div>to {{ to }}</div>
      <div>time{{ time }}</div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

const RequestLineComponent = createComponent({
  components: {},
  props: {
    from: String,
    to: String,
    time: String,
    id: String
  },
  setup(props, rawBindings) {}
});
export default RequestLineComponent;
</script>
