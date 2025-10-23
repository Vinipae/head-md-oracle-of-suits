# October 22, 2025 - Hand Tracking Error 404 Project

## Overview
Created an interactive digital art piece that transforms hand tracking into a visual glitch experience, spawning "ERROR 404" particles from fingertips using MediaPipe hand detection.

---

## Project: Hands - ERROR 404 Visualization

### Description
A glitch-aesthetic experience where hand movements generate cascading error messages and digital artifacts in real-time.

### Visual Design

**Background:**
- Dark void (black canvas)
- Animated red glitch scan lines with random vertical offset
- Green grid overlay (50px spacing) for digital aesthetic
- Updates every 3 frames for performance

**Fingertip Markers:**
- Red warning circles at all 5 fingertips per hand (10 total)
- Pulsing animation using sine wave
- "404" text in Courier New font at center
- Red X symbol overlay
- 3 orbiting glitch particles per fingertip
- Markers track: thumb tip, index tip, middle tip, ring tip, pinky tip

**Error Particles:**
- Spawn from all fingertips every 3 frames
- 4 different error messages: "404", "ERROR", "NOT FOUND", "FAILED"
- 4 glitch colors: Red, Green, Blue, Yellow
- Each particle has:
  - Random velocity (-2 to 2 horizontal, -3 to -1 vertical)
  - Gravity effect (0.1 acceleration)
  - Rotation animation
  - Fading lifespan (255 → 0)
  - Random scale (0.5 to 1.5x)
  - Glitch duplication effect (30% chance)
  - Pixel corruption trails (20% chance)

### Technical Implementation

**Hand Tracking:**
- Uses MediaPipe Hands library (via MediaPipeHands.js)
- Detects multiple hands simultaneously
- Tracks 21 landmarks per hand
- Focuses on 5 fingertip landmarks: [4, 8, 12, 16, 20]

**Particle System:**
- Array-based particle management (`error404Particles[]`)
- Each particle object contains:
  - Position (x, y)
  - Velocity (vx, vy)
  - Life counter (alpha value)
  - Glitch type (0-3)
  - Size multiplier
  - Rotation angle

**Performance Optimization:**
- Particle cap at 500 simultaneous particles
- Old particles automatically removed when life reaches 0
- Spawn rate controlled by frame counter
- HTML elements hidden to reduce rendering overhead

**Visual Effects:**
- Random glitch offset recalculated every 3 frames
- Sine wave pulsing on fingertip symbols
- Orbiting particles around fingertips
- Text rotation and scaling
- Multi-layered corruption effects
- Bold Courier New typography for digital aesthetic

### Key Features
- Real-time hand tracking via webcam
- Multi-hand support (tracks both hands)
- Generative error message spawning
- Physics-based particle motion with gravity
- Glitch art aesthetic with scan lines
- Responsive canvas that fits window
- Performance-optimized particle system
- Digital dystopia visual theme

### Interaction
- Move hands in front of webcam to activate
- Fingertips automatically generate error particles
- Faster hand movement = more particle density
- Multiple hands create overlapping glitch fields

---

## Technical Stack
- **p5.js** - Canvas rendering and animation
- **MediaPipe Hands** - Real-time hand landmark detection
- **JavaScript** - Core logic and particle system

### Video

<video controls src="Error404.mp4" title="Title"></video>