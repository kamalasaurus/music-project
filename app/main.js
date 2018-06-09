void function() {
  console.log('HELLO');
  const synth = new Tone.Synth().toMaster();
  const tuna = new Tuna(new AudioContext());
  synth.connect(tuna);
}();

