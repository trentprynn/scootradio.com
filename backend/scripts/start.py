import os
import uvicorn


def main():
    host = "0.0.0.0"
    reload = os.getenv("ENVIRONMENT", None) == "development"
    port = int(os.getenv("PORT", 8000))

    uvicorn.run("app.main:app", host=host, port=port, reload=reload)


if __name__ == "__main__":
    main()
