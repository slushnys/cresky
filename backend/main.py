from typing import List
import datetime
import random
import json
from fastapi import FastAPI

from pydantic import BaseModel
from starlette.websockets import WebSocket, WebSocketDisconnect


app = FastAPI()


class Notifier:
    def __init__(self):
        self.clients: List[WebSocket] = []
        self.generator = self.get_notification_generator()

    async def get_notification_generator(self):
        while True:
            message = yield
            await self.notify(message)

    async def add_connection(self, client: WebSocket):
        await client.accept()
        self.clients.append(client)

    async def push(self, msg):
        await self.generator.asend(msg)

    async def remove_connection(self, client: WebSocket):
        self.clients.remove(client)

    async def notify(self, message: str):
        print("notified")

        for connection in self.clients:
            try:
                await connection.send_json(message)
            except Exception as e:
                print("error trying to communicate to client", e)
                self.clients.remove(connection)


notifier: Notifier = Notifier()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.websocket("/ws/notifications")
async def request_ws(websocket: WebSocket):
    await notifier.add_connection(websocket)
    try:
        while True:
            await websocket.receive()
    except WebSocketDisconnect as e:
        print("disconnect", e)
        notifier.remove_connection(websocket)


class Request(BaseModel):
    message: str


def get_request():
    request = {
        "id": "343",
        "origin": "LAX",
        "destination": "LDN",
        "pax": 150,
        "stops": 0,
        "stopsInfo": [],
        "planeType": "Boeing 787",
        "ferry": False,
        "ferryFrom": None,
        "blockHourPrice": 4200,
        "blockHours": 33,
        "pbd": False,
        "timeRequired": "2021-01-01 00:00",
    }
    return request


@app.post("/requests/")
async def received_request(request: Request):
    # ... save item to database

    # ... Successfully finished saving, lets emit a message to all the listeners
    await notifier.push(
        {
            "type": "notification",
            "message": "Lufthansa created an ACMI request from LAX TO LDN",
        }
    )
    await notifier.push({"type": "request", "data": get_request()})
    return {"success": "true"}


@app.on_event("startup")
async def startup():
    # Prime the push notification generator
    await notifier.generator.asend(None)
