# Array Project - Hugging Aliens

## Overview
Created an interactive 2D animation featuring 100 aliens that bounce around the screen, collide with each other, and express excitement when they "hug" (collide).

## Visual Elements

**Alien Design:**
- **Body**: Green oval torso (15x20px)
- **Head**: Bright green circle (20px diameter) drawn on top of body
- **Eyes**: White circles with black pupils (expand when excited)
- **Antennas**: Two bright green lines extending from the top of the head
- **Arms**: Animated waving arms that move continuously
  - Wave amplitude increases dramatically when screaming "HUG!"
  - Sinusoidal motion creates natural waving effect
- **Mouth**: 
  - Normal state: Simple curved smile
  - Excited state: Wide "O" shape for screaming

**Animation States:**
- **Normal State**: Gentle arm waving, closed-mouth smile
- **Excited State** (30 frames duration): 
  - Larger eyes
  - Open "O" mouth
  - Dramatic arm waving (10px amplitude vs 3px)
  - Pink "HUG!" text appears above head

## Technical Implementation

**Array-Based System:**
- `values[]` - Y positions for all 100 aliens
- `xPositions[]` - X positions for all 100 aliens
- `speeds[]` - Velocity vectors (x, y) for each alien
- `screams[]` - Timer counter for excitement state

**Physics:**
- Each alien moves independently with random speeds (-2 to 2 pixels/frame)
- Edge bouncing: aliens reverse direction when hitting canvas boundaries
- Collision detection: checks distance between all alien pairs
- Collision response: aliens swap velocities when they collide (< 30px apart)

**Audio System:**
- Procedural sound using p5.Oscillator
- 2000 Hz sine wave "beep" on collision
- 150ms duration with fade out
- Only plays once per collision (prevents sound spam)

**Collision Detection:**
- Nested loop checks all alien pairs (i, j where j > i)
- Distance calculation using `dist()` function
- 30-pixel collision threshold
- Triggers both visual and audio responses

## Key Features
- 100 simultaneously animated characters
- Real-time collision detection and response
- Smooth frame-based animations
- Responsive canvas that fits window size
- Layered drawing for proper depth (body → arms → head)
- State management for temporary excitement reactions

### Video

<video controls src="../AliensHugging.mp4" title="Title"></video>

