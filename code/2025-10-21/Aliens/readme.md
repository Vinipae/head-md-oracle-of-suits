# October 21, 2025 - Aliens Project

## Overview
Created an interactive 3D audiovisual experience featuring aliens, spaceships, and generative techno music using p5.js and WebGL.

## Project: Aliens

### Visual Components

**Scene Setup:**
- 3D WebGL canvas with dynamic camera movement
- Orbiting camera that rotates around the scene using sine/cosine functions
- Ambient and point lighting for depth and atmosphere

**Characters (50 total entities):**
- **10 Spaceships** with alien pilots inside
  - Flying saucer design with cockpit
  - Rotating bodies with animated light arrays (8 pulsing lights per ship)
  - Collision detection enabled
  
- **40 Free-floating Aliens**
  - Green spherical bodies with detailed heads
  - Animated eyes with pupils and blinking
  - Glowing antennas
  - "Happy" state with smile when colliding
  - Autonomous movement with edge wrapping

**Collision System:**
- When two aliens collide, they become "happy" and spawn a **Big Alien**
- Big aliens feature:
  - Dynamic scaling (grows to 60-100 units)
  - Vibrant, randomized RGB colors
  - Dancing/bobbing animations
  - Waving arms
  - Moving pupils that track rotation
  - Glowing auras and emissive materials
  - Wobbling/wiggling effects
  - Simplified rotation (primarily Y-axis)

### Audio System

**Generative Techno Music (140 BPM):**
- **Effects Chain:**
  - Reverb processor (2s decay, 1.5 damping)
  - Delay processor (250ms, 40% feedback)

- **Instruments:**
  1. **Kick Drum** - Hard four-on-the-floor pattern (every beat)
  2. **Bass** - Rolling sawtooth bassline in E minor (8-note pattern)
  3. **Hi-hats** - Fast 1/8 note rhythm with velocity variation
  4. **Arpeggiator** - 16th note patterns in E minor scale
  5. **Lead Synth** - Stabbing sawtooth synth (every 4 beats)
  6. **Pad** - Dark square wave chords (every 8 beats)
  7. **Collision Sound** - Laser zap effect with pitch sweep when aliens collide

### Technical Features
- Real-time 3D rendering with WebGL
- Particle system with 50 moving entities
- Complex collision detection between aliens
- Multiple synchronized audio oscillators
- Procedural animation systems (rotation, wobble, dance, blink)
- Responsive canvas that adapts to window size
- Audio visual synchronization (collisions trigger sounds)

### Key Interactions
- Aliens autonomously move through 3D space
- Collisions create happy expressions and spawn bigger aliens
- Spaceships orbit independently
- All audio is generative and loops continuously
- Big aliens stay visible longer with bouncing edge behavior

---

*Built with p5.js, p5.sound, and WebGL*

#### Videos

<video controls src="AlienDancefloor.mp4" title="Title"></video>