<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="state.drawer" dark app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/requests">
          <v-list-item-action>
            <v-icon>mdi-airplane-takeoff</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Requests</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-airplane-landing</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Responses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer" />
      <v-toolbar-title class="font-weight-black"
        >SKY<span class="orange--text">CO</span></v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-breadcrumbs :items="state.items" large></v-breadcrumbs>
        <div>
          <div v-if="state.wsNotificationShown">true</div>
          <div v-else>false</div>
        </div>

        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer dark app>
      <span class="white--text">&copy; SKYCO 2019</span>
    </v-footer>
    <v-snackbar v-model="state.wsNotificationShown">
      {{ state.wsNotificationMessage }}
      <v-btn color="red" text @click="state.wsNotificationShown = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { webSocketProxy } from "@/websockets";
import {
  createComponent,
  onMounted,
  ref,
  reactive
} from "@vue/composition-api";
import { useBaseStore } from "@/store/base";
const component = createComponent({
  props: {
    source: String
  },
  setup(props) {
    const { state } = useBaseStore();
    const wsProxy = webSocketProxy();
    return {
      state,
      onMounted
    };
  }
});
export default component;
</script>
