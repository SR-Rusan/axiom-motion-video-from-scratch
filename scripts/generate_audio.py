"""Generate the fresh 15-second AXIOM soundtrack without external assets."""

from math import exp, pi, sin
from pathlib import Path
import random
import struct
import wave


SAMPLE_RATE = 44100
DURATION = 15.0
TOTAL = int(SAMPLE_RATE * DURATION)
BPM = 126
BEAT = 60.0 / BPM
rng = random.Random(20261003)
samples = [0.0] * TOTAL


def add_tone(start: float, length: float, frequency: float, amplitude: float, decay: float = 4.0) -> None:
    start_index = max(0, int(start * SAMPLE_RATE))
    end_index = min(TOTAL, int((start + length) * SAMPLE_RATE))
    for index in range(start_index, end_index):
        t = index / SAMPLE_RATE - start
        envelope = min(1.0, t * 80.0) * exp(-decay * t / max(length, 0.01))
        samples[index] += sin(2.0 * pi * frequency * t) * amplitude * envelope


def add_kick(start: float, amplitude: float = 0.48) -> None:
    start_index = int(start * SAMPLE_RATE)
    length = int(0.19 * SAMPLE_RATE)
    for offset in range(length):
        index = start_index + offset
        if index >= TOTAL:
            break
        t = offset / SAMPLE_RATE
        frequency = 120.0 - 72.0 * min(1.0, t / 0.12)
        envelope = exp(-22.0 * t)
        samples[index] += sin(2.0 * pi * frequency * t) * amplitude * envelope


def add_tick(start: float, amplitude: float = 0.06) -> None:
    start_index = int(start * SAMPLE_RATE)
    length = int(0.035 * SAMPLE_RATE)
    for offset in range(length):
        index = start_index + offset
        if index >= TOTAL:
            break
        t = offset / SAMPLE_RATE
        samples[index] += (rng.random() * 2.0 - 1.0) * amplitude * exp(-105.0 * t)


# Dark pulse bed and a warm A-major color that blooms into the reveal.
for beat_index in range(int(DURATION / BEAT) + 1):
    start = beat_index * BEAT
    add_kick(start, 0.32 if beat_index % 4 else 0.52)
    add_tone(start, BEAT * 0.85, 55.0, 0.11, 2.8)
    add_tick(start + BEAT * 0.5, 0.045)

for start, frequency in [(0.0, 220.0), (4.5, 277.18), (7.0, 329.63), (10.5, 220.0), (13.0, 440.0)]:
    add_tone(start, 2.8, frequency, 0.08, 1.6)
    add_tone(start, 2.8, frequency * 1.5, 0.025, 1.9)

# Metallic transition accents and final crystalline chimes.
for start, frequency in [(1.9, 880.0), (4.45, 1174.66), (6.95, 1318.51), (8.75, 987.77), (12.9, 1318.51), (13.35, 1760.0), (14.0, 2217.46)]:
    add_tone(start, 0.42, frequency, 0.12, 7.0)

peak = max(abs(value) for value in samples) or 1.0
gain = 0.78 / peak
output = Path(__file__).resolve().parents[1] / "public" / "axiom_fresh_soundtrack.wav"
output.parent.mkdir(parents=True, exist_ok=True)

with wave.open(str(output), "wb") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    wav_file.writeframes(b"".join(struct.pack("<h", int(max(-1.0, min(1.0, value * gain)) * 32767)) for value in samples))

print(f"Generated {output} ({DURATION:.2f}s, {TOTAL} samples)")
