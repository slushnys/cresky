# Implementation of websockets

1. What client needs to do is create a websocket connection with server when the user is authenticated - open websocket connection during the successful authentication and keep in the vuex store.
2. If the user isnt authenticated, dont open any websocket connections.
3. Doesn't matter what view the user is on, he should be notified about the incoming request.
