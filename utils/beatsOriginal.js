var AudioContext = require('web-audio-api').AudioContext
//var OfflineAudioContext = require('web-audio-api').OfflineAudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');
//var length = 0;

var pcmdata = [];
var maxArr = [];
var amps = [];
var freqs = [];

var total = 0;
var average = 0;

//Note: I have no rights to these sound files and they are not created by me.
//You may downlaod and use your own sound file to further test this.
//
var soundfile = "sounds/New-8Breaths.mp3"
decodeSoundFile(soundfile);
//printAmps(amps);

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
      //pcmdata = magnifySound(pcmdata);
      findPeaks(pcmdata, samplerate);
      //console.log("Called print");
    }, function(err) { throw err })
  })
  return; /*Integer*/
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
  var aboveAverage = false;
  var aboveCount = 0;
//  var cooldown = 0;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
      count = bpm(count);
      console.log("finished sampling sound - total breaths: " + count + " bpm");
      console.log("Using https://github.com/victordibia/beats for soundwave analysis")
    //  printArray(amps);
      countFreq(amps);
    //  printArray(freqs);
      printResults();
      return;
    }

    for(var i = index; i < index + step ; i++){
      max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
      //console.log(max);
      maxArr.push(max);
      checkAmplitude(max);
    }

    // Spot a significant increase? Potential peak
    bars = getbars(max) ;
    if(max > average/* && cooldown == 0*/)
    {
      if(!aboveAverage)
      {
        /*if(aboveCount >= 1)
        {
          count = count + 1;
        }*/
        aboveAverage = true;
      }
      aboveCount++;
      bars = bars + " == peak == (" + aboveCount + ")";
    }
    else/* if(max < average)*/
    {
      if(aboveAverage && aboveCount >= 2)
      {
        count++;
      }
      bars = bars + " == trough == (" + max + ")";
      aboveAverage = false;
      aboveCount = 0;
    }
    bars = bars + " -- " + count + " -- ";
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
    pcmdata[i] = (pcmdata[i]*2);
  }
  return pcmdata;
}

function checkAmplitude(value){
  var present = false;
  //console.log("Called 1");
  for(var i = 0; i < amps.length; i++)
  {
    if(value == amps[i])
    {
      present = true;
    }
  }
  if(!present)
  {
    amps.push(value);
    freqs.push(0);
    //console.log("Pushed: " + value);
  }
  return;
}

function printArray(array){
  console.log("Length of Array: " + array.length);
  for(var i = 0; i < array.length; i++)
  {
    console.log((i + 1) + ". Value: " + array[i]);
  }
  return;
}

function countFreq(amps){
  for(var j = 0; j < maxArr.length; j++)
  {
    for(var i = 0; i < amps.length; i++)
    {
      if(maxArr[j] == amps[i])
      {
        freqs[i] = freqs[i] + 1;
      }
    }
  }
  return;
}

function printResults(){
  for(var i = 0; i < amps.length; i++)
  {
    console.log("Amplitude: " + amps[i] + " - Frequency: " + freqs[i]);
  }
  totalFreqs();
  weightedAverage(amps,freqs,total);
  return;
}

function totalFreqs(){
  total = 0;
  for(var i = 0; i < freqs.length; i++)
  {
    total = total  + freqs[i];
  }
  console.log("Total frequencies: " + total);
}

function weightedAverage(amps,freqs,total){
  average = 0;
  for(var i = 0; i < amps.length; i++)
  {
    average = average + (amps[i]*(freqs[i]/total));
  }
  console.log("Average amplitude: " + average.toFixed(3));
  return;
}

function bpm(count){
  count = count/2;
  count = count*6;
  return count;
}
