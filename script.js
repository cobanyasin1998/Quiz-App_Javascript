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
    "Hangisi Javascript paket yönetim uygulamasıdır",
    {
      a: "nodejs",
      b: "typescript",
      c: "npm",
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

function Quiz(sorular) {
  this.sorular = sorular;
  this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function () {
  return this.sorular[this.soruIndex];
};

const quiz = new Quiz(sorular);

document.querySelector(".btn_start").addEventListener("click", function () {
    if(quiz.sorular.length  != quiz.soruIndex){
        document.querySelector(".quiz_box").classList.add("active");
        console.log(quiz.soruGetir());
        quiz.soruIndex += 1;
    }
    else{
        alert('QUIZ Bitti')
    }

});
