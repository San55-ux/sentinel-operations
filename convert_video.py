from PIL import Image, ImageSequence
import cv2
import numpy as np
import os

webp_path = r"C:\Users\sanja\.gemini\antigravity-ide\brain\46a62486-90e0-40fa-a12c-885f94ea11d7\sentinel_demo_video_1785910045787.webp"

gif_brain = r"C:\Users\sanja\.gemini\antigravity-ide\brain\46a62486-90e0-40fa-a12c-885f94ea11d7\sentinel_demo_video.gif"
gif_public = r"C:\Users\sanja\.gemini\antigravity-ide\scratch\sentinel-operations\public\sentinel_demo_video.gif"

mp4_brain = r"C:\Users\sanja\.gemini\antigravity-ide\brain\46a62486-90e0-40fa-a12c-885f94ea11d7\sentinel_demo_video.mp4"
mp4_public = r"C:\Users\sanja\.gemini\antigravity-ide\scratch\sentinel-operations\public\sentinel_demo_video.mp4"

print(f"Opening WebP: {webp_path}")
img = Image.open(webp_path)

frames_pil = []
durations = []

for frame in ImageSequence.Iterator(img):
    rgb_frame = frame.copy().convert("RGB")
    frames_pil.append(rgb_frame)
    durations.append(frame.info.get('duration', 100))

print(f"Extracted {len(frames_pil)} frames.")

# 1. Save Animated GIF
avg_duration = sum(durations) // len(durations) if durations else 100
frames_pil[0].save(
    gif_brain,
    save_all=True,
    append_images=frames_pil[1:],
    duration=avg_duration,
    loop=0
)
frames_pil[0].save(
    gif_public,
    save_all=True,
    append_images=frames_pil[1:],
    duration=avg_duration,
    loop=0
)
print("Saved GIF successfully!")

# 2. Save MP4 Video using OpenCV
width, height = frames_pil[0].size
fps = 1000.0 / avg_duration if avg_duration > 0 else 10.0

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_brain = cv2.VideoWriter(mp4_brain, fourcc, fps, (width, height))
out_public = cv2.VideoWriter(mp4_public, fourcc, fps, (width, height))

for pil_img in frames_pil:
    # Convert RGB PIL Image to BGR OpenCV Mat
    numpy_image = np.array(pil_img)
    bgr_image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)
    out_brain.write(bgr_image)
    out_public.write(bgr_image)

out_brain.release()
out_public.release()
print("Saved MP4 Video successfully!")
