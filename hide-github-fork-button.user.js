// ==UserScript==
// @name            Hide github fork button
// @namespace       https://github.com/mozillazg/hide-github-fork-button.user.js
// @description     Hide github fork button for some reason.
// @version         0.1.0
// @author          mozillazg
// @include         https://github.com/test/*
// @run-at          document-end
// ==/UserScript==

(function () {
  "use strict";

  function isContainFork() {
    return (document.querySelectorAll("#fork-destination-box").length !== 0);
  }

  function hideFork() {
    var buttons = document.querySelectorAll(".experiment-repo-nav .pagehead-actions li");
    if (buttons.length > 2) {
      var forkButton = buttons[2];
      forkButton.remove();
    }
  }

  // run
  function run() {
    if (isContainFork()) {
      hideFork();
    }
  }

  // DOM targets - to detect GitHub dynamic ajax page loading
  var targets = document.querySelectorAll([
    "#js-repo-pjax-container",
    "#js-pjax-container"
  ].join(","));

  Array.prototype.forEach.call(targets, function(target) {
    // detect DOM change
    new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        run();
      });
    }).observe(target, {
      childList: true,
      subtree: true
    });
  });

  run();
})();
