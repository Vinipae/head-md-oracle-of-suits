# October 21, 2025 - Creative Coding Projects

## Overview
Developed three distinct p5.js projects exploring aliens through different technical approaches: 3D WebGL with generative music, 2D collision physics, and object-oriented programming with collections.

---

## Project 1: Aliens (3D WebGL)

### Description
An interactive 3D audiovisual experience featuring aliens, spaceships, and generative techno music.

### Visual Components

**Scene Setup:**
- 3D WebGL canvas with dynamic camera movement
- Orbiting camera using sine/cosine functions
- Ambient and point lighting for depth

**Characters (50 total entities):**
- **10 Spaceships** with alien pilots
  - Flying saucer design with cockpit
  - Rotating bodies with 8 pulsing lights per ship
  - Collision detection enabled
  
- **40 Free-floating Aliens**
  - Green spherical bodies with detailed heads
  - Animated eyes with pupils and blinking
  - Glowing antennas
  - "Happy" state with smile when colliding
  - Autonomous movement with edge wrapping

**Collision System:**
- Aliens collide and become "happy," spawning **Big Aliens**
- Big aliens feature:
  - Dynamic scaling (60-100 units)
  - Vibrant, randomized RGB colors
  - Dancing/bobbing animations
  - Waving arms and moving pupils
  - Glowing auras and emissive materials
  - Wobbling/wiggling effects

### Audio System

**Generative Techno Music (140 BPM):**
- **Effects**: Reverb (2s decay) + Delay (250ms, 40% feedback)
- **Instruments:**
  1. Kick Drum - Four-on-the-floor pattern
  2. Bass - Sawtooth bassline in E minor (8-note pattern)
  3. Hi-hats - Fast 1/8 note rhythm with velocity variation
  4. Arpeggiator - 16th note patterns in E minor
  5. Lead Synth - Stabbing sawtooth synth (every 4 beats)
  6. Pad - Dark square wave chords (every 8 beats)
  7. Collision Sound - Laser zap effect with pitch sweep

### Technical Highlights
- Real-time 3D rendering with WebGL
- 50 moving entities with collision detection
- Multiple synchronized audio oscillators
- Procedural animations (rotation, wobble, dance, blink)
- Audio-visual synchronization

#### Videos
<video controls src="AlienDancefloor.mp4" title="Alien Dancefloor"></video>
<video controls src="AliensWiggling.mp4" title="Aliens Wiggling"></video>

---

## Project 2: Array (2D Collision Physics)

### Description
100 aliens bouncing around the screen with collision detection and "hug" reactions.

### Visual Design

**Alien Anatomy:**
- Green oval torso (15x20px)
- Bright green head (20px diameter)
- White eyes with black pupils (expand when excited)
- Two antennas extending upward
- Animated waving arms (continuous sinusoidal motion)
- Mouth changes: smile → "O" shape when screaming

### Animation States
- **Normal**: Gentle arm waving (3px amplitude), closed smile
- **Excited** (30 frames): Large eyes, "O" mouth, dramatic waving (10px amplitude), pink "HUG!" text

### Technical Implementation

**Array System:**
- `values[]` - Y positions
- `xPositions[]` - X positions
- `speeds[]` - Velocity vectors
- `screams[]` - Excitement timer

**Physics:**
- Random speeds (-2 to 2 pixels/frame)
- Edge bouncing with velocity reversal
- Collision detection: distance check < 30px
- Velocity swap on collision

**Audio:**
- 2000 Hz sine wave "beep" on collision
- 150ms duration with fade out
- Prevents sound spam with single-play logic

#### Video
<video controls src="../AliensHugging.mp4" title="Aliens Hugging"></video>

---

## Project 3: Collection (OOP & Interaction)

### Description
Object-oriented exploration with interactive planets and aliens that can be dynamically added/removed.

### Visual Elements

**Planets:**
- Red circles (50px diameter)
- Subtle random wiggling
- Initial: "Kugu" (center) and "Toga" (top-left)

**Aliens:**
- Bright green head (30px)
- White eyes with red mouth
- Green antennas extending upward
- Darker green oval body (20x15px)
- Dark green arms angled outward
- Continuous wiggle animation

### Interactive Controls

- **Mouse Click**: Add new planet at cursor
- **'A' Key**: Spawn random alien
- **'S' Key**: Remove last planet (pop)
- **'D' Key**: Remove last alien (pop)

### Technical Architecture

**Classes:**
- `Planet` class: properties (x, y), methods (draw)
- `Alien` class: properties (x, y), methods (draw)

**Collections:**
- `planets[]` array
- `aliens[]` array
- `eyes[]` helper array

**Features:**
- Dynamic object creation/deletion
- Collection management (push/pop)
- Real-time user interaction
- Layered rendering for visual hierarchy

---

## Summary Statistics

**Total Projects**: 3  
**Total Aliens Created**: 152 (50 in 3D + 100 in 2D + 2 in Collection)  
**Technologies Used**: p5.js, p5.sound, WebGL  
**Key Concepts Explored**: 
- 3D graphics and camera systems
- Collision detection and physics
- Generative audio synthesis
- Object-oriented programming
- Array manipulation and collections
- User interaction (mouse, keyboard)
- Procedural animation

---

#### Videos

<video controls src="AlienDancefloor.mp4" title="Title"></video>

<video controls src="AliensHugging.mp4" title="Title"></video>

<video controls src="AliensWiggling.mp4" title="Title"></video>


