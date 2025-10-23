# October 23, 2025 - Alien Underwater Explorer

## Overview
Face-tracking experience that transforms users into an alien explorer in an animated underwater space environment with interactive bubble mechanics.

---

## Visual Elements

**Alien Character:**
- Green elongated head with pulsing glow and textured spots
- Large black eyes with cyan inner glow and blinking animation
- Animated mouth responding to jawOpen and mouthPucker (>0.4 triggers bubbles)
- Two waving antennae with glowing cyan tips

**Underwater Helmet:**
- Translucent cyan glass dome with reflection highlights
- Bronze metal collar with 12 bolts and breathing indicator
- Gray air tubes extending from sides

**Background World:**
- Purple-blue gradient with 200 twinkling stars
- 3 floating alien planets with glowing auras and rings
- 15 glowing jellyfish with animated tentacles
- 50 rotating asteroid rocks
- Swaying light rays from above

## Technical Features

**Face Tracking (MediaPipe):**
- Tracks 478 facial landmarks
- Uses nose tip, eyes, and mouth center for positioning
- Inverted X-axis for natural mirrored movement
- Blendshapes control mouth and bubble spawning

**Animation Systems:**
- Particle-based bubble system with upward physics
- Multi-layer arrays for planets, jellyfish, rocks, stars
- Screen wrapping for seamless loops
- Sine/cosine based pulsing and waving effects

**Interaction:**
- Pucker mouth (>0.4) to blow bubbles
- Open jaw to show alien mouth/tongue
- Face position controls alien movement

---

**Stack:** p5.js, MediaPipe Face Landmarks, JavaScript

### Video

<video controls src="AliensBubbles.mp4" title="Title"></video>

