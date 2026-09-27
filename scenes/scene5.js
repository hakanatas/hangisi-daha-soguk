/* SAHNE 5 — SIRALAMA (64–80 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 5, start: 64, end: 80, name: "Ordering", nameTr: "Sıralama", concept: "Five cities in order", conceptTr: "Beş şehir sırayla", render });
})(window.LI = window.LI || {});
