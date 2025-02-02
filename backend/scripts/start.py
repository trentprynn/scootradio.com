import sys
import subprocess
from app.core.config import settings


def main():
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
    result = subprocess.run(cmd)
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()
