from moviepy import VideoFileClip
import librosa
import numpy as np
import os

def analyze_audio(video_path):

    audio_path = "uploads/temp_audio.wav"

    video = VideoFileClip(video_path)
    video.audio.write_audiofile(audio_path, logger=None)

    y, sr = librosa.load(audio_path)

    energy = np.mean(librosa.feature.rms(y=y)[0])

    score = min(int(energy * 1000), 100)

    if score >= 80:
        feedback = "Excellent speaking confidence."
    elif score >= 60:
        feedback = "Good speaking confidence."
    elif score >= 40:
        feedback = "Average speaking confidence."
    else:
        feedback = "Needs improvement in speaking confidence."

    if os.path.exists(audio_path):
        os.remove(audio_path)

    return {
        "speech_score": score,
        "feedback": feedback
    }


if __name__ == "__main__":

    result = analyze_audio("uploads/interview.mp4")

    print(result)