"""Génère favicons, icônes PWA et image de partage (OG) dans public/. Nécessite Google Chrome (rendu SVG → PNG) et Pillow."""
import re, subprocess, tempfile, pathlib, shutil
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / 'public'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
INK, BONE, MAGENTA = '#0b0b0b', '#efebe3', '#ff2bd6'
STAR = 'M50 0C53 30 58 42 100 50C58 58 53 70 50 100C47 70 42 58 0 50C42 42 47 30 50 0Z'

logo_src = (ROOT / 'src/lib/logo-paths.ts').read_text()
VIEWBOX = re.search(r'LOGO_VIEWBOX = "([^"]+)"', logo_src).group(1)
LOGO_PATHS = re.findall(r'^\s*"(M[^"]+)",?$', logo_src, re.M)

def icon_svg(size=512, radius=0.22, pad=0.2, bg=INK, fg=BONE):
    s = size * (1 - 2 * pad)
    o = size * pad
    r = size * radius
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">'
            f'<rect width="{size}" height="{size}" rx="{r}" fill="{bg}"/>'
            f'<g transform="translate({o} {o}) scale({s/100})"><path d="{STAR}" fill="{fg}"/></g></svg>')

def og_svg():
    w, h = 1200, 630
    vb = [float(x) for x in VIEWBOX.split()]
    lw = 640; k = lw / vb[2]; lh = vb[3] * k
    paths = ''.join(f'<path d="{d}"/>' for d in LOGO_PATHS)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<rect width="{w}" height="{h}" fill="{INK}"/>'
            f'<svg x="70" y="170" width="{lw}" height="{lh}" viewBox="{VIEWBOX}" fill="{BONE}">{paths}</svg>'
            f'<g transform="translate(830 150) scale(3.2)" fill="{BONE}" opacity="0.95"><path d="{STAR}"/></g>'
            f'<text x="70" y="540" font-family="Montserrat, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="4" fill="{BONE}" opacity="0.8">LE STREETWEAR QUI SE PORTE PAR-DESSUS LE CORSET</text>'
            f'<rect x="70" y="565" width="120" height="6" fill="{MAGENTA}"/></svg>')

def render(svg, out, w, h=None):
    h = h or w
    with tempfile.TemporaryDirectory() as t:
        p = pathlib.Path(t) / 'a.html'
        p.write_text(f'<html><body style="margin:0;background:transparent">{svg.replace("<svg ", f"<svg style=\'display:block;width:{w}px;height:{h}px\' ", 1)}</body></html>')
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
                        f'--window-size={w},{h}', f'--screenshot={out}', f'file://{p}'], check=True, capture_output=True)

(PUB / 'favicon.svg').write_text(icon_svg(64, 0.22, 0.2))
(PUB / 'icon.svg').write_text(icon_svg(180, 0.22, 0.2))
for old in ['icon-light-32x32.png', 'icon-dark-32x32.png', 'apple-icon.png', 'icons.svg']:
    (PUB / old).unlink(missing_ok=True)

for size in (16, 32, 48):
    render(icon_svg(size, 0.22, 0.14), PUB / f'favicon-{size}x{size}.png', size)
render(icon_svg(180, 0, 0.2), PUB / 'apple-touch-icon.png', 180)           # iOS arrondit lui-même
render(icon_svg(192, 0.22, 0.2), PUB / 'android-chrome-192x192.png', 192)
render(icon_svg(512, 0.22, 0.2), PUB / 'android-chrome-512x512.png', 512)
render(icon_svg(512, 0, 0.3), PUB / 'maskable-512x512.png', 512)           # zone de sécurité large
render(og_svg(), PUB / 'og-image.png', 1200, 630)

imgs = [Image.open(PUB / f'favicon-{s}x{s}.png').convert('RGBA') for s in (16, 32, 48)]
imgs[2].save(PUB / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[:2])
(PUB / 'favicon-48x48.png').unlink()
print('ok')
