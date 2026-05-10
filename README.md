# [scootradio.com](https://scootradio.com/)
- API Documentation: [https://api.scootradio.com/docs](https://api.scootradio.com/docs)

## What is this?
ScootRadio is a free, open source web application for streaming my favorite public radio stations with now playing info.

## Local Development
The preferred development loop is Docker Compose:
- `docker compose up --build`
- frontend: `http://localhost:3000`
- backend API docs: `http://localhost:8000/docs`

The Docker Compose setup runs the frontend with `next dev` and the backend with Hypercorn reload enabled. Source files are mounted into both containers, so frontend and backend changes should hot reload without rebuilding the images. Rebuild when dependencies or Dockerfiles change.

You can still run services directly if needed:
1. Run the backend
    - cd `backend`
    - view `README.md`
2. Run the frontend
    - cd `frontend`
    - view `README.md`

## Deployment
- On a commit to main, the relevant services will be be built as containers and deployed to production.
