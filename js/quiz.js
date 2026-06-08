/* EnglishNest — quiz.js  (level-based v2) */

/* ── Level metadata ── */
const LEVEL_META = {
  A1: { name: 'Beginner' },
  A2: { name: 'Elementary' },
  B1: { name: 'Pre-Intermediate' },
  B2: { name: 'Intermediate' },
  C1: { name: 'Advanced' }
};
const LEVEL_ORDER = ['A1','A2','B1','B2','C1'];
const PASS_SCORE  = 8; /* ≥ 8 / 10  (> 75 %) */

/* ── Question bank (10 per level) ── */
const LEVEL_QUESTIONS = {

  A1: [
    { text: 'Choose the correct verb: "I ___ a student."',
      options: ['am','is','are','be'], correct: 0 },
    { text: 'How ___ you today?',
      options: ['is','am','are','be'], correct: 2 },
    { text: 'She ___ to school every day.',
      options: ['go','going','goes','gone'], correct: 2 },
    { text: 'This is ___ apple.',
      options: ['a','an','the','—'], correct: 1 },
    { text: 'What ___ your name?',
      options: ['am','is','are','be'], correct: 1 },
    { text: 'The book is ___ the table.',
      options: ['in','on','at','for'], correct: 1 },
    { text: 'I ___ coffee every morning.',
      options: ['drinking','drinks','drink','drank'], correct: 2 },
    { text: 'They ___ from France.',
      options: ['am','is','are','be'], correct: 2 },
    { text: 'Choose the correct sentence:',
      options: ["He don't like pizza.","He doesn't like pizza.",'He not like pizza.',"He isn't like pizza."], correct: 1 },
    { text: 'Which word means the opposite of "big"?',
      options: ['tall','heavy','small','fast'], correct: 2 }
  ],

  A2: [
    { text: 'Yesterday, I ___ to the market.',
      options: ['go','goes','went','going'], correct: 2 },
    { text: 'She ___ TV when I called her.',
      options: ['watched','was watching','watches','is watching'], correct: 1 },
    { text: 'He ___ speaks English — he only knows Russian.',
      options: ['always','never','sometimes','usually'], correct: 1 },
    { text: 'My birthday is ___ July.',
      options: ['on','at','in','for'], correct: 2 },
    { text: 'This bag is ___ than that one.',
      options: ['heavy','more heavy','heavier','heaviest'], correct: 2 },
    { text: 'She ___ speak French — she studied it for three years.',
      options: ['can',"can't",'must','should'], correct: 0 },
    { text: 'We ___ visit the museum tomorrow — we already have tickets.',
      options: ['went','go','are going to','goes'], correct: 2 },
    { text: 'There ___ some milk in the fridge.',
      options: ['are','is','be','am'], correct: 1 },
    { text: 'The children ___ in the garden right now.',
      options: ['play','plays','are playing','played'], correct: 2 },
    { text: 'Choose the correct question:',
      options: ['Where you live?','Where do you live?','Where you do live?','Where does you live?'], correct: 1 }
  ],

  B1: [
    { text: 'I ___ never been to Japan before.',
      options: ['have','had','has','am'], correct: 0 },
    { text: 'You ___ wear a seatbelt — it\'s the law.',
      options: ['should','would','must','could'], correct: 2 },
    { text: 'The woman ___ lives next door is a doctor.',
      options: ['who','which','what','whose'], correct: 0 },
    { text: 'If it rains tomorrow, we ___ stay inside.',
      options: ['will','would','should','had'], correct: 0 },
    { text: '"She looked up the word." — "looked up" means:',
      options: ['Wrote it down','Found its meaning','Read it aloud','Forgot about it'], correct: 1 },
    { text: 'How long ___ you known each other?',
      options: ['have','did','do','are'], correct: 0 },
    { text: 'The book ___ written by a famous author.',
      options: ['is','was','were','be'], correct: 1 },
    { text: 'He said he ___ tired.',
      options: ['is','was','were','be'], correct: 1 },
    { text: 'Despite ___ hard, he didn\'t pass the exam.',
      options: ['studied','study','studying','to study'], correct: 2 },
    { text: 'Choose the correct collocation: "make a ___"',
      options: ['homework','travel','decision','house'], correct: 2 }
  ],

  B2: [
    { text: 'If I ___ more money, I would travel the world.',
      options: ['have','had','would have','has'], correct: 1 },
    { text: 'By the time she arrived, the meeting ___ already started.',
      options: ['has','had','have','was'], correct: 1 },
    { text: 'The new library ___ by the end of next year.',
      options: ['will be completed','is being completed','has been completed','was completed'], correct: 0 },
    { text: 'She would have called you if she ___ your number.',
      options: ['had known','knew','knows','would know'], correct: 0 },
    { text: 'Which sentence is the most formal?',
      options: ['I want to know more.','Tell me more.','I would like to enquire further.','What else is there?'], correct: 2 },
    { text: 'The word "ambiguous" means:',
      options: ['Clear and precise','Having more than one possible meaning','Very important','Extremely rare'], correct: 1 },
    { text: 'If he ___ harder, he would have passed the exam.',
      options: ['studied','had studied','would study','studies'], correct: 1 },
    { text: 'Despite ___ the best candidate, she wasn\'t offered the job.',
      options: ['she was','being','to be','been'], correct: 1 },
    { text: '"A new school ___ in our neighbourhood." (passive, happening now)',
      options: ['is being built','was built','has been built','will be built'], correct: 0 },
    { text: 'The CEO gave a ___ speech that motivated the entire team.',
      options: ['boring','confused','compelling','short'], correct: 2 }
  ],

  C1: [
    { text: '"Never ___ such a beautiful landscape." (inversion)',
      options: ['I have seen','have I seen','I saw','saw I'], correct: 1 },
    { text: '"It is essential that he ___ on time." (subjunctive)',
      options: ['is','be','was','will be'], correct: 1 },
    { text: '"She turned a blind eye to the problem." This means:',
      options: ['Looked carefully at it','Solved it quickly','Made it worse','Pretended not to notice it'], correct: 3 },
    { text: '"Had I known about the meeting, I ___ attended."',
      options: ['would have','will have','would','had'], correct: 0 },
    { text: '"Ubiquitous" means:',
      options: ['Very rare','Extremely expensive','Appearing or found everywhere','Difficult to understand'], correct: 2 },
    { text: 'Which discourse marker introduces a contrast?',
      options: ['Furthermore','Therefore','Nevertheless','In addition'], correct: 2 },
    { text: 'Which sentence uses the subjunctive correctly?',
      options: ['I suggest that he reconsiders his decision.','I suggest that he reconsider his decision.','I suggest he should reconsiders.','I suggest him to reconsider.'], correct: 1 },
    { text: '"Commensurate with experience" means the salary is:',
      options: ['Fixed regardless of experience','Proportionate to experience','Very high','Negotiable only'], correct: 1 },
    { text: 'Which sentence uses a participle clause correctly?',
      options: ['Having finished the report, the meeting was cancelled.','Being finished the report, she left.','Having finished the report, she went home.','Finished the report, she went home early.'], correct: 2 },
    { text: 'Which is appropriate for a formal complaint letter?',
      options: ["I'm really angry about what happened.",'This is totally unacceptable!','I wish to express my dissatisfaction regarding this matter.','You guys messed up big time.'], correct: 2 }
  ]

};

