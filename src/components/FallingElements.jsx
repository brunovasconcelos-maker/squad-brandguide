import { useEffect, useMemo, useRef } from "react";
import Matter from "matter-js";
import { homepageElements } from "../data/homepageElements";

// Keeps the simulation cheap even if the assets folder grows a lot, and
// trims further on small viewports where the effect is less visible anyway.
const MAX_BODIES = 18;
const MAX_BODIES_SMALL_VIEWPORT = 10;
const SMALL_VIEWPORT_WIDTH = 640;

const MAX_DISPLAY_SIZE = 170;
const MIN_DISPLAY_SIZE = 70;

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function computeDisplaySize(naturalWidth, naturalHeight) {
  const longest = Math.max(naturalWidth, naturalHeight);
  let scale = 1;
  if (longest > MAX_DISPLAY_SIZE) scale = MAX_DISPLAY_SIZE / longest;
  else if (longest < MIN_DISPLAY_SIZE) scale = MIN_DISPLAY_SIZE / longest;
  return { width: naturalWidth * scale, height: naturalHeight * scale };
}

function loadImageSize(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: MIN_DISPLAY_SIZE, height: MIN_DISPLAY_SIZE });
    img.src = src;
  });
}

export default function FallingElements() {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const simulationRef = useRef(null);

  // Picked once so re-renders (e.g. menu toggle) don't reshuffle or re-drop the cast.
  const elements = useMemo(() => {
    const cap = window.innerWidth < SMALL_VIEWPORT_WIDTH ? MAX_BODIES_SMALL_VIEWPORT : MAX_BODIES;
    return shuffle(homepageElements).slice(0, cap);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (elements.length === 0 || !container) return undefined;

    let cancelled = false;

    Promise.all(elements.map((element) => loadImageSize(element.src))).then((sizes) => {
      if (cancelled) return;

      const { Engine, Runner, Bodies, Composite, Body, Mouse, MouseConstraint, Events } = Matter;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const wallThickness = 100;

      const engine = Engine.create();
      engine.gravity.y = 1;

      const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 4, width * 2, wallThickness, {
        isStatic: true,
        friction: 0.6,
      });
      const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 4, {
        isStatic: true,
      });
      const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 4, {
        isStatic: true,
      });

      const bodies = elements.map((element, index) => {
        const { width: w, height: h } = computeDisplaySize(sizes[index].width, sizes[index].height);
        const node = nodeRefs.current[element.filename];
        if (node) {
          node.style.width = `${w}px`;
          node.style.height = `${h}px`;
        }

        const x = w / 2 + Math.random() * Math.max(width - w, 1);
        // Staggered start heights make the elements arrive in a cascade
        // rather than all landing on the ground at once.
        const y = -100 - index * 140 - Math.random() * 200;
        const body = Bodies.rectangle(x, y, w, h, {
          restitution: 0.35,
          friction: 0.5,
          frictionAir: 0.015,
          angle: (Math.random() - 0.5) * 0.6,
        });
        return { filename: element.filename, body, width: w, height: h };
      });

      Composite.add(engine.world, [ground, leftWall, rightWall, ...bodies.map((b) => b.body)]);

      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, damping: 0.15, render: { visible: false } },
      });
      Composite.add(engine.world, mouseConstraint);

      // Matter's Mouse hijacks wheel events by default, which would block page scroll.
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      const syncDOM = () => {
        bodies.forEach(({ filename, body, width: w, height: h }) => {
          const node = nodeRefs.current[filename];
          if (!node) return;
          const x = body.position.x - w / 2;
          const y = body.position.y - h / 2;
          node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
        });
      };
      syncDOM();
      Events.on(engine, "afterUpdate", syncDOM);

      const runner = Runner.create();
      Runner.run(runner, engine);

      // Pausing on hidden tabs saves CPU and avoids a big catch-up jump on return.
      const handleVisibility = () => {
        if (document.hidden) Runner.stop(runner);
        else Runner.run(runner, engine);
      };
      document.addEventListener("visibilitychange", handleVisibility);

      simulationRef.current = { engine, runner, mouseConstraint, bodies, syncDOM, handleVisibility, Body };
    });

    return () => {
      cancelled = true;
      const sim = simulationRef.current;
      if (!sim) return;
      const { Engine, Runner, Events } = Matter;
      document.removeEventListener("visibilitychange", sim.handleVisibility);
      Events.off(sim.engine, "afterUpdate", sim.syncDOM);
      Runner.stop(sim.runner);
      Engine.clear(sim.engine);
      simulationRef.current = null;
    };
  }, [elements]);

  const handleHoverStart = (filename) => {
    const sim = simulationRef.current;
    if (!sim) return;
    const entry = sim.bodies.find((b) => b.filename === filename);
    if (!entry) return;
    // Skip the jiggle while this element is actively being dragged.
    if (sim.mouseConstraint.body === entry.body) return;

    sim.Body.applyForce(entry.body, entry.body.position, {
      x: (Math.random() - 0.5) * 0.0015 * entry.body.mass,
      y: -0.0012 * entry.body.mass,
    });
    sim.Body.setAngularVelocity(entry.body, entry.body.angularVelocity + (Math.random() - 0.5) * 0.08);
  };

  if (homepageElements.length === 0) return null;

  return (
    <div className="falling-elements" ref={containerRef}>
      {elements.map((element) => (
        <div
          key={element.filename}
          ref={(node) => {
            if (node) nodeRefs.current[element.filename] = node;
            else delete nodeRefs.current[element.filename];
          }}
          className="falling-elements__item"
          onMouseEnter={() => handleHoverStart(element.filename)}
        >
          <img className="falling-elements__img" src={element.src} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}
