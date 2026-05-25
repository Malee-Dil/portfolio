"use client";
import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, rafId;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildElements();
    };

    // ── Colour palette (matches site) ──
    const COLORS = ["#63d2ff", "#c882ff", "#ff6eb4", "#84ffb0", "#a78bfa"];

    // ── Element types: dot, triangle, square, ring, cross, squiggle ──
    let elements = [];

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick  = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const buildElements = () => {
      elements = [];

      // Small scattered dots (stars-like)
      for (let i = 0; i < 55; i++) {
        elements.push({
          type:    "dot",
          x:       rand(0, W), y: rand(0, H),
          r:       rand(1.2, 3.2),
          color:   pick(COLORS),
          alpha:   rand(0.15, 0.45),
          vx:      rand(-0.08, 0.08),
          vy:      rand(-0.08, 0.08),
          pulse:   rand(0, Math.PI * 2),
          pulseSpeed: rand(0.008, 0.022),
        });
      }

      // Geometric shapes
      const shapeTypes = ["triangle", "square", "ring", "cross"];
      for (let i = 0; i < 22; i++) {
        elements.push({
          type:    pick(shapeTypes),
          x:       rand(0, W), y: rand(0, H),
          size:    rand(10, 28),
          color:   pick(COLORS),
          alpha:   rand(0.12, 0.32),
          angle:   rand(0, Math.PI * 2),
          rotSpeed:rand(-0.004, 0.004),
          vx:      rand(-0.12, 0.12),
          vy:      rand(-0.12, 0.12),
          pulse:   rand(0, Math.PI * 2),
          pulseSpeed: rand(0.006, 0.016),
        });
      }

      // Squiggly lines
      for (let i = 0; i < 6; i++) {
        elements.push({
          type:    "squiggle",
          x:       rand(0, W), y: rand(0, H),
          width:   rand(40, 80),
          color:   pick(COLORS),
          alpha:   rand(0.18, 0.35),
          angle:   rand(0, Math.PI * 2),
          rotSpeed:rand(-0.003, 0.003),
          vx:      rand(-0.1, 0.1),
          vy:      rand(-0.1, 0.1),
          pulse:   rand(0, Math.PI * 2),
          pulseSpeed: rand(0.007, 0.015),
          flip:    Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // ── Draw helpers ──
    const drawDot = (e, a) => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fillStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.fill();
    };

    const drawTriangle = (e, a) => {
      const s = e.size;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.lineTo(s * 0.52, s * 0.4);
      ctx.lineTo(-s * 0.52, s * 0.4);
      ctx.closePath();
      ctx.strokeStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    };

    const drawSquare = (e, a) => {
      const s = e.size * 0.72;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.strokeStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 1.8;
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    };

    const drawRing = (e, a) => {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.beginPath();
      ctx.arc(0, 0, e.size * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();
    };

    const drawCross = (e, a) => {
      const s = e.size * 0.52;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.strokeStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(0, s); ctx.stroke();
      ctx.restore();
    };

    const drawSquiggle = (e, a) => {
      const w = e.width;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);
      ctx.scale(1, e.flip);
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.quadraticCurveTo(-w / 4, -10, 0,        0);
      ctx.quadraticCurveTo( w / 4,  10, w / 2,    0);
      ctx.strokeStyle = e.color + Math.round(a * 255).toString(16).padStart(2, "0");
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      elements.forEach((e) => {
        // Drift
        e.x += e.vx;
        e.y += e.vy;
        if (e.angle !== undefined) e.angle += e.rotSpeed;

        // Wrap around edges
        if (e.x < -60)  e.x = W + 60;
        if (e.x > W+60) e.x = -60;
        if (e.y < -60)  e.y = H + 60;
        if (e.y > H+60) e.y = -60;

        // Pulse alpha
        e.pulse += e.pulseSpeed;
        const pulse = 0.75 + 0.25 * Math.sin(e.pulse);
        const a = e.alpha * pulse;

        if      (e.type === "dot")      drawDot(e, a);
        else if (e.type === "triangle") drawTriangle(e, a);
        else if (e.type === "square")   drawSquare(e, a);
        else if (e.type === "ring")     drawRing(e, a);
        else if (e.type === "cross")    drawCross(e, a);
        else if (e.type === "squiggle") drawSquiggle(e, a);
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        width:         "100%",
        height:        "100%",
      }}
    />
  );
}