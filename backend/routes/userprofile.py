from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import requests
import os
from dotenv import load_dotenv

from models.userprofile import UserProfile

load_dotenv()

router = APIRouter(prefix="/userprofile", tags=["userprofile"])



@router.get("/get", response_model=UserProfile)
def get_user_profile():

    access_token = os.environ["GARMIN_CONNECT_TOKEN"]

    headers = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + access_token
    }

    response = requests.get(
        "https://personal.connectapi.garmin.com/userprofile-service/userprofile/settings",
        headers=headers,
    )
    return response.json()