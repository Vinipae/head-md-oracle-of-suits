# Creative Coding Workshop
October 20-23, 2025

## Overview
Four-day intensive exploring interactive media through p5.js, WebGL, and machine learning. Projects progressed from basic generative art to advanced face tracking, culminating in fully realized audiovisual experiences.

---

## Day 0: October 20, 2025 - Warm-up

### Project 1: Generative Art (Infrared Branches)
**Concept:** Techno-ecological systems with flowing, organic patterns
- Perlin noise-driven branch growth with multiple generations
- HSB color mode (red/infrared spectrum)
- Additive blending for luminous glowing effects
- Mouse-influenced energy field
- Controls: SPACE (pause), R (regenerate)

#### Results
<img src="./2025-10-20/Generative Art/generativered1.png" alt="Generative Art 1" width="200">
<img src="./2025-10-20/Generative Art/generativered2.png" alt="Generative Art 2" width="400">
<img src="./2025-10-20/Generative Art/generativered3.png" alt="Generative Art 3" width="400">
<img src="./2025-10-20/Generative Art/generativered4.png" alt="Generative Art 4" width="400">
<img src="./2025-10-20/Generative Art/generativered5.png" alt="Generative Art 5" width="400">
<img src="./2025-10-20/Generative Art/generativered6.png" alt="Generative Art 6" width="400">

<video controls src="./2025-10-20/Generative Art/AbstractLines.mp4" title="Generative Art Animation"></video>

---

### Project 2: Smiling Pulse
**Concept:** Simple, cheerful pulsing emoji animation
- Heartbeat-like sine wave pulsing
- Centered composition
- Responsive to window resizing

#### Results
<video controls src="./2025-10-20/Smiling Pulse/SmilingPulses.mp4" title="Smiling Pulses"></video>

**Key Learnings:** Generative art principles, Perlin noise, HSB color space, additive blending

---

## Day 1: October 21, 2025 - Fundamentals

### Project 1: Aliens (3D WebGL + Generative Music)
**Concept:** 50 entities (10 spaceships + 40 aliens) in 3D space with collision-triggered music
- WebGL rendering with orbiting camera
- 7-instrument techno soundtrack (140 BPM)
- Collision system spawns colorful "Big Aliens"
- Real-time audio-visual synchronization

#### Results
<video controls src="./2025-10-21/AlienDancefloor.mp4" title="Alien Dancefloor"></video>
<video controls src="./2025-10-21/AliensWiggling.mp4" title="Aliens Wiggling"></video>

---

### Project 2: Array (2D Collision Physics)
**Concept:** 100 bouncing aliens that "hug" when colliding
- Array-based particle system with velocity management
- Collision detection with visual/audio feedback
- Excited state animation (30 frames)
- 2000 Hz beep on contact

#### Results
<video controls src="./2025-10-21/AliensHugging.mp4" title="Aliens Hugging"></video>

---

### Project 3: Collection (OOP Basics)
**Concept:** Interactive planet/alien spawner
- Class-based architecture (Planet, Alien)
- Mouse click: add planets | 'A' key: add aliens
- 'S'/'D' keys: remove last object
- Dynamic collection management

**Key Learnings:** Arrays, objects, collision detection, OOP, generative audio

---

## Day 2: October 22, 2025 - Hand Tracking

### Project: Hands (ERROR 404 Glitch Art)
**Concept:** Fingertips spawn cascading error messages
- MediaPipe hand tracking (21 landmarks/hand)
- Particle system (500 cap) with gravity physics
- 4 error types: "404", "ERROR", "NOT FOUND", "FAILED"
- Glitch aesthetic: scan lines, grid overlay, corruption effects
- Multi-hand support with real-time tracking

**Key Learnings:** MediaPipe integration, particle physics, glitch aesthetics, performance optimization

---

## Day 3: October 23, 2025 - Face Tracking

### Project: Face (Alien Underwater Explorer)
**Concept:** Transform into alien with underwater helmet
- MediaPipe face landmarks (478 points)
- Blendshape controls: mouthPucker (>0.4) = bubbles, jawOpen = mouth animation
- Alien features: pulsing head, blinking eyes, waving antennae
- Space-ocean environment: 200 stars, 3 planets, 15 jellyfish, 50 asteroids
- Natural mirrored movement (inverted X-axis)

#### Results
<video controls src="./2025-10-23/AliensBubbles.mp4" title="Aliens Bubbles"></video>

**Key Learnings:** Facial blendshapes, complex layered rendering, environmental design, expression mapping

---

## Technical Evolution

**Day 0:** Introduction
- Generative art basics
- Animation fundamentals
- Perlin noise

**Day 1:** Foundation
- p5.js basics, arrays, loops
- 2D/3D rendering
- Audio synthesis

**Day 2:** ML Integration
- Computer vision basics
- Hand landmark detection
- Real-time interaction

**Day 3:** Advanced ML
- Facial expression analysis
- Blendshape mapping
- Complex character rigging

---

## Stack
- **p5.js** - Graphics & animation
- **p5.sound** - Audio synthesis
- **MediaPipe** - Hand/face tracking
- **WebGL** - 3D rendering

---

## Statistics
- **Total Projects:** 7
- **Lines of Code:** ~2500+
- **Aliens Created:** 152
- **Particles Tracked:** 650+
- **Audio Instruments:** 7
- **ML Models Used:** 2 (Hands, Face)

---

*Creative Coding Workshop | October 20-23, 2025*