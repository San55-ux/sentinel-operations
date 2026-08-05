import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

brain_dir = r"C:\Users\sanja\.gemini\antigravity-ide\brain\46a62486-90e0-40fa-a12c-885f94ea11d7"
click_dir = os.path.join(brain_dir, ".system_generated", "click_feedback")
public_dir = r"C:\Users\sanja\.gemini\antigravity-ide\scratch\sentinel-operations\public"

# Frame sequence with title captions
slides = [
    (os.path.join(brain_dir, "dashboard_main_view_1785910099006.png"), "1. Executive White Dashboard Header & KPI Metrics"),
    (os.path.join(click_dir, "click_feedback_1785910106481.png"), "2. Live Risk Table - Critical Risk Filtering"),
    (os.path.join(click_dir, "click_feedback_1785910170764.png"), "3. Telemetry Drawer Inspection (SHP-9842)"),
    (os.path.join(click_dir, "click_feedback_1785910198329.png"), "4. Reroute Intervention Directive Modal"),
    (os.path.join(brain_dir, "toast_notification_1785910217938.png"), "5. Authorized Reroute Directive & Toast Confirmation"),
    (os.path.join(brain_dir, "corridor_delay_analytics_1785910241756.png"), "6. Corridor Delay Analytics & Risk Index Graph"),
    (os.path.join(brain_dir, "python_inference_result_1785910287562.png"), "7. Python AI Anomaly Model & Execution Simulator"),
    (os.path.join(brain_dir, "audit_log_view_1785910311891.png"), "8. System Immutable Event Audit Log Trail")
]

# Destination paths
mp4_brain = os.path.join(brain_dir, "sentinel_demo_video.mp4")
mp4_public = os.path.join(public_dir, "sentinel_demo_video.mp4")

gif_brain = os.path.join(brain_dir, "sentinel_demo_video.gif")
gif_public = os.path.join(public_dir, "sentinel_demo_video.gif")

target_size = (1280, 720)
frames_processed_pil = []
frames_processed_cv2 = []

# Duration per slide: 2.5 seconds (at 20 fps = 50 sub-frames per slide)
fps = 20
slide_duration_sec = 2.5
frames_per_slide = int(fps * slide_duration_sec)

print("Processing video frames...")

for path, caption in slides:
    if not os.path.exists(path):
        print(f"Skipping missing: {path}")
        continue

    pil_img = Image.open(path).convert("RGB")
    pil_img = pil_img.resize(target_size, Image.Resampling.LANCZOS)

    # Draw Banner Overlay on top of image
    draw = ImageDraw.Draw(pil_img)
    # Banner background
    draw.rectangle([(0, 0), (1280, 45)], fill=(17, 24, 39)) # dark navy #111827
    
    # Try default font
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()
        
    draw.text((20, 10), f"Sentinel Operations Demo | {caption}", fill=(255, 255, 255), font=font)

    # Convert to OpenCV BGR
    cv_frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    for _ in range(frames_per_slide):
        frames_processed_pil.append(pil_img.copy())
        frames_processed_cv2.append(cv_frame)

print(f"Total compiled video frames: {len(frames_processed_cv2)} (~{len(frames_processed_cv2)/fps:.1f} seconds)")

# 1. Write MP4 Video
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_b = cv2.VideoWriter(mp4_brain, fourcc, fps, target_size)
out_p = cv2.VideoWriter(mp4_public, fourcc, fps, target_size)

for frame in frames_processed_cv2:
    out_b.write(frame)
    out_p.write(frame)

out_b.release()
out_p.release()
print(f"Successfully generated MP4 Video at: {mp4_brain}")

# 2. Write Animated GIF (sampling for smooth smaller payload)
gif_frames = frames_processed_pil[::5] # sample every 5th frame
gif_frames[0].save(
    gif_brain,
    save_all=True,
    append_images=gif_frames[1:],
    duration=250, # 250ms per frame
    loop=0
)
gif_frames[0].save(
    gif_public,
    save_all=True,
    append_images=gif_frames[1:],
    duration=250,
    loop=0
)
print(f"Successfully generated Animated GIF at: {gif_brain}")
