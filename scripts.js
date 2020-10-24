const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const range = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress__filled');
const progressBar = document.querySelector('.progress')

function play(){
  const method = video.paused ? 'play' : 'pause' ;
    video[method]();  
  

}

function updateButton(){
  const icon = video.paused? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value)
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100 ;  
  progress.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

video.addEventListener('click', play);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', play);
skipButtons.forEach(button => button.addEventListener('click', skip));
range.forEach(range => range.addEventListener('change', handleRangeUpdate));
range.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progressBar.addEventListener('click', scrub);

let mousedown = false;
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
