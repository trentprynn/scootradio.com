import sys
import subprocess
from app.core.config import settings


def start():
    host = "::"  # IPv6 + IPv4 Bind
    port = settings.PORT

    cmd = [
        "hypercorn",
        "app.main:app",
        "--bind",
        f"[{host}]:{port}",
    ]

    if settings.ENVIRONMENT == "development":
        cmd.append("--reload")

    print("Starting Hypercorn with command:", " ".join(cmd))

    process = subprocess.Popen(cmd)
    try:
        process.wait()
    except KeyboardInterrupt:
        print("KeyboardInterrupt received, shutting down gracefully...")
        process.terminate()
        process.wait()
        sys.exit(0)


def entrypoint():
    start()


def main():
    entrypoint()


if __name__ == "__main__":
    main()
