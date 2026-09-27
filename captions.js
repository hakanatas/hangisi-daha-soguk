/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Hangi şehir daha soğuk?', en: 'Which city is colder?',
      note: 'Bir kış sabahı: Kars eksi 7,5, Erzurum eksi 29 bölü 4, Ağrı eksi 8, Van eksi 3 bölü 2, İzmir 2,5 derece. Hangi şehir daha soğuk? Sayılar farklı gösterimlerde.' },
    { scene: 2, start: 10.8, end: 19.6, tr: '8 > 3 ise −8 > −3 mü?', en: 'If 8 > 3, is −8 > −3?',
      note: 'Önce tam sayılardan başlayalım; tam sayılar paydası 1 olan rasyonel sayılardır. 8, 3’ten büyük. Peki eksi 8, eksi 3’ten büyük mü?' },
    { scene: 2, start: 20.0, end: 27.8, tr: 'Sağdaki büyük: −8 < −3', en: 'Right is bigger: −8 < −3',
      note: 'Hayır. Eksi 8, eksi 3’ün solunda. Sayı doğrusunda sağdaki sayı daha büyüktür: eksi 8, eksi 3’ten küçük. Sıfırın 8 derece altı daha soğuk.' },
    { scene: 3, start: 28.6, end: 39.4, tr: '−8 < −7,5 < −29/4 < −7', en: '−8 < −7.5 < −29/4 < −7',
      note: 'Eksi 8 ile eksi 7 arasına yakından bakalım. Eksi 29 bölü 4, eksi 7,25. Ağrı eksi 8’de, Kars eksi 7,5’te, Erzurum eksi 7,25’te. Soldan sağa: eksi 8, eksi 7,5, eksi 29 bölü 4.' },
    { scene: 3, start: 39.8, end: 45.8, tr: 'Mutlak değeri büyük olan küçük', en: 'The bigger absolute value is smaller',
      note: 'Eksi 7,5’in mutlak değeri 7,5; eksi 29 bölü 4’ün mutlak değeri 7,25. Negatif sayılarda mutlak değeri büyük olan daha küçüktür: Kars, Erzurum’dan daha soğuk.' },
    { scene: 4, start: 46.6, end: 55.2, tr: '−3/4 = −9/12, −2/3 = −8/12', en: '−3/4 = −9/12, −2/3 = −8/12',
      note: 'Eksi 3 bölü 4 mü büyük, eksi 2 bölü 3 mü? Paydaları eşitleyelim: eksi 9 bölü 12 ve eksi 8 bölü 12. Eksi 9 bölü 12 daha solda.' },
    { scene: 4, start: 55.6, end: 63.8, tr: '−3/4 < −2/3 < 0 < 1/3', en: '−3/4 < −2/3 < 0 < 1/3',
      note: 'Eksi 3 bölü 4, eksi 2 bölü 3’ten küçük. Her negatif sayı sıfırdan ve her pozitif sayıdan küçüktür: eksi 2 bölü 3, 1 bölü 3’ten küçük.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'Soldan sağa: küçükten büyüğe', en: 'Left to right: smallest to largest',
      note: 'Beş şehri sayı doğrusuna yerleştirelim. Soldan sağa okuyunca küçükten büyüğe sıralarız: eksi 8, eksi 7,5, eksi 29 bölü 4, eksi 3 bölü 2, 2,5.' },
    { scene: 5, start: 75.0, end: 79.8, tr: 'En soğuk Ağrı, en sıcak İzmir', en: 'Coldest Ağrı, warmest İzmir',
      note: 'En soğuk şehir Ağrı, eksi 8 derece. En sıcak şehir İzmir, 2,5 derece.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Sağdaki büyük, soldaki küçük', en: 'Right is bigger, left is smaller',
      note: 'Aklında kalsın: sayı doğrusunda sağdaki sayı büyüktür. Negatiflerde mutlak değeri büyük olan küçüktür. Kesirlerde paydaları eşitle.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Sayı doğrusuna yerleştir!', en: 'Put them on the number line!',
      note: 'Sıralamak için sayı doğrusuna yerleştir!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
