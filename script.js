/* ==========================================================================
   FOR SHARON — JAVASCRIPT INTERACTIONS
   Progress tracking, reading modes, ambient audio, and smooth navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('progress-bar');
  
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();



  // 3. Chapters Drawer Navigation
  const navTrigger = document.getElementById('nav-pill-trigger');
  const chapterList = document.getElementById('chapter-list');

  if (navTrigger && chapterList) {
    navTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      chapterList.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!chapterList.contains(e.target) && !navTrigger.contains(e.target)) {
        chapterList.classList.remove('show');
      }
    });

    chapterList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        chapterList.classList.remove('show');
      });
    });
  }



  // 5. Copy Link & Toast Notification
  const copyBtn = document.getElementById('copy-link-btn');
  const toast = document.getElementById('toast-message');

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const pageUrl = window.location.href;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pageUrl).then(showToast);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = pageUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showToast();
        } catch (e) {
          console.error(e);
        }
        document.body.removeChild(textArea);
      }
    });
  }

  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
