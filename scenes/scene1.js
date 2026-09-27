/* SAHNE 1 — HANGİSİ DAHA SOĞUK? (0–10 s)  Beş şehrin sabah sıcaklıkları.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  /** the number line from lo to hi; ticks [value, items, small, k, hot]; points [value, items, k, name] */
  function line(ctx, N, lo, hi, ticks, pts, a, s, seed) {
    if (a <= 0) return null;
    const f = F(), X = (v) => lerp(N.x0, N.x1, (v - lo) / (hi - lo));
    Ink.path(ctx, [[N.x0 - 40, N.y], [N.x1 + 40, N.y]], { w: 4, alpha: a, seed, taper: [0, 0] });
    Ink.path(ctx, [[N.x1 + 22, N.y - 12], [N.x1 + 42, N.y], [N.x1 + 22, N.y + 12]], { w: 4, alpha: a, seed: seed + 90, taper: [0, 0] });
    Ink.path(ctx, [[N.x0 - 22, N.y - 12], [N.x0 - 42, N.y], [N.x0 - 22, N.y + 12]], { w: 4, alpha: a, seed: seed + 91, taper: [0, 0] });
    ticks.forEach(([v, lab, small, k = 1, hot], i) => {
      const x = X(v); if (x < N.x0 - 1 || x > N.x1 + 1 || k <= 0) return;
      const h = small ? 8 : 13;
      Ink.path(ctx, [[x, N.y - h], [x, N.y + h]], { w: small ? 2.5 : 3, alpha: a * k, seed: seed + 1 + (i % 60), taper: [0, 0] });
      if (lab) f.expr(ctx, lab, x, N.y + 44, s * 0.6, { alpha: a * k, color: hot ? A.amber : undefined });
    });
    pts.forEach(([v, lab, k, name, up0, dx = 0], i) => {
      if (k <= 0) return; const x = X(v);
      ctx.fillStyle = amber(a * k); ctx.beginPath(); ctx.arc(x, N.y, 10, 0, Math.PI * 2); ctx.fill();
      const up = up0 ?? (i % 2 ? 122 : 60);
      Ink.path(ctx, [[x, N.y - 16], [x + dx, N.y - up + 26]], { w: 2, alpha: 0.5 * a * k, seed: seed + 200 + i, taper: [0, 0] });
      if (lab) f.expr(ctx, lab, x + dx, N.y - up, s * 0.82, { alpha: a * k, halo: true, color: A.amber });
      else if (name) f.T(ctx, name, x + dx, N.y - up, { size: s * 0.66, alpha: a * k, halo: true, color: A.amber });
    });
    return X;
  }

  const CITIES = [['Kars', ['−7,5 °C'], -7.5], ['Erzurum', ['−', fr(29, 4), ' °C'], -7.25], ['Ağrı', ['−8 °C'], -8], ['Van', ['−', fr(3, 2), ' °C'], -1.5], ['İzmir', ['2,5 °C'], 2.5]];

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Sabah sıcaklıkları: hangi şehir daha soğuk?'],
      [10.6, 27.8, 'Önce tam sayılar: −8 mi büyük, −3 mü?'],
      [28.4, 45.8, 'Tam sayıların arasına yakından bakalım'],
      [46.4, 63.8, 'Kesirleri karşılaştıralım: −3/4 mü, −2/3 mü?'],
      [64.4, 79.8, 'Beş şehri sıralayalım'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, N = L.NL, C = L.CT;
    // 0–10: the five cities
    const c1 = win(t, 4.6, 10.2) * a;
    if (c1 > 0) CITIES.forEach(([name, val], i) => {
      const k = seg(t, 5.0 + i * 0.5, 5.5 + i * 0.5) * c1; if (k <= 0) return;
      const y = C.y0 + i * C.dy;
      f.T(ctx, name, C.x - 60, y, { size: s * 0.85, alpha: k, align: 'right', halo: true });
      f.expr(ctx, val, C.x + 130, y, s * 0.85, { alpha: k, halo: true, color: A.amber });
    });

    // 10–80: the number line; −9…3, zoom to −8,5…−6,5, to −1…1, back to −9…3
    const nl = win(t, 10.8, 79.8) * a;
    if (nl <= 0) return;
    const z1 = inOut(seg(t, 29.0, 31.0)), z2 = inOut(seg(t, 47.0, 49.0)), z3 = inOut(seg(t, 65.0, 67.0));
    let lo = lerp(-9, -8.5, z1), hi = lerp(3, -6.5, z1);
    lo = lerp(lo, -1, z2); hi = lerp(hi, 1, z2);
    lo = lerp(lo, -9, z3); hi = lerp(hi, 3, z3);
    const span = hi - lo, ticks = [];
    for (let v = -9; v <= 3; v++) ticks.push([v, [label(v)], false, seg(t, 11.2 + (v + 9) * 0.08, 11.6 + (v + 9) * 0.08)]);
    if (span < 4) {
      const q = seg(span, 3.5, 2.5);
      if (t < 47) for (let v = -8.75; v <= -6.75; v += 0.25) if (Math.abs(v - Math.round(v)) > 0.01) ticks.push([v, Math.abs(v % 1) === 0.5 ? [neg((v).toFixed(1).replace('.', ','))] : null, true, q]);
      if (t > 47) for (let k = -11; k <= 11; k++) if (k % 12) ticks.push([k / 12, null, true, q * (k % 3 === 0 || k % 4 === 0 ? 1 : 0.45)]);
    }
    const pts = [];
    // 10–28: −8 and −3
    const p2 = win(t, 12.6, 27.8);
    if (p2 > 0) { pts.push([-8, ['−8'], p2 * seg(t, 12.8, 13.2)]); pts.push([-3, ['−3'], p2 * seg(t, 13.4, 13.8)]); pts.push([2, ['2'], p2 * seg(t, 20.0, 20.4)]); }
    // 28–46: −8, −7,5, −29/4, −7
    const p3 = win(t, 31.4, 45.8);
    if (p3 > 0) { pts.push([-8, null, p3 * seg(t, 31.6, 32.0), 'Ağrı']); pts.push([-7.5, null, p3 * seg(t, 32.4, 32.8), 'Kars']); pts.push([-7.25, null, p3 * seg(t, 33.2, 33.6), 'Erzurum']); }
    // 46–64: −3/4, −2/3, 1/3
    const p4 = win(t, 49.4, 63.8);
    if (p4 > 0) { pts.push([-0.75, ['−', fr(3, 4)], p4 * seg(t, 49.6, 50.0)]); pts.push([-2 / 3, ['−', fr(2, 3)], p4 * seg(t, 50.4, 50.8)]); pts.push([1 / 3, [fr(1, 3)], p4 * seg(t, 55.6, 56.0)]); }
    // 64–80: all five cities
    const p5 = win(t, 67.4, 79.8);
    const LAY = { 'Ağrı': [56, -34], 'Kars': [112, 0], 'Erzurum': [168, 34], 'Van': [60, 0], 'İzmir': [60, 0] };
    if (p5 > 0) [...CITIES].sort((u, w) => u[2] - w[2]).forEach(([name, , v], i) => pts.push([v, null, p5 * seg(t, 67.6 + i * 0.6, 68.0 + i * 0.6), name, LAY[name][0], LAY[name][1]]));
    const X = line(ctx, N, lo, hi, ticks, pts, nl, s, 6100);
    if (!X) return;
    const cx = (N.x0 + N.x1) / 2, E = L.EX.y, EW = env.V ? 860 : 900;
    // 10–28: the wrong idea, crossed out
    const w2 = win(t, 15.0, 19.6) * a;
    if (w2 > 0) { f.expr(ctx, ['8 > 3 olduğuna göre −8 > −3 mü?'], cx, E, s * 0.95, { alpha: w2, halo: true }); if (t > 17.2) f.crossInk(ctx, cx + (env.V ? 330 : 360), E, 22, seg(t, 17.2, 18.0), w2); }
    const e2 = win(t, 20.0, 27.8) * a;
    if (e2 > 0) f.expr(ctx, ['−8 < −3 < 0 < 2'], cx, E, s * 1.05, { alpha: e2, halo: true, color: A.amber });
    // 28–46
    const e3 = win(t, 34.4, 39.4) * a;
    if (e3 > 0) f.expr(ctx, ['−8 < −7,5 < −', fr(29, 4), ' < −7'], cx, E, s * 1.0, { alpha: e3, halo: true, w: EW });
    const e3b = win(t, 39.8, 45.8) * a;
    if (e3b > 0) f.expr(ctx, ['|−7,5| = 7,5 > 7,25 = |−', fr(29, 4), '|'], cx, E, s * 1.0, { alpha: e3b, halo: true, w: EW });
    // 46–64
    const e4 = win(t, 51.0, 55.2) * a;
    if (e4 > 0) f.expr(ctx, ['−', fr(3, 4), ' = −', fr(9, 12), '      −', fr(2, 3), ' = −', fr(8, 12)], cx, E, s * 1.0, { alpha: e4, halo: true, w: EW });
    const e4b = win(t, 55.6, 63.8) * a;
    if (e4b > 0) f.expr(ctx, ['−', fr(3, 4), ' < −', fr(2, 3), ' < 0 < ', fr(1, 3)], cx, E, s * 1.05, { alpha: e4b, halo: true, color: A.amber, w: EW });
    // 64–80
    const e5 = win(t, 71.0, 79.8) * a;
    if (e5 > 0) f.expr(ctx, ['−8 < −7,5 < −', fr(29, 4), ' < −', fr(3, 2), ' < 2,5'], cx, E, s * 1.0, { alpha: e5, halo: true, w: EW });
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Değerler farklı gösterimlerde: ondalık, kesir, tam sayı'], [11.8, 27.8, 'Tam sayılar sayı doğrusunda: paydası 1 olan rasyonel sayılar'],
      [31.8, 45.8, '−8 ile −7 arasında: Ağrı, Kars, Erzurum'], [49.6, 63.8, 'Paydaları eşitle: −9/12 ile −8/12'],
      [67.6, 79.8, 'Sayı doğrusunda soldan sağa: küçükten büyüğe']]);
    exprs(ctx, t, at(W, 1), [[18.0, 27.8, 'Hayır: −8, −3’ün solunda; 8 derece altı daha soğuk'], [35.0, 45.8, '−7,5, −7,25’in solunda: Kars daha soğuk'],
      [53.0, 63.8, '−9/12, −8/12’nin solunda: −3/4 daha küçük'], [72.0, 79.8, 'Büyükten küçüğe: 2,5 > −3/2 > −29/4 > −7,5 > −8']]);
    exprs(ctx, t, at(W, 2), [[21.0, 27.8, 'Sayı doğrusunda sağdaki sayı daha büyüktür', true],
      [40.4, 45.8, 'Negatiflerde mutlak değeri büyük olan daha küçüktür', true],
      [57.0, 63.8, 'Her negatif sayı sıfırdan ve her pozitif sayıdan küçüktür', true],
      [75.0, 79.8, 'En soğuk Ağrı (−8 °C), en sıcak İzmir (2,5 °C)', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Sayı doğrusunda sağdaki büyük: −3 > −8', 80.6], ['Negatiflerde mutlak değeri büyük olan küçük', 81.6], ['Kesirlerde paydaları eşitle: −3/4 < −2/3', 82.6], ['Sıralamak için sayı doğrusuna yerleştir!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Which is colder?', nameTr: 'Hangisi daha soğuk?', concept: 'Five cities', conceptTr: 'Beş şehir', render });
})(window.LI = window.LI || {});
