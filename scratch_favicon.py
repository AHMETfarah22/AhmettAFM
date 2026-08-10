from PIL import Image, ImageDraw, ImageFont
import os

# Create 256x256 transparent RGBA canvas
size = 256
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw circle background: Dark navy (#0F172A) with vibrant Red border (#EF4444)
stroke_w = 8
draw.ellipse((stroke_w, stroke_w, size - stroke_w, size - stroke_w), fill=(15, 23, 42, 255), outline=(239, 68, 68, 255), width=stroke_w)

# Try loading bold system font or default font
font = None
font_paths = ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/impact.ttf"]
for path in font_paths:
    if os.path.exists(path):
        try:
            font = ImageFont.truetype(path, 90)
            break
        except Exception:
            pass

if not font:
    font = ImageFont.load_default()

# Draw centered text "AFM" in bright red (#EF4444)
draw.text((size / 2, size / 2), "AFM", fill=(239, 68, 68, 255), font=font, anchor="mm")

# Save outputs
os.makedirs('assets', exist_ok=True)
img.save('assets/favicon-circle.png', 'PNG')
img.save('assets/favicon.ico')
print("Successfully generated red AFM circular favicon in assets/!")
