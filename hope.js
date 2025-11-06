const audio   = document.getElementById('a');
const playBtn = document.getElementById('pp');
const bar     = document.getElementById('bar');
const prog    = document.getElementById('prog');
const time    = document.getElementById('time');
const vol     = document.getElementById('vol');
const icon    = document.getElementById('icon');

const fmt = t => '999:' + String(Math.floor(t % 60)).padStart(2, '0');

playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    document.body.classList.add("playing");
  } else {
    audio.pause();
    document.body.classList.remove("playing");
  }
};

audio.onplay  = () => icon.setAttribute('d', 'M6 4h4v16H6V4zm8 0h4v16h-4V4z');
audio.onpause = () => icon.setAttribute('d', 'M8 5v14l11-7z');

audio.ontimeupdate = () => {
  prog.style.width = (audio.currentTime / audio.duration * 100) + '%';
  time.textContent = fmt(audio.currentTime);
};

bar.onclick = e => audio.currentTime = (e.offsetX / bar.offsetWidth) * audio.duration;

const VOL_KEY = 'hope_vol';
vol.value = localStorage.getItem(VOL_KEY) || 70;
audio.volume = vol.value / 100;
vol.oninput = () => {
  audio.volume = vol.value / 100;
  localStorage.setItem(VOL_KEY, vol.value);
};

document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); playBtn.click(); }
  if (e.code === 'ArrowLeft')  audio.currentTime -= 5;
  if (e.code === 'ArrowRight') audio.currentTime += 5;
});
