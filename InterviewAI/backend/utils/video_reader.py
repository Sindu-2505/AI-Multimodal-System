import cv2

# Path to the uploaded interview video
video_path = "backend/uploads/interview.mp4"

# Open the video
cap = cv2.VideoCapture(video_path)

# Check if video opened successfully
if not cap.isOpened():
    print("❌ Error: Unable to open video.")
    exit()

frame_count = 0

print("▶ Video is playing... Press 'Q' to quit.")

while True:
    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    # Display the video
    cv2.imshow("Interview Video", frame)

    # Press Q to stop
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

print(f"\n✅ Total Frames Processed: {frame_count}")