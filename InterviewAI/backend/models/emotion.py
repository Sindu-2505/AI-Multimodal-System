from deepface import DeepFace
import cv2


def analyze_emotion(video_path):

    cap = cv2.VideoCapture(video_path)

    frame_count = 0

    emotion_counts = {}

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        # Analyze every 30th frame
        if frame_count % 30 != 0:
            continue

        try:
            result = DeepFace.analyze(
                frame,
                actions=["emotion"],
                enforce_detection=False
            )

            emotion = result[0]["dominant_emotion"]

            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1

        except Exception:
            continue

    cap.release()

    if len(emotion_counts) == 0:
        return {
            "emotion": "Unknown",
            "score": 0,
            "feedback": "No face detected."
        }

    dominant = max(emotion_counts, key=emotion_counts.get)

    score = round((emotion_counts[dominant] / sum(emotion_counts.values())) * 100)

    feedbacks = {
        "happy": "Candidate appeared confident and positive.",
        "neutral": "Candidate remained calm and composed.",
        "surprise": "Candidate appeared attentive.",
        "sad": "Candidate looked less confident.",
        "fear": "Candidate appeared nervous.",
        "angry": "Candidate appeared stressed.",
        "disgust": "Candidate appeared uncomfortable."
    }

    return {
        "emotion": dominant,
        "score": score,
        "feedback": feedbacks.get(dominant, "")
    }


# Test the module directly
if __name__ == "__main__":

    result = analyze_emotion("backend/uploads/interview.mp4")

    print(result)