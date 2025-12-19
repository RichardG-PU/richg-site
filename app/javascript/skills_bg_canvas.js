document.addEventListener("turbo:load", () => {
  console.log("skills canvas loaded");

  const canvas = document.getElementById("skills-bg");
  if (!canvas) return;

  const skills = JSON.parse(canvas.dataset.skills || "[]");
  if (!skills.length) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const num = 20;
  const minY = 20;
  let W = 0,
    H = 0;
  let particles = [];

  function docHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
  }

  function resize() {
    W = Math.floor(document.documentElement.clientWidth);
    H = Math.floor(docHeight());

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // font sizing like your old code
    const portrait = window.innerHeight > window.innerWidth;
    ctx.font = `bold ${portrait ? 20 : 30}px Verdana`;
  }

  function tooCloseY(y) {
    for (const p of particles) if (Math.abs(y - p.y) < minY) return true;
    return false;
  }

  function randY() {
    let y;
    let tries = 0;
    do {
      y = Math.random() * H;
      tries++;
    } while (tries < 50 && tooCloseY(y));
    return y;
  }

  function randText() {
    return skills[(Math.random() * skills.length) | 0];
  }

  function init() {
    const SPEED = 0.6;

    particles = [];
    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * W,
        y: randY(),
        v:
          SPEED *
          (window.innerHeight < window.innerWidth
            ? 0.4 + Math.random() * 1.2
            : 0.2 + Math.random() * 0.6),
        text: randText(),
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#282828";
    for (const p of particles) {
      p.x += p.v;
      if (p.x > W) {
        p.x = 0;
        p.y = randY();
        p.text = randText();
      }
      ctx.fillText(p.text, p.x, p.y);
    }

    requestAnimationFrame(step);
  }

  // keep height synced as content changes
  const ro = new ResizeObserver(() => {
    const newH = docHeight();
    if (Math.abs(newH - H) > 8) {
      resize();
      // keep particles but clamp Y into new height
      for (const p of particles) p.y = Math.min(p.y, H);
    }
  });
  ro.observe(document.body);

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  resize();
  init();
  step();
});
