let currentQuestion = 0;
let score = 0;
let history = [];
let username = "";

const questions = [
  {
    question: "Siapa yang dikenal sebagai pelopor pergerakan nasional Indonesia?",
    options: ["Sukarno", "Ki Hadjar Dewantara", "R.A. Kartini", "Dr. Wahidin Sudirohusodo"],
    answer: 3
  },
  {
    question: "Apa tujuan utama dari Budi Utomo yang didirikan pada tahun 1908?",
    options: ["Memperjuangkan kemerdekaan Indonesia", "Meningkatkan pendidikan dan kebudayaan di kalangan pribumi", "Memperkuat pengaruh Belanda di Indonesia", "Mengembangkan sektor pertanian"],
    answer: 1
  },
  {
    question: "Apa yang dimaksud dengan nasionalisme?",
    options: ["Konflik antara negara-negara", "Perasaan cinta tanah air dan bangsa", "Keinginan untuk menaklukkan negara lain", "Penolakan terhadap budaya asing"],
    answer: 1
  },
  {
    question: "Siapa penjelajah Portugis yang pertama kali mencapai wilayah Indonesia pada tahun 1511?",
    options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Afonso de Albuquerque"],
    answer: 3
  },
  {
    question: "Apa yang menjadi konsekuensi ekonomi dari kolonialisme Belanda di Indonesia?",
    options: ["Peningkatan kesejahteraan masyarakat pribumi", "Pengembangan sektor pertanian yang modern", "Eksploitasi sumber daya alam Indonesia", "Peningkatan perdagangan global Indonesia"],
    answer: 2
  },
  {
    question: "Apa yang dimaksud dengan 'Politik Etis' yang diterapkan oleh pemerintah kolonial Belanda di Indonesia?",
    options: ["Kebijakan untuk memberikan hak politik kepada semua warga Indonesia", "Kebijakan untuk memperbaiki etika dan moral masyarakat Indonesia", "Upaya untuk menciptakan pemerintahan yang adil dan beretika di Indonesia", "Kebijakan untuk mengintegrasikan budaya Belanda ke dalam masyarakat Indonesia"],
    answer: 2
  },
  {
    question: "Bagaimana dampak kolonialisme terhadap perkembangan budaya Indonesia?",
    options: ["Penguatan dan pelestarian budaya asli Indonesia", "Penggantian budaya asli dengan budaya Belanda", "Terjadi proses asimilasi budaya antara Indonesia dan Belanda", "Pembentukan budaya baru yang campuran dari keduanya"],
    answer: 2
  },
  {
    question: "Apa yang dimaksud dengan 'Sumpah Pemuda'?",
    options: ["Sumpah untuk menghindari peperangan", "Sumpah untuk mengamankan kepentingan asing", "Sumpah untuk berjuang melawan penjajahan", "Sumpah untuk mengikuti budaya Barat"],
    answer: 2
  },
  {
    question: "Apa yang mendorong bangsa Eropa untuk melakukan penjelajahan samudra pada Abad Ke-15 dan Ke-16?",
    options: ["Keinginan untuk memperluas agama Kristen", "Ambisi untuk menguasai sumber daya alam", "Hasrat untuk membangun perdagangan global", "Semua jawaban di atas benar"],
    answer: 3
  },
  {
    question: "Apa tujuan operasi 'Operasi Trikora'?",
    options: ["Upaya untuk menjalin hubungan diplomatik dengan negara-negara Blok Barat", "Operasi militer untuk merebut Irian Barat dari Belanda", "Program pembangunan ekonomi di Indonesia", "Kampanye untuk mempromosikan kebudayaan Indonesia"],
    answer: 1
  }
];

function startQuiz() {
  username = document.getElementById("usernameInput").value;
  if (!username) {
    alert("Jenengmu isinen sek");
    return;
  }
  document.getElementById("startPage").style.display = "none";
  document.getElementById("quizPage").style.display = "block";
  currentQuestion = 0;
  score = 0;
  history = [];
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }
  const q = questions[currentQuestion];
  document.getElementById("questionText").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(idx);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.answer) {
    score += 10;
    history.push(`Soal ${currentQuestion + 1}: Benar`);
  } else {
    history.push(`Soal ${currentQuestion + 1}: Salah`);
  }
  currentQuestion++;
  showQuestion();
}

function endQuiz() {
  document.getElementById("quizPage").style.display = "none";
  document.getElementById("scorePage").style.display = "block";
  document.getElementById("scoreText").innerText = `Selamat ${username}! Skor kamu: ${score}`;

  // Simpan skor ke leaderboard lokal
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ name: username, score });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("quizPage").style.display = "none";
  document.getElementById("scorePage").style.display = "none";
  document.getElementById("historyPage").style.display = "none";
  document.getElementById("leaderboardPage").style.display = "block";

  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = "";
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]")
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // top 10

  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

function showHistory() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("quizPage").style.display = "none";
  document.getElementById("scorePage").style.display = "none";
  document.getElementById("leaderboardPage").style.display = "none";
  document.getElementById("historyPage").style.display = "block";

  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function goBack() {
  document.getElementById("startPage").style.display = "block";
  document.getElementById("quizPage").style.display = "none";
  document.getElementById("scorePage").style.display = "none";
  document.getElementById("leaderboardPage").style.display = "none";
  document.getElementById("historyPage").style.display = "none";
}