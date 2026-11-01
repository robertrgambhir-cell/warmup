import json, subprocess, base64, os, hashlib, soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro('kokoro.onnx', 'voices.bin')
lines = json.load(open('lines11.json')); out = {}
os.makedirs('mp3', exist_ok=True)
for ln in lines:
    t, v = ln['t'], ln['v']
    if t in out: continue
    h = hashlib.md5((v + t).encode()).hexdigest()[:10]
    mp3 = f'mp3/{h}.mp3'
    if not os.path.exists(mp3):
        speed = 1.0 if v == 'af_heart' else 1.05
        samples, sr = k.create(t, voice=v, speed=speed, lang='en-us')
        sf.write('tmp.wav', samples, sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'tmp.wav', '-ac', '1', '-b:a', '48k', mp3], check=True)
    out[t] = 'data:audio/mpeg;base64,' + base64.b64encode(open(mp3, 'rb').read()).decode()
json.dump(out, open('clips11.json', 'w'))
print(len(out), sum(len(x) for x in out.values()) // 1024, 'KB')
