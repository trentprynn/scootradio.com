# [scootradio.com](https://scootradio.com/)
- API Documentation: [https://api.scootradio.com/docs](https://api.scootradio.com/docs)

## What is this?
ScootRadio is a free, open source web application for streaming public radio.

## Why
I wanted a PWA that allowed simple streaming of my favorite public radio stations.

## Run Locally
1. clone repository, navigate into it
2. `docker compose up --build`
3. open `http://localhost:3000`

The Docker Compose setup runs the frontend with `next dev` and the backend with Hypercorn reload enabled. Source files are mounted into both containers, so frontend and backend changes should hot reload without rebuilding the images. Rebuild when dependencies or Dockerfiles change.

## Local Development
The preferred development loop is Docker Compose:
- `docker compose up --build`
- frontend: `http://localhost:3000`
- backend API docs: `http://localhost:8000/docs`

You can still run services directly if needed:
1. Run the backend
    - cd `backend`
    - view `README.md`
2. Run the frontend
    - cd `frontend`
    - view `README.md`

## Deployment
- On a commit to main, the relevant services will be be built as containers and deployed to production.
