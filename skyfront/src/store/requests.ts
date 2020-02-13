import { createStore } from "pinia";
interface Request {
  id: string;
  origin: string;
  destination: string;
  pax: number;
  stops: number;
  stopsInfo?: Array<any>;
  planeType: string;
  ferry: boolean;
  ferryFrom: string;
  blockHourPrice: number;
  blockHours?: number;
  pbd?: boolean;
  timeRequired?: string;
}
export const useRequestStore = createStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "requests",
  // a function that returns a fresh state
  state: () => ({
    requests: [
      {
        id: "2",
        origin: "SAN",
        destination: "LAX",
        pax: 77,
        stops: 0,
        stopsInfo: [],
        planeType: "Airbus 320",
        ferry: false,
        ferryFrom: null,
        blockHourPrice: 1500,
        blockHours: 6,
        pbd: false,
        timeRequired: new Date().toLocaleString()
      },
      {
        id: "3",
        origin: "LAX",
        destination: "AMS",
        pax: 50,
        stops: 2,
        stopsInfo: [
          {
            origin: "LAX",
            destination: "LND",
            timeArrival: "20:10",
            timeLiftoff: "10:10"
          },
          {
            origin: "LND",
            destination: "SWE",
            timeArrival: "24:15",
            timeLiftoff: "22:45"
          }
        ],

        planeType: "Airbus 320",
        ferry: true,
        ferryFrom: "SAN",
        blockHourPrice: 3200,
        blockHours: 20,

        pbd: false,
        timeRequired: new Date().toLocaleString()
      }
    ] as Request[]
  }),
  // optional getters
  getters: {},
  // optional actions
  actions: {
    addRequest(request: Request) {
      console.log("added", request);
      this.state.requests = [...this.state.requests, request];
    },
    removeRequest(requestId) {
      // `this` is the store instance
      const newRequests = this.state.requests.filter(
        (r: Request) => r.id !== requestId
      );
      this.state.requests = newRequests;
    }
  }
});
