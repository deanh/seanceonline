function makeSynth() {
    let envelope = {
        attack: 2,
        release: 9,
        releaseCurve: 'linear'
    };
    let filterEnvelope = {
        baseFrequency: 150,
        octaves: 3,
        attack: 1.5,
        decay: 0,
        release: 3000
    };
    
    return new Tone.DuoSynth({
        volume: -30,
        harmonicity: 0.99,
        voice0: {
            oscillator: {type: 'square'},
            envelope,
            filterEnvelope
        },
        voice1: {
            oscillator: {type: 'sine'},
            envelope,
            filterEnvelope
        },
        vibratoRate: 0.5,
        vibratoAmount: 0.1
    });
}

let leftSynth = makeSynth();
let rightSynth = makeSynth();
let echo = new Tone.FeedbackDelay('16n', 0.2);
let delay1 = new Tone.FeedbackDelay(6.0, 0.5);
let delay2 = new Tone.FeedbackDelay(1.5, 0.6);
let freeverb = new Tone.Freeverb().toMaster();
// let panL = new Tone.Panner(1);
// let panR = new Tone.Panner(-1);
freeverb.dampening.value = 1000;
leftSynth.connect(echo);
rightSynth.connect(echo);

// panL.connect(echo);
// panR.connect(echo);
echo.connect(delay1);
echo.toMaster();
delay1.connect(delay2);

delay2.connect(freeverb);
freeverb.toMaster();
echo.connect(delay1);
echo.connect(delay2);
//delay.connect(delay);

new Tone.Loop(time => {
    leftSynth.triggerAttackRelease('C3', '1:2', time);
    leftSynth.setNote('D3', '+0:2');
  
    leftSynth.triggerAttackRelease('E4', '0:2', '+6:0');
  
    leftSynth.triggerAttackRelease('G4', '0:2', '+9:2');
  
    leftSynth.triggerAttackRelease('E3', '2:0', '+17:0');
    leftSynth.setNote('G5', '+19:3:0');
    leftSynth.setNote('A5', '+19:1:2');
    leftSynth.setNote('G5', '+19:4:2');
}, '32m').start();
  
new Tone.Loop(time => {
    rightSynth.triggerAttackRelease('D4', '1:2', '+5:0');
    // Switch to E4 after one more measure
    rightSynth.setNote('E4', '+8:0');
  
    rightSynth.triggerAttackRelease('B3', '1m', '+19:2:2');
    rightSynth.setNote('G3', '+12:0:2');
    rightSynth.triggerAttackRelease('G4', '0:2', '+21:2');
  }, '37m').start();

// Tone's Transport needs to be started for any loops to become active
// Tone.Transport.start();