/*
 Service worker stuff below.
*/
let newWorker, refreshing;
// Check if the browser supports service workers.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(response => {
      // Do stuff when an update is found
      response.onupdatefound = () => {
        newWorker = response.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed') {
            // Display the little pop-up
            document.querySelector('#new-version-available').style.display =
              'block';
          }
        };
      };
    })
    .catch(err => {
      // Catch any errors that have occurred
      // Note: In a real world app, this would log the error somewhere.
      console.log(err);
    });
  /**
   * Listen out for when the new Service Worker is
   * loaded. When it is, refresh the page
   * */
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}
// Only look for DOM Elements when the content is loaded.
document.addEventListener('DOMContentLoaded', () => {
  const updateBtn = document.querySelector('#update-btn');
  updateBtn.addEventListener('click', () => {
    newWorker.postMessage({ action: 'skipWaiting' });
  });
  const closeBtn = document.querySelector('#close-update');
  closeBtn.addEventListener('click', () => {
    document.querySelector('#new-version-available').style.display = 'none';
  });
});
