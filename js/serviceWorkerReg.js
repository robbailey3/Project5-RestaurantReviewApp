/*
 Service worker stuff below.
*/
let newWorker, refreshing;
// Check if the browser supports service workers.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(response => {
      response.onupdatefound = () => {
        newWorker = response.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed') {
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
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}
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

// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker;
