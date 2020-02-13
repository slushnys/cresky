from pydantic import BaseModel

class Request(BaseModel):
    destination: str
    source: str
    pax: int
    plane_type: str
    user: str
    



    