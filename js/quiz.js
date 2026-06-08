/* EnglishNest — quiz.js */

const QUESTIONS = [
  {
    text: 'Choose the correct sentence:',
    options: [
      'She go to school',
      'She goes to school',
      'She going to school',
      'She goed to school'
    ],
    correct: 1
  },
  {
    text: 'What does "negotiate" mean?',
    options: [
      'To celebrate',
      'To discuss to reach an agreement',
      'To travel',
      'To argue loudly'
    ],
    correct: 1
  },
  {
    text: 'Fill in the blank: "By the time she arrived, the meeting _____ already started."',
    options: ['has', 'had', 'have', 'was'],
    correct: 1
  },
  {
    text: 'Which word is a synonym for "confident"?',
    options: ['Nervous', 'Shy', 'Assured', 'Confused'],
    correct: 2
  },
  {
    text: 'Choose the correct preposition: "She is good ___ speaking English."',
    options: ['at', 'in', 'on', 'with'],
    correct: 0
  },
  {
    text: 'What is the past tense of "buy"?',
    options: ['Buyed', 'Buys', 'Bought', 'Buying'],
    correct: 2
  },
  {
    text: '"The report was submitted _____ the deadline."',
    options: ['before', 'since', 'during', 'while'],
    correct: 0
  },
  {
    text: 'Which sentence is most appropriate in a business email?',
    options: [
      '"Hey, send me the thing."',
      '"Please find attached the requested document."',
      '"I want the file now."',
      '"Here is what you asked."'
    ],
    correct: 1
  },
  {
    text: 'Choose the correct word: "She gave a very _____ presentation — everyone was impressed."',
    options: ['boring', 'convincing', 'confused', 'short'],
    correct: 1
  },
  {
    text: '"Despite _____ tired, she finished the project on time."',
    options: ['be', 'being', 'been', 'to be'],
    correct: 1
  }
];

const LEVELS = [
  { range: [0, 2],  code: 'A1', name: 'Beginner',        desc: 'You\'re starting your English journey. Perfect — everyone starts here! We\'ll build your foundation from the ground up.' },
  { range: [3, 4],  code: 'A2', name: 'Elementary',      desc: 'You know the basics and are ready to expand. A solid starting point for everyday conversations.' },
  { range: [5, 6],  code: 'B1', name: 'Pre-Intermediate', desc: 'You can communicate in familiar situations and are ready to push further into fluency.' },
  { range: [7, 8],  code: 'B2', name: 'Intermediate',    desc: 'You have a good command of English. Time to tackle complex topics and professional communication.' },
  { range: [9, 10], code: 'C1', name: 'Advanced',        desc: 'Impressive! You use English fluently and flexibly. You\'re ready for advanced topics, professional communication and near-native mastery.' }
];

const TRACK_RECOMMENDATIONS = {
  A1: 'Start with General English or Conversational English to build your foundation.',
  A2: 'General English or Conversational English at Elementary level is ideal.',
  B1: 'Any track works well. Conversational or Business English will accelerate your progress.',
  B2: 'Business English or Conversational English at Intermediate level fits perfectly.',
  C1: 'Business or Conversational English at Advanced level — you\'re ready for the top.'
};

/* ── State ── */
let current = 0;
let score = 0;
let answered = false;

/* ── DOM refs ── */
const progressFill   = document.getElementById('progressFill');
const progressText   = document.getElementById('progressText');
const questionNum    = document.getElementById('questionNum');
const questionText   = document.getElementById('questionText');
const answerOptions  = document.getElementById('answerOptions');
const nextBtn        = document.getElementById('nextBtn');
const quizCard       = document.getElementById('quizCard');
const quizResult     = document.getElementById('quizResult');
const resultLevel    = document.getElementById('resultLevel');
const resultCode     = document.getElementById('resultCode');
const resultName     = document.getElementById('resultName');
const resultDesc     = document.getElementById('resultDesc');
const resultRec      = document.getElementById('resultRec');

const LETTERS = ['A', 'B', 'C', 'D'];

function renderQuestion() {
  answered = false;
  nextBtn.classList.remove('visible');

  const q = QUESTIONS[current];
  const pct = (current / QUESTIONS.length) * 100;
  const tr = (typeof t === 'function') ? t : (k) => k;
  progressFill.style.width = pct + '%';
  progressText.textContent = tr('qz.progress').replace('{n}', current + 1);
  questionNum.textContent  = tr('qz.qnum').replace('{n}', current + 1);
  questionText.textContent = q.text;

  answerOptions.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const correct = QUESTIONS[current].correct;
  const allBtns = answerOptions.querySelectorAll('.answer-btn');

  allBtns.forEach((b, i) => {
    if (i === correct) b.classList.add('correct');
    if (i === index && index !== correct) b.classList.add('wrong');
  });

  if (index === correct) score++;

  const tr2 = (typeof t === 'function') ? t : (k) => k;
  nextBtn.classList.add('visible');
  nextBtn.textContent = current < QUESTIONS.length - 1 ? tr2('qz.next') : tr2('qz.see');
}

function showResult() {
  progressFill.style.width = '100%';
  progressText.textContent = 'Complete!';

  quizCard.style.display = 'none';
  quizResult.style.display = 'block';

  const level = LEVELS.find(l => score >= l.range[0] && score <= l.range[1]);

  resultCode.textContent = level.code;
  resultName.textContent = `Your level is: ${level.code} — ${level.name}`;
  resultDesc.textContent = level.desc;
  resultRec.textContent  = TRACK_RECOMMENDATIONS[level.code];

  /* Highlight the matching level on track cards */
  document.querySelectorAll('.result-track-card').forEach(card => {
    card.querySelectorAll('.level-dot').forEach(dot => {
      if (dot.textContent.trim() === level.code) {
        dot.style.fontWeight = '800';
        dot.style.transform  = 'scale(1.15)';
        dot.style.boxShadow  = '0 0 0 3px currentColor';
      }
    });
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    current++;
    if (current < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });
}

/* Re-render current question UI strings when language changes */
window.renderQuizLang = function() {
  if (document.getElementById('quizCard').style.display === 'none') return;
  const tr = (typeof t === 'function') ? t : (k) => k;
  progressText.textContent = tr('qz.progress').replace('{n}', current + 1);
  questionNum.textContent  = tr('qz.qnum').replace('{n}', current + 1);
  if (nextBtn.classList.contains('visible')) {
    nextBtn.textContent = current < QUESTIONS.length - 1 ? tr('qz.next') : tr('qz.see');
  }
};

/* Reset function called by SPA navigation when returning to quiz */
window.resetQuiz = function() {
  current = 0;
  score = 0;
  answered = false;
  progressFill.style.width = '0%';
  progressText.textContent = 'Question 1 of 10';
  quizCard.style.display = 'block';
  quizResult.style.display = 'none';
  /* Clear highlighted level dots from previous attempt */
  document.querySelectorAll('.result-track-card .level-dot').forEach(dot => {
    dot.style.fontWeight = '';
    dot.style.transform  = '';
    dot.style.boxShadow  = '';
  });
  renderQuestion();
};

if (document.getElementById('quizCard')) {
  renderQuestion();
}
