from fastapi import FastAPI, APIRouter, Request

from twilio.rest import Client

import json

app = FastAPI(
    title="ALign Twilio",
    openapi_url="/align/twilio/openapi.json",
    docs_url="/align/twilio/docs"
)

api_router = APIRouter(prefix="/align/twilio")

with open("env.json", "r") as envfile:
    twilio_creds = json.load(envfile)

account_sid = twilio_creds["cakraocha"]["accountSid"]
api_key = twilio_creds["cakraocha"]["apiKey"]
api_secret = twilio_creds["cakraocha"]["apiSecret"]
# account_sid = "AC66f01d289767252436f377e1af928b34"
# auth_token = "54a9080e5e349b2594a8545327630ffa"

twilio_client = Client(account_sid, api_key, api_secret)
# twilio_client = Client(account_sid, auth_token)

@api_router.get("/", status_code=200)
async def root() -> dict:
    return {"msg": "Welcome to ALign Twilio API"}

@api_router.post("/invite", status_code=200)
async def invite(request: Request) -> dict:
    req = await request.json()
    print(req["num"])
    msg = twilio_client.messages.create(
        body="Wildan memang Hot. Dari Clarisca :* :*",
        from_="+19034626259",
        to=req["num"]
    )

    return {"msg": msg}


app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8089, log_level="debug")
