/**
 * What's new on the landing card: the list is static HTML (web/changelog.js writes it into
 * index.html), so this only drops its bottom fade once the list is scrolled to the end, or
 * when it is short enough not to scroll at all.
 */
import { t, currentLang } from './i18n.js';

export function updateWhatsNewTranslations() {
  document.querySelectorAll('#whatsnew li').forEach((li) => {
    const orig = (li.dataset.origText ??= li.textContent.trim());
    if (currentLang === 'en') {
      li.textContent = orig;
    } else {
      const tr = t(orig);
      li.textContent = (tr && tr !== orig) ? tr : orig;
    }
  });
}

const list = document.querySelector('#whatsnew .list');
if (list) {
  const fade = () => list.classList.toggle('end', list.scrollTop + list.clientHeight >= list.scrollHeight - 2);
  list.addEventListener('scroll', fade, { passive: true });
  fade();
}

window.addEventListener('languagechange', updateWhatsNewTranslations);
updateWhatsNewTranslations();
