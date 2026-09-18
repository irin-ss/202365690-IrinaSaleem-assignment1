document.addEventListener('DOMContentLoaded', () => {
    // initGreeting();
    initThemeToggle();
    // initContactForm();
    //setFooterYear();
});

/* --------------------------------------------------------------------
 * 2. Dark / light theme toggle
 *    Preference is saved in localStorage so it persists across visits.
 * ------------------------------------------------------------------ */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const STORAGE_KEY = 'portfolio-theme';

    if (!toggleBtn) return;

    // Apply a saved preference, or fall back to the visitor's OS setting.
    const saved = safeGetItem(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startTheme = saved || (prefersDark ? 'dark' : 'light');

    applyTheme(startTheme);

    toggleBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        safeSetItem(STORAGE_KEY, next);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            toggleBtn.setAttribute('aria-pressed', 'true');
            toggleBtn.querySelector('.theme-toggle-icon').textContent = '☀';
            toggleBtn.querySelector('.theme-toggle-label').textContent = 'Light mode';
        } else {
            root.removeAttribute('data-theme');
            toggleBtn.setAttribute('aria-pressed', 'false');
            toggleBtn.querySelector('.theme-toggle-icon').textContent = '☾';
            toggleBtn.querySelector('.theme-toggle-label').textContent = 'Dark mode';
        }
    }
}

// localStorage can throw in some contexts (private browsing, disabled
// storage). These wrappers make the theme toggle fail quietly instead
// of breaking the whole page.
function safeGetItem(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSetItem(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}
