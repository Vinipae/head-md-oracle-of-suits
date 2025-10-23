# Collection Project - Planets & Aliens

## Overview
Created an interactive 2D sketch exploring object-oriented programming with classes, collections, and user interaction. Features wiggling red planets and green aliens that can be added or removed dynamically.

## Visual Elements

**Planet Design:**
- **Appearance**: Red circular planets (50px diameter)
- **Behavior**: Subtle random wiggling movement (-1 to 1 pixels per frame)
- **Initial Setup**: Two planets named "Kugu" (center) and "Toga" (top-left quarter)

**Alien Design:**
- **Head**: Bright green circle (30px diameter)
- **Eyes**: White circles positioned at top of head (-5 offset from center)
- **Mouth**: Red oval at bottom of head
- **Antennas**: Two green lines extending upward from head
  - Left antenna: extends to upper-left
  - Right antenna: extends to upper-right
- **Body**: Darker green oval torso (20x15px) below head
- **Arms**: Dark green lines extending from body sides
  - Angle outward and downward
- **Behavior**: Continuous random wiggling (-1 to 1 pixels per frame)
- **Initial Setup**: Two aliens at predefined positions

## Technical Implementation

**Object-Oriented Design:**
- **Planet Class**: 
  - Properties: `x`, `y` position
  - Methods: `draw()` - renders and wiggles the planet
  
- **Alien Class**:
  - Properties: `x`, `y` position
  - Methods: `draw()` - renders the alien head
  - Additional features drawn in main draw loop (eyes, body, antennas, arms, mouth)

**Collection Arrays:**
- `planets[]` - stores all Planet objects
- `aliens[]` - stores all Alien objects
- `eyes[]` - helper array for eye positioning (created but not actively used in final version)

**Interactive Controls:**
- **Mouse Click**: Add new red planet at cursor position
- **'A' Key**: Spawn new alien at random screen location
- **'S' Key**: Remove last planet from collection (pop)
- **'D' Key**: Remove last alien from collection (pop)

**Animation System:**
- Black background cleared each frame
- All objects update position with `random(-1, 1)` for organic wiggling
- Layered drawing ensures proper visual hierarchy:
  1. Planets (background layer)
  2. Alien bodies and arms
  3. Alien heads
  4. Alien antennas
  5. Alien facial features (eyes, mouth)

## Key Features
- Dynamic object creation and deletion
- Class-based architecture for reusable code
- Collection management (push/pop operations)
- Real-time user interaction via mouse and keyboard
- Procedural wiggle animation for organic feel
- Layered rendering for complex character composition
- Responsive canvas that fits window size

## Learning Objectives
- Understanding JavaScript classes and constructors
- Working with arrays and collections
- Managing multiple object instances
- User input handling (mouse and keyboard events)
- Draw order and layering in 2D graphics

### Video

<video controls src="../AliensWiggling.mp4" title="Title"></video>
