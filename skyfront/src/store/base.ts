import { createStore } from "pinia";

export const useBaseStore = createStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "base",
  // a function that returns a fresh state
  state: () => ({
    wsNotificationMessage: "",
    wsNotificationShown: false,
    drawer: null,
    items: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_dashboard"
      },
      {
        text: "Requests",
        disabled: true,
        to: "requests"
      }
    ]
  }),
  // optional getters
  getters: {
    // doubleCount: (state, getters) => state.counter * 2,
    // use getters in other getters
    // doubleCountPlusOne: (state, { doubleCount }) => doubleCount.value * 2
  },
  // optional actions
  actions: {
    showNotification(message) {
      console.log("showing notification");
      this.state.wsNotificationShown = true;
      this.state.wsNotificationMessage = message;
    }
  }
});
