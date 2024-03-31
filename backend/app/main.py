from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import root, health, radio_stations
from app.core.fast_api_handlers import lifespan, exception_handler


app = FastAPI(lifespan=lifespan)


origins = ["https://scootradio.com", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.router.include_router(root.router)
app.router.include_router(health.router)
app.router.include_router(radio_stations.router)

app.exception_handler(Exception)(exception_handler)
