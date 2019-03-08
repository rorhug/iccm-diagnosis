var AudioContext = require('web-audio-api').AudioContext
//var OfflineAudioContext = require('web-audio-api').OfflineAudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');
//var length = 0;

var pcmdata = [] ;
var amp = [];

//Note: I have no rights to these sound files and they are not created by me.
//You may downlaod and use your own sound file to further test this.
//
var soundfile = "sounds/Piece8.mp3"
decodeSoundFile(soundfile);

/**
 * [decodeSoundFile Use web-audio-api to convert audio file to a buffer of pcm data]
 * @return {[type]} [description]
 */
function decodeSoundFile(soundfile){
  console.log("decoding mp3 file ", soundfile, " ..... ")
  fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
      console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
//      length =audioBuffer.length;
      pcmdata = (audioBuffer.getChannelData(0)) ;
      samplerate = audioBuffer.sampleRate;
      maxvals = [] ; max = 0 ;
      playsound(soundfile)
/*      var filter = context.createBiquadFilter();
      //filter.type is defined as string type in the latest API. But this is defined as number type in old API.
      filter.type = (typeof filter.type === 'string') ? 'lowpass' : 0; // LOWPASS
      filter.frequency.value = 5000;
      // Connect source to filter, filter to destination.
      source.connect(filter);
      filter.connect(context.destination);
*/
      pcmdata = magnifySound(pcmdata);
      findPeaks(pcmdata, samplerate);
      findAmplitudes(pcmdata);
    }, function(err) { throw err })
  })
}



/**
 * [findPeaks Naive algo to identify peaks in the audio data, and wave]
 * @param  {[type]} pcmdata    [description]
 * @param  {[type]} samplerate [description]
 * @return {[type]}            [description]
 */
function findPeaks(pcmdata, samplerate){
//  offlineContext = new OfflineAudioContext(1, length, samplerate);

  var interval = 0.05 * 1000 ; index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
  var prevmax = 0 ;
  var prevdiffthreshold = 0.4;
  var count = 0;
  var cooldown = 0;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
      //count = count/2;
      console.log("finished sampling sound - total peaks: " + count);
      console.log("Using https://github.com/victordibia/beats for soundwave analysis")
      return;
    }

    for(var i = index; i < index + step ; i++){
      max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
    }

    // Spot a significant increase? Potential peak
    bars = getbars(max) ;
    if((max-prevmax >= prevdiffthreshold) && cooldown == 0){
    //if((max-prevmax >= 0.1) && (max >= 0.5)){
      bars = bars + " == peak == ";
      count = count + 1
      cooldown = 5;
    }
    else{
      if(cooldown > 0)
      {
          cooldown = cooldown - 1;
      }
      //console.log("Cooldown: " + cooldown);
    }

    // Print out mini equalizer on commandline
    console.log(bars, max )
    prevmax = max ; max = 0 ; index += step ;
  }, interval,pcmdata);
}

/**
 * TBD
 * @return {[type]} [description]
 */
function detectBeats(){

}

/**
 * [getbars Visualize image sound using bars, from average pcmdata within a sample interval]
 * @param  {[Number]} val [the pcmdata point to be visualized ]
 * @return {[string]}     [a set of bars as string]
 */
function getbars(val){
  bars = ""
  for (var i = 0 ; i < val*50 + 2 ; i++){
    bars= bars + "|";
  }
  return bars ;
}

/**
 * [Plays a sound file]
 * @param  {[string]} soundfile [file to be played]
 * @return {[type]}           [void]
 */
function playsound(soundfile){
  // linux or raspi
  // var create_audio = exec('aplay'+soundfile, {maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
  var create_audio = exec('ffplay -autoexit '+soundfile, {maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      //console.log(" finshed ");
      //micInstance.resume();
    }
  });
}

function magnifySound(pcmdata){
  for(var i = 0; i < pcmdata.length; i++)
  {
    pcmdata[i] = pcmdata[i]*2;
  }
  return pcmdata;
}

function findAmplitudes(pcmdata){
  var present = false;
  console.log("Called 1");
  for(var i = 0; i < pcmdata.length; i++)
  {
    for(var j = 0; j < amps.length; j++)
    {
      if(pcmdata[i] == amps[j])
      {
        present = true;
      }
    }
    if(!present)
    {
      amps.push(pcmdata[i]);
      console.log("Running:" + pcmdata[i]);
    }
    present = false;
  }
}
