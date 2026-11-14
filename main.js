const titleEl = document.getElementById('title');
const nameInput = document.getElementById('nameInput');
const numberInput = document.getElementById('numberInput');
const btn = document.getElementById('btn');
const resultEl = document.getElementById('result');

titleEl.textContent = 'Игровая карточка игрока';

function showError(message) {
  resultEl.className = 'error';
  resultEl.textContent = message;
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

btn.addEventListener('click', () => {
  const rawName = nameInput.value.trim();
  const rawNumber = numberInput.value.trim();

  if (!rawName) {
    showError('Введите название');
    return;
  }

  const words = rawName
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  const formattedName = words.join(' ');

  const hasForbiddenWord = words.some((word) => word.toLowerCase() === 'test');
  if (hasForbiddenWord) {
    showError('Такое название нельзя');
    return;
  }

  const abbreviation = words.map((word) => word.charAt(0)).join('');
  const nameLength = words.join('').length;

  const score = Number(rawNumber);
  if (rawNumber === '' || !Number.isFinite(score)) {
    showError('Введите цену');
    return;
  }

  const promoCode = Math.floor(Math.random() * 90) + 10;
  const formattedScore = score.toFixed(2);

  let categoryText = '';
  let categoryClass = '';

  if (score >= 1000) {
    categoryText = 'Скидка 10%';
    categoryClass = 'legend';
  } else if (score >= 500) {
    categoryText = 'Скидка 5%';
    categoryClass = 'pro';
  } else {
    categoryText = 'Без скидки';
    categoryClass = 'newbie';
  }

  const safeName = escapeHtml(formattedName);
  const safeAbbreviation = escapeHtml(abbreviation);

  resultEl.className = categoryClass;
  resultEl.innerHTML = `
    <h2>Карточка игрока</h2>
    <p>Имя: ${safeName}</p>
    <p>Аббревиатура: ${safeAbbreviation}</p>
    <p>Длина имени: ${nameLength}</p>
    <p>Очки: ${formattedScore}</p>
    <p>Промокод: ${promoCode}</p>
    <p>Категория: ${categoryText}</p>
  `;
});