/* ── State ── */
let activeLevel = null;
let current     = 0;
let score       = 0;
let answered    = false;

/* ── DOM refs ── */
const quizLevelSelect  = document.getElementById('quizLevelSelect');
const quizProgressWrap = document.getElementById('quizProgressWrap');
const progressFill     = document.getElementById('progressFill');
const progressText     = document.getElementById('progressText');
const questionNum      = document.getElementById('questionNum');
const questionText     = document.getElementById('questionText');
const answerOptions    = document.getElementById('answerOptions');
const nextBtn          = document.getElementById('nextBtn');
const quizCard         = document.getElementById('quizCard');
const quizResult       = document.getElementById('quizResult');
const resultVerdict    = document.getElementById('resultVerdict');
const resultScore      = document.getElementById('resultScore');
const resultName       = document.getElementById('resultName');
const resultDesc       = document.getElementById('resultDesc');
const nextLevelBtn     = document.getElementById('nextLevelBtn');
const retryBtn         = document.getElementById('retryBtn');
const chooseLevelBtn   = document.getElementById('chooseLevelBtn');

const LETTERS = ['A','B','C','D'];

/* ── Views ── */
function showLevelSelect() {
  quizLevelSelect.style.display  = 'block';
  quizProgressWrap.style.display = 'none';
  quizCard.style.display         = 'none';
  quizResult.style.display       = 'none';
}

function startLevelQuiz(levelCode) {
  activeLevel = levelCode;
  current     = 0;
  score       = 0;
  answered    = false;

  quizLevelSelect.style.display  = 'none';
  quizProgressWrap.style.display = 'block';
  quizCard.style.display         = 'block';
  quizResult.style.display       = 'none';

  renderQuestion();
}

