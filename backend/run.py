import uvicorn
import os
import sys

# Ensure backend root is on sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(backend_dir)
if project_dir not in sys.path:
    sys.path.insert(0, project_dir)

if __name__ == "__main__":
    uvicorn.run(
        "backend.app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
