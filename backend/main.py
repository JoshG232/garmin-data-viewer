from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.activity import router as activity_router
from routes.userprofile import router as user_profile_router

app = FastAPI(
    title="Garmin Data Viewer API",
    description="Backend for fetching and serving Garmin Health API data",
    version="0.1.0",
)

# CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(activity_router, prefix="/api", tags=["activities"])
app.include_router(user_profile_router, prefix="/api", tags=["user_profile"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}