/* ── Render question ── */
function renderQuestion() {
  answered = false;
  nextBtn.classList.remove('visible');

  const questions = LEVEL_QUESTIONS[activeLevel];
  const q   = questions[current];
  const pct = (current / questions.length) * 100;
  const tr  = (typeof t === 'function') ? t : k => k;

  progressFill.style.width = pct + '%';
  progressText.textContent = tr('qz.progress').replace('{n}', current + 1);
  questionNum.textContent  = tr('qz.qnum').replace('{n}', current + 1);
  questionText.textContent = q.text;

  answerOptions.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i));
    answerOptions.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const correct = LEVEL_QUESTIONS[activeLevel][current].correct;
  const allBtns = answerOptions.querySelectorAll('.answer-btn');

  allBtns.forEach((b, i) => {
    if (i === correct) b.classList.add('correct');
    if (i === index && index !== correct) b.classList.add('wrong');
  });

  if (index === correct) score++;

  const tr = (typeof t === 'function') ? t : k => k;
  nextBtn.classList.add('visible');
  const questions = LEVEL_QUESTIONS[activeLevel];
  nextBtn.textContent = current < questions.length - 1 ? tr('qz.next') : tr('qz.see');
}

/* ── Show result ── */
function showResult() {
  progressFill.style.width = '100%';

  quizCard.style.display         = 'none';
  quizProgressWrap.style.display = 'none';
  quizResult.style.display       = 'block';

  const passed   = score >= PASS_SCORE;
  const tr       = (typeof t === 'function') ? t : k => k;
  const nextIdx  = LEVEL_ORDER.indexOf(activeLevel) + 1;
  const nextCode = nextIdx < LEVEL_ORDER.length ? LEVEL_ORDER[nextIdx] : null;

  resultVerdict.className   = 'result-verdict ' + (passed ? 'pass' : 'fail');
  resultVerdict.textContent = passed ? tr('qz.pass') : tr('qz.fail');
  resultScore.textContent   = `${score} / 10`;
  resultName.textContent    = `${activeLevel} — ${tr('qz.' + activeLevel + '.name')}`;

  if (passed) {
    resultDesc.textContent = nextCode
      ? tr('qz.pass.desc').replace('{next}', nextCode + ' — ' + tr('qz.' + nextCode + '.name'))
      : tr('qz.pass.top');
  } else {
    resultDesc.textContent = tr('qz.fail.desc').replace('{level}', activeLevel + ' — ' + tr('qz.' + activeLevel + '.name'));
  }

  if (passed && nextCode) {
    nextLevelBtn.style.display = 'inline-flex';
    nextLevelBtn.textContent   = tr('qz.nextlevel').replace('{next}', nextCode);
    nextLevelBtn.onclick       = () => startLevelQuiz(nextCode);
  } else if (passed && !nextCode) {
    nextLevelBtn.style.display = 'inline-flex';
    nextLevelBtn.textContent   = tr('qz.book');
    nextLevelBtn.onclick       = () => window.navigate && window.navigate('contact');
  } else {
    nextLevelBtn.style.display = 'none';
  }
}

/* ── Button listeners ── */
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    current++;
    if (current < LEVEL_QUESTIONS[activeLevel].length) {
      renderQuestion();
    } else {
      showResult();
    }
  });
}

if (retryBtn)      retryBtn.addEventListener('click', () => startLevelQuiz(activeLevel));
if (chooseLevelBtn) chooseLevelBtn.addEventListener('click', showLevelSelect);

document.querySelectorAll('.quiz-level-card').forEach(card => {
  card.addEventListener('click', () => startLevelQuiz(card.dataset.level));
});

/* ── Exposed globals ── */
window.resetQuiz = function() { showLevelSelect(); };

window.renderQuizLang = function() {
  if (!activeLevel || quizCard.style.display === 'none') return;
  const tr = (typeof t === 'function') ? t : k => k;
  progressText.textContent = tr('qz.progress').replace('{n}', current + 1);
  questionNum.textContent  = tr('qz.qnum').replace('{n}', current + 1);
  if (nextBtn.classList.contains('visible')) {
    const questions = LEVEL_QUESTIONS[activeLevel];
    nextBtn.textContent = current < questions.length - 1 ? tr('qz.next') : tr('qz.see');
  }
};

/* Start on level selector */
showLevelSelect();
