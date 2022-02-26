from fastapi import FastAPI, APIRouter, Request

from pydantic import BaseModel, HttpUrl

import requests

import os, uuid

app = FastAPI(
    title="ALign Twilio",
    openapi_url="/align/twilio/openapi.json",
    docs_url="/align/twilio/docs"
)

api_router = APIRouter(prefix="/align/twilio")

class Invitation(BaseModel):
    num: str
    inviter: str
    invitee: str
    invitation_url: HttpUrl

account_sid = os.environ.get("TWILIO_SID")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")

@api_router.get("/", status_code=200)
async def root() -> dict:
    return {"msg": "Welcome to ALign Twilio API"}

@api_router.post("/invite", status_code=200)
async def invite(request: Invitation) -> dict:
    phone = request.num
    inviter = request.inviter
    invitee = request.invitee
    invitation_url = request.invitation_url
    body = f"Hi {invitee},\nYou are invited to our wedding, {inviter}. Please see {invitation_url} to see the invitation. :)"
    url = "https://api.twilio.com/2010-04-01/Accounts/AC66f01d289767252436f377e1af928b34/Messages.json"
    params = {
        "Body": body,
        "From": "+19034626259",
        "To": phone
    }

    msg = requests.post(url=url, data=params, auth=(account_sid, auth_token))

    return {"msg": msg.json()}

@api_router.post("/collaborate", status_code=200)
async def collab(request: Request) -> dict:
    req = await request.json()
    room_name = req["room_name"] + "-" + str(uuid.uuid4())[:4]
    url_post = "https://video.twilio.com/v1/Rooms"
    create_room_params = {
        "UniqueName": room_name,
        "Type": "go"
    }
    requests.post(url=url_post, data=create_room_params, auth=(account_sid, auth_token))
    url_get = f"https://video.twilio.com/v1/Rooms/{room_name}"
    room = requests.get(url=url_get, auth=(account_sid, auth_token))

    return {"room": room.json()}

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8089, log_level="debug")
