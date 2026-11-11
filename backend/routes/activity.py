import os
from typing import Optional

import requests
from fastapi import APIRouter, HTTPException, Query

from models.activity import ActivityResponse

router = APIRouter(prefix="/activities", tags=["Activities"])


@router.get("/fetch", response_model=list[ActivityResponse])
async def get_activities(
    offset: int = Query(0, ge=0, description="Pagination offset"),
    limit: int = Query(20, ge=1, le=100, description="Number of activities"),
    activity_type: Optional[str] = Query(None, description="Filter by activity type"),
    start_date: Optional[str] = Query(None, description="Filter by start date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="Filter by end date (YYYY-MM-DD)"),
):
    access_token = os.environ["GARMIN_CONNECT_TOKEN"]

    headers = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + access_token
    }

    try:
        response = requests.get(
            "https://personal.connectapi.garmin.com/activitylist-service/activities/search/activities",
            headers=headers,
            params={"limit": limit, "start": offset},
            timeout=30,
        )
        response.raise_for_status()
        activities = response.json()
    except requests.RequestException as exc:
        status_code = exc.response.status_code if exc.response is not None else 502
        raise HTTPException(
            status_code=502,
            detail=f"Garmin API request failed with status {status_code}",
        ) from exc

    if not isinstance(activities, list):
        raise HTTPException(
            status_code=502,
            detail="Garmin API returned an unexpected response; expected a list of activities",
        )

    return activities