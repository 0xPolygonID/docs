import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function SearchBar() {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const searchRef = useRef(null);
  const pagefindUIRef = useRef(null);
  const overlayRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (!isBrowser) return;

    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    const closeModal = () => {
      const searchInput = document.querySelector('.pagefind-ui__search-input');
      if (searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      document.body.classList.remove('pagefind-modal-open');
    };

    const ensureOverlay = () => {
      let overlay = document.querySelector('.search-overlay-backdrop');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'search-overlay-backdrop';
        overlay.addEventListener('click', closeModal); // click outside closes
        document.body.appendChild(overlay);
      }
      overlayRef.current = overlay;
    };

    const loadPagefind = async () => {
      try {
        if (!document.getElementById('pagefind-ui-script')) {
          const script = document.createElement('script');
          script.id = 'pagefind-ui-script';
          script.src = '/pagefind/pagefind-ui.js';
          script.type = 'text/javascript';
          document.head.appendChild(script);

          const link = document.createElement('link');
          link.href = '/pagefind/pagefind-ui.css';
          link.rel = 'stylesheet';
          document.head.appendChild(link);

          // JS version (no <void>)
          await new Promise((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load pagefind-ui.js'));
          });
        }

        if (!pagefindUIRef.current && searchRef.current && window.PagefindUI) {
          pagefindUIRef.current = new window.PagefindUI({
            element: searchRef.current,
            showSubResults: true,
            resetStyles: false,
            showImages: false,
            pageSize: 1000,
            translations: { placeholder: 'Search documentation...' },
            processResult: (result) => {
              if (result.element) {
                result.element.style.display = 'block';
                result.element.style.visibility = 'visible';
                result.element.style.opacity = '1';
              }
              return result;
            },
          });

          if (pagefindUIRef.current && pagefindUIRef.current.options) {
            pagefindUIRef.current.options.limit = 1000;
            pagefindUIRef.current.options.showSubResults = true;
          }

          setupModalEventListeners();
          ensureOverlay();
        }
      } catch (error) {
        console.warn('Pagefind not available:', error);
      }
    };

    let observer = null;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    const handleClickOutside = (event) => {
      const resultsArea = document.querySelector('.pagefind-ui__results-area');
      if (
        resultsArea &&
        !resultsArea.contains(event.target) &&
        !(searchRef.current && searchRef.current.contains(event.target))
      ) {
        closeModal();
      }
    };
    const handleCloseButtonClick = (event) => {
      if (event.target.closest('.pagefind-ui__close')) {
        closeModal();
      }
    };

    const setupModalEventListeners = () => {
      // Toggle body class when results container appears/disappears
      observer = new MutationObserver(() => {
        const resultsArea = document.querySelector('.pagefind-ui__results-area');
        const visible =
          resultsArea &&
          resultsArea.style.display !== 'none' &&
          getComputedStyle(resultsArea).display !== 'none';

        if (visible) {
          document.body.classList.add('pagefind-modal-open'); // overlay turns on via CSS
        } else {
          document.body.classList.remove('pagefind-modal-open');
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Keep the results list scrollable and all results visible
      const resultsList = document.querySelector('.pagefind-ui__results-list');
      if (resultsList) {
        const checkScroll = () => {
          const { scrollTop, scrollHeight, clientHeight } = resultsList;
          const hasMore = scrollTop + clientHeight < scrollHeight - 10;
          resultsList.classList.toggle('has-more-content', hasMore);
        };
        const ensureAllResultsVisible = () => {
          const results = resultsList.querySelectorAll('.pagefind-ui__result');
          results.forEach((r) => {
            r.style.display = 'block';
            r.style.visibility = 'visible';
            r.style.opacity = '1';
            r.style.height = 'auto';
            r.style.minHeight = 'auto';
          });
          resultsList.style.overflowY = 'scroll';
          resultsList.style.overflowX = 'hidden';
          resultsList.style.maxHeight = 'calc(85vh - 80px)';
          resultsList.style.minHeight = '300px';
          resultsList.classList.toggle('has-many-results', results.length > 10);
          setTimeout(() => {
            resultsList.style.overflowY = 'scroll';
            resultsList.style.overflowX = 'hidden';
          }, 100);
        };

        checkScroll();
        ensureAllResultsVisible();

        resultsList.addEventListener('scroll', checkScroll);
        const contentObserver = new MutationObserver(() => {
          checkScroll();
          ensureAllResultsVisible();
        });
        contentObserver.observe(resultsList, { childList: true, subtree: true });

        // Make sure we clean up these two on unmount:
        // We'll store references on the element itself to remove later if needed.
        resultsList._pfCheckScroll = checkScroll;
        resultsList._pfContentObserver = contentObserver;
      }

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('click', handleCloseButtonClick);
    };

    loadPagefind();

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('click', handleCloseButtonClick);
      if (observer) observer.disconnect();
      const resultsList = document.querySelector('.pagefind-ui__results-list');
      if (resultsList && resultsList._pfContentObserver) {
        resultsList.removeEventListener('scroll', resultsList._pfCheckScroll || (() => {}));
        resultsList._pfContentObserver.disconnect();
        delete resultsList._pfCheckScroll;
        delete resultsList._pfContentObserver;
      }
      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }
      if (pagefindUIRef.current) pagefindUIRef.current = null;
      document.body.classList.remove('pagefind-modal-open');
    };
  }, [isBrowser]);

  const getSearchBarWidth = () => {
    if (windowWidth >= 1200) return '300px';
    if (windowWidth >= 992) return '250px';
    if (windowWidth >= 768) return '200px';
    if (windowWidth >= 576) return '160px';
    if (windowWidth >= 480) return '140px';
    if (windowWidth >= 360) return '120px';
    return '100px';
  };

  if (!isBrowser) return null;

  return (
    <div
      ref={searchRef}
      style={{
        marginRight: '1rem',
        minWidth: getSearchBarWidth(),
        width: getSearchBarWidth(),
        maxWidth: '100%',
        transition: 'width 0.3s ease, min-width 0.3s ease',
      }}
    />
  );
}
