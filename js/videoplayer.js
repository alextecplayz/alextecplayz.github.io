document.addEventListener('DOMContentLoaded', function() {var video = document.getElementById('landing-video'); var button = document.getElementById('video-control-btn'); if (video.paused) {button.textContent = '⏵';} else {button.textContent = '⏸';} button.addEventListener('click', function() {if (video.paused) {video.play();button.textContent = '⏸';} else {video.pause();button.textContent = '⏵';}});});