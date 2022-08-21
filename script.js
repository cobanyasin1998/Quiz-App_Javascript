const quiz = new Quiz(sorular);
const ui = new UI();

ui.btn_start.addEventListener("click", function () {
  ui.quiz_box.classList.add("active");
  soruGoster(quiz.soruGetir());
  soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btn_next.classList.remove("show");
});

ui.btn_next.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    document.querySelector(".quiz_box").classList.add("active");
    quiz.soruIndex += 1;
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btn_next.classList.remove("show");
  } else {
    alert("QUIZ Bitti");
  }
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
