import os
import sys
import subprocess


def main():
    host = "::"  # IPv6 + IPv4 Bind
    port = int(os.getenv("PORT", 8000))

    cmd = [
        "gunicorn",
        "app.main:app",
        "-k",
        "uvicorn.workers.UvicornWorker",
        "--bind",
        f"[{host}]:{port}",
    ]

    print("Starting Gunicorn with command:", " ".join(cmd))
    result = subprocess.run(cmd)
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()
