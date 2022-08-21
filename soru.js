function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
  }
  Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap;
  };
  

let sorular = [
    new Soru(
      "En sevdiğim hayvan",
      {
        a: "Kedi",
        b: "Köpek",
        c: "Kuş",
        d: "Balık",
      },
      "c"
    ),
    new Soru(
      "Hangisi Javascript paket yönetim uygulamasıdır",
      {
        a: "nodejs",
        b: "typescript",
        c: "npm",
      },
      "c"
    ),
  ];
  