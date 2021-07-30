var min_freq = document.getElementById('min_freq');
var max_freq = document.getElementById('max_freq');
var freq_range = document.getElementById('freq_range');
var vol_range = document.getElementById('vol_range');
var now_freq = document.getElementById('now_freq');
var wave_type = document.getElementById('wave_type');
var audioCtx, oscillator, volume;
var playing = false;

window.onload = function() {
    min_freq.value = 1;
    max_freq.value = 48000;
    change_val();
    freq_range.value = 440;
    change_freq();
}

function change_val() { // 最低,最高周波数を変更したとき
    freq_range.min = min_freq.value;
    freq_range.max = max_freq.value;
    change_freq();
}

function change_freq() { // 値を変更したとき
    now_freq.innerHTML = freq_range.value + 'Hz';
    now_vol.innerHTML = (vol_range.value);
    console.log('Freq: '+freq_range.value+'Hz  Vol:'+vol_range.value);
    if (playing) play();
}

function play() {
    if (playing) stop(); // 既に再生中
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator(); // 波形
    oscillator.type = wave_type.value;
    volume = audioCtx.createGain(); // 音量
    oscillator.connect(volume);
    volume.connect(audioCtx.destination);
    volume.gain.value = vol_range.value;
    oscillator.frequency.setValueAtTime(freq_range.value, audioCtx.currentTime); // value in hertz
    // oscillator.connect(audioCtx.destination);
    oscillator.start();
    playing = true;
}

function stop() { // 停止
    oscillator.stop();
    playing = false;
}