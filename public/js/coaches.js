(function () {
  const overlay = document.getElementById('coachModal');
  if (!overlay) return;

  const closeBtn  = document.getElementById('coachModalClose');
  const modalImg  = document.getElementById('coachModalImg');
  const modalLabel = document.getElementById('coachModalLabel');
  const modalName = document.getElementById('coachModalName');
  const modalBio  = document.getElementById('coachModalBio');

  function openModal(card) {
    const img   = card.querySelector('.coach-photo img');
    const name  = card.querySelector('h3').textContent.trim();
    const label = card.dataset.label || card.querySelector('p').textContent.trim();
    const bio   = card.dataset.bio || '';

    modalImg.src   = img.src;
    modalImg.alt   = img.alt;
    modalName.textContent  = name;
    modalLabel.textContent = label;
    modalBio.textContent   = bio;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.coach-card.has-modal').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card); });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
