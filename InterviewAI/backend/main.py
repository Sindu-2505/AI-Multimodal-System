from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from models.fusion import analyze_interview

app = FastAPI(title="Interview AI API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Interview AI Backend Running"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    video_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_interview(video_path)

    return result