const audio   = document.getElementById('a');
const playBtn = document.getElementById('pp');
const bar     = document.getElementById('bar');
const prog    = document.getElementById('prog');
const time    = document.getElementById('time');
const vol     = document.getElementById('vol');
const icon    = document.getElementById('icon');

const fmt = t => '666:' + String(Math.floor(t % 60)).padStart(2, '0');

let started = false;

/* first click anywhere (except player) starts playback */
document.body.addEventListener('click', e => {
  if (started) return;
  if (e.target.closest('#player')) return;
  fadeIn();
  started = true;
}, { once: true });

/* play / pause toggle */
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause();
audio.onplay  = () => icon.setAttribute('d', 'M6 4h4v16H6V4zm8 0h4v16h-4V4z');
audio.onpause = () => icon.setAttribute('d', 'M8 5v14l11-7z');

/* progress & time */
audio.ontimeupdate = () => {
  prog.style.width = (audio.currentTime / audio.duration * 100) + '%';
  time.textContent = fmt(audio.currentTime);
};

/* seek */
bar.onclick = e => audio.currentTime = (e.offsetX / bar.offsetWidth) * audio.duration;

/* volume + remember */
const VOL_KEY = 'jane_vol';
vol.value = localStorage.getItem(VOL_KEY) || 70;
audio.volume = vol.value / 100;
vol.oninput = () => {
  audio.volume = vol.value / 100;
  localStorage.setItem(VOL_KEY, vol.value);
};

/* keyboard shortcuts */
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); playBtn.click(); }
  if (e.code === 'ArrowLeft')  audio.currentTime -= 5;
  if (e.code === 'ArrowRight') audio.currentTime += 5;
});

/* fade-in on first play */
function fadeIn() {
  audio.volume = 0;
  audio.play();
  let v = 0;
  const fade = setInterval(() => {
    v += 0.05;
    audio.volume = Math.min(v, 1);
    if (v >= 1) clearInterval(fade);
  }, 50);
}