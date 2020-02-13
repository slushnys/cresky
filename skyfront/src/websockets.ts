import { useBaseStore } from "./store/base";
import { useRequestStore } from "./store/requests";
// import store from "@/store";

export const webSocketProxy = () => {
  const wsConnection = new WebSocket("ws://localhost:8001/ws/notifications");

  wsConnection.onopen = () =>
    console.log("ws notifications connection has been established");

  wsConnection.onclose = msg => {
    console.log(msg);
  };

  wsConnection.onerror = err => {
    console.error(err);
  };

  wsConnection.onmessage = event => {
    const baseStore = useBaseStore();
    const requestStore = useRequestStore();
    const messageData = JSON.parse(event.data);
    switch (messageData.type) {
      case "request":
        // On notification this adds additional entry, however when refreshed, the same entry is pulled from database.
        requestStore.addRequest(messageData.data);

        break;
      case "notification":
        // state.notification = true;
        // state.notificationMsg = messageData.message;
        baseStore.showNotification(messageData.message);
        // store.dispatch("EMIT_NOTIFICATION", messageData.message);
        break;
      default:
        console.log("default msg in requests");
    }
  };

  return wsConnection;
};

// const wsConnection = new WebSocket(
//   "ws://localhost:8001/ws/notifications"
// );

// wsConnection.onopen = () =>
//   console.log("ws notifications connection has been established");

// wsConnection.onclose = msg => {
//   console.log(msg);
// };

// wsConnection.onerror = err => {
//   console.error(err);
// };

// wsConnection.onmessage = event => {
//   const baseStore = useBaseStore();
//   const requestStore = useRequestStore();
//   const messageData = JSON.parse(event.data);
//   switch (messageData.type) {
//     case "request":
//       // On notification this adds additional entry, however when refreshed, the same entry is pulled from database.
//       requestStore.addRequest(messageData.data);

//       break;
//     case "notification":
//       // state.notification = true;
//       // state.notificationMsg = messageData.message;
//       baseStore.showNotification(messageData.message);
//       // store.dispatch("EMIT_NOTIFICATION", messageData.message);
//       break;
//     default:
//       console.log("default msg in requests");
//   }
// };
