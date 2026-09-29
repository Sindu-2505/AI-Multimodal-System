from models.audio import analyze_audio

def analyze_interview(video_path):

    emotion = {
        "emotion": "Skipped",
        "score": 70,
        "feedback": "Emotion analysis temporarily disabled."
    }

    gaze = {
        "eye_contact": "Skipped",
        "score": 70,
        "feedback": "Gaze analysis temporarily disabled."
    }

    audio = analyze_audio(video_path)

    overall = round(
        (
            emotion["score"]
            + gaze["score"]
            + audio["speech_score"]
        ) / 3
    )

    return {
        "emotion": emotion,
        "gaze": gaze,
        "audio": audio,
        "overall_score": overall,
        "performance": "Demo Mode"
    }