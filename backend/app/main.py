from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.fast_api_handlers import lifespan, exception_handler
from fastapi.staticfiles import StaticFiles
from app.radio_stations.routes.radio_stations import router as RadioStationRouter
from app.base.routes.root import router as RootRouter

app = FastAPI(
    lifespan=lifespan,
    title="ScootRadio API",
    contact={
        "name": "Trent Prynn",
        "email": "trentprynn@gmail.com",
    },
)

origins = ["https://scootradio.com", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.router.include_router(RootRouter)
app.router.include_router(RadioStationRouter)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.exception_handler(Exception)(exception_handler)
