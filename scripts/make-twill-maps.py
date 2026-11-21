"""Génère les cartes PBR du sergé (normal, rugosité, albédo neutre) à partir de la macro public/images/twill-370.png."""
import numpy as np
from PIL import Image, ImageFilter

SIZE = 1024
src = Image.open('public/images/twill-370.png').convert('L').resize((SIZE, SIZE), Image.LANCZOS)
h = np.asarray(src, dtype=np.float32) / 255.0

# On retire l'éclairage large (grand flou) pour ne garder que le relief du fil.
low = np.asarray(src.filter(ImageFilter.GaussianBlur(40)), dtype=np.float32) / 255.0
detail = h - low
detail = detail / (np.abs(detail).max() + 1e-6)

# Normal map (Sobel) -- convention OpenGL (Y+) attendue par three.js
strength = 5.0
dx = (np.roll(detail, -1, 1) - np.roll(detail, 1, 1)) * strength
dy = (np.roll(detail, -1, 0) - np.roll(detail, 1, 0)) * strength
nz = np.ones_like(dx)
n = np.stack([-dx, dy, nz], -1)
n /= np.linalg.norm(n, axis=-1, keepdims=True)
Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8)).save('public/textures/twill-normal.jpg', quality=88)

# Rugosité : coton mat, un peu plus lisse sur le dessus des fils
rough = np.clip(0.88 - detail * 0.12, 0, 1)
Image.fromarray((rough * 255).astype(np.uint8)).resize((512, 512), Image.LANCZOS).save('public/textures/twill-rough.jpg', quality=85)

# Albédo neutre (multiplie la couleur du coloris) : ombres entre les fils, hautes lumières sur les fils
alb = np.clip(0.82 + detail * 0.35, 0, 1)
Image.fromarray((alb * 255).astype(np.uint8)).save('public/textures/twill-albedo.jpg', quality=88)
print('ok')
