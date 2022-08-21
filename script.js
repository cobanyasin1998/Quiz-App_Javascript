const quiz = new Quiz(sorular);
const ui = new UI();

ui.btn_start.addEventListener("click", function () {
  ui.quiz_box.classList.add("active");
  startTimer(10);
  startTimeLine();
  soruGoster(quiz.soruGetir());
  soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btn_next.classList.remove("show");
});

ui.btn_next.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    document.querySelector(".quiz_box").classList.add("active");
    quiz.soruIndex += 1;
    clearInterval(counter);
    startTimer(10);

    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);

    ui.score_box.classList.add("active");
    ui.quiz_box.classList.remove("active");
    ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
  }
});

ui.btn_finish.addEventListener("click", function () {
  window.location.reload();
});

ui.btn_replay.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  ui.btn_start.click();
  ui.score_box.classList.remove("active");
});

function soruGoster(soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = "";

  for (let cevap in soru.cevapSecenekleri) {
    options += `<div class='option'><span><b>${cevap}:</b>${soru.cevapSecenekleri[cevap]}</span></div>`;
  }
  const options_list = document.querySelector(".option_list");
  document.querySelector(".question_text").innerHTML = question;
  options_list.innerHTML = options;

  const optionList = options_list.querySelectorAll(".option");

  for (let opt of optionList) {
    opt.setAttribute("onclick", "optionsSelected(this)");
  }
}
function optionsSelected(option) {
  let cevap = option.querySelector("span b").textContent;
  cevap = cevap.replaceAll(":", "");
  let soru = quiz.soruGetir();

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
  }

  for (let i = 0; i < ui.option_list.children.length; i++) {
    ui.option_list.children[i].classList.add("disabled");
  }

  document.querySelector(".next_btn").classList.add("show");
}
function soruSayisiniGoster(soruSirasi, toplam) {
  let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplam}</span>`;
  document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

UI.prototype.skoruGoster = function (toplamSoru, dogruCevap) {
  let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz`;
  document.querySelector(".score_box .score_text").innerHTML = tag;
};
let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    ui.time_second.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(counter);

      ui.time_text.textContent = "Süre Bitti";

      let cevap = quiz.soruGetir().dogruCevap;

      for (let option of ui.option_list.children) {
        if (option.querySelector("span b").textContent == cevap) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", ui.correctIcon);
        }

        option.classList.add("disabled");
      }

      ui.btn_next.classList.add("show");
    }
  }
}
let counterLine;
function startTimeLine() {
  let time = 0;
  setInterval(timer, 100);

  function timer() {
    time += 5;
    ui.time_line.style.width = time + "px";
debugger;
    if (time > 550) {
      clearInterval(counterLine);
    }
  }
}
