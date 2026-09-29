import cv2
import mediapipe as mp

def analyze_gaze(video_path):

    mp_face_mesh = mp.solutions.face_mesh

    face_mesh = mp_face_mesh.FaceMesh(
        static_image_mode=False,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )

    cap = cv2.VideoCapture(video_path)

    frame_count = 0
    center = 0
    left = 0
    right = 0

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        frame_count += 1

        if frame_count % 30 != 0:
            continue

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = face_mesh.process(rgb)

        if results.multi_face_landmarks:

            landmarks = results.multi_face_landmarks[0].landmark

            nose = landmarks[1]
            iris = landmarks[468]

            diff = iris.x - nose.x

            if diff < -0.03:
                left += 1
            elif diff > 0.03:
                right += 1
            else:
                center += 1

    cap.release()

    total = left + right + center

    if total == 0:
        return {
            "eye_contact": "Unknown",
            "score": 0,
            "feedback": "Face not detected."
        }

    score = round((center / total) * 100)

    if score >= 80:
        feedback = "Excellent eye contact."
    elif score >= 60:
        feedback = "Good eye contact."
    elif score >= 40:
        feedback = "Average eye contact."
    else:
        feedback = "Needs improvement in eye contact."

    return {
        "eye_contact": f"{score}%",
        "score": score,
        "feedback": feedback
    }


if __name__ == "__main__":

    result = analyze_gaze("backend/uploads/interview.mp4")

    print(result)