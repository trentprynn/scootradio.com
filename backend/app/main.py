import traceback
from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from fastapi.responses import JSONResponse
from scripts.migrate import migrate
from scripts.seed import seed
from app.api.routes import radio_stations, health
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup events
    print("LIFECYCLE: Starting up")
    print("Running migrations")
    migrate()
    print("Running seed")
    seed()

    yield

    # shutdown events
    # no-op
    print("LIFECYCLE: Shutting down")


app = FastAPI(lifespan=lifespan)

origins = [
    "https://scootradio.com",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    print(f"An error occurred: {exc}")
    traceback.print_exc()  # This will print the full traceback
    return JSONResponse(
        status_code=500,
        content={"message": "An error occurred."},
    )


app.router.include_router(health.router, prefix="/health", tags=["health"])
app.router.include_router(
    radio_stations.router, prefix="/radio-stations", tags=["radio-stations"]
)
