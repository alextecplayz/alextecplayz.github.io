window.addEventListener("load", function() {
    var progressBars = document.querySelectorAll(".progress-bar");
    
    progressBars.forEach(function(progressBar) {
      var desiredPercentage = progressBar.dataset.progress;
      progressBar.style.width = desiredPercentage + "%";
    });
  });
  