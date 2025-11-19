## Neon Road Timeline Cursor

### Usage

```jsx
import Timeline from "@/components/Timeline";

export default function Schedule() {
  return (
    <Timeline
      onRoadEnter={() => console.log("Road focus")}
      onRoadLeave={() => console.log("Road blur")}
      onHoverFlag={(event) => console.log("Flag hover", event.id)}
      onLeaveFlag={(event) => console.log("Flag leave", event.id)}
    />
  );
}
```

- `onRoadEnter`: fired when the cursor enters the winding road area (magnetic snap enabled).
- `onRoadLeave`: fired when the cursor leaves the road; the cursor returns to idle mode.
- `onHoverFlag`: fired when a flag is hovered (pointer scales up, confetti + pulse triggered).
- `onLeaveFlag`: fired when the pointer exits an event flag.

### Assets

- `public/animations/heist-cursor.json`: Lottie clip (60 fps) for the metallic coin + tail, suitable for marketing exports.
- `src/assets/timeline/road-mask.svg`: SVG mask of the road centerline for advanced clipping/scroll effects.
- `src/assets/timeline/flag-icons.svg`: three flag symbols (`#flag-idle`, `#flag-hover`, `#flag-selected`) for custom marker swaps.

### Styling

All timeline-specific styles live in `src/components/Timeline.css`. The palette follows:

- Heist red: `#FF4D4F`
- Deep charcoal: `#0F1214`
- Muted gray overlays / borders
- Soft neon cyan highlights for glass reflections

The custom cursor disables the default pointer on the road container, uses GPU-accelerated translations, and keeps animations lightweight for 60 fps.

