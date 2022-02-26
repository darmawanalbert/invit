from fastapi import FastAPI, APIRouter, Request

import requests

import json

app = FastAPI(
    title="ALign Twilio",
    openapi_url="/align/twilio/openapi.json",
    docs_url="/align/twilio/docs"
)

api_router = APIRouter(prefix="/align/twilio")

with open("env.json", "r") as envfile:
    twilio_creds = json.load(envfile)

account_sid = twilio_creds["main"]["accountSid"]
auth_token = twilio_creds["main"]["authToken"]

@api_router.get("/", status_code=200)
async def root() -> dict:
    return {"msg": "Welcome to ALign Twilio API"}

@api_router.post("/invite", status_code=200)
async def invite(request: Request) -> dict:
    req = await request.json()
    phone = req["num"]
    url = "https://api.twilio.com/2010-04-01/Accounts/AC66f01d289767252436f377e1af928b34/Messages.json"
    params = {
        "Body": "Bella main yuk ini yang kedua",
        "From": "+19034626259",
        "To": phone
    }

    msg = requests.post(url=url, data=params, auth=(account_sid, auth_token))

    return {"msg": msg.json()}


app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8089, log_level="debug")
