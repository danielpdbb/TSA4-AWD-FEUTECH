(() => {
  'use strict';

  // Function to retrieve the stored theme from local storage
  const getStoredTheme = () => localStorage.getItem('theme');

  // Function to save the selected theme into local storage
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

  // Function to determine the preferred theme, defaulting to 'dark'
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    return storedTheme || 'dark';
  };

  // Function to apply the selected theme by setting a data attribute on the document root
  const setTheme = (theme) => {
    let appliedTheme = theme;
    if (theme === 'auto') {
      appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-bs-theme', appliedTheme);
  };

  // Function to visually indicate the active theme on UI components like a toggle switch
  const showActiveTheme = (theme) => {
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    const activeButton = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    }
  };

  // Main function to initialize the theme based on stored preference or system preference
  const initializeTheme = () => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    showActiveTheme(preferredTheme);

    // Attach event listeners to theme toggle buttons
    document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
      button.addEventListener('click', () => {
        const selectedTheme = button.getAttribute('data-bs-theme-value');
        setStoredTheme(selectedTheme);
        setTheme(selectedTheme);
        showActiveTheme(selectedTheme);
      });
    });
  };

  // Event listener for changes in system theme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (!storedTheme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      showActiveTheme(systemTheme);
    }
  });

  // Initialize the theme when the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', initializeTheme);
})();
