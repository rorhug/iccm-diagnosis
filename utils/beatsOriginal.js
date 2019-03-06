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
var deviation = 0;
var finalBPM = 0;

var soundfile = "sounds/New-3Breaths.mp3"
decodeSoundFile(soundfile, (bpm) => console.log(bpm));

/**
 * [decodeSoundFile Use web-audio-api to convert audio file to a buffer of pcm data]
 * @return {[type]} [description]
 */
function decodeSoundFile(soundfile, done){
  console.log("decoding mp3 file ", soundfile, " ..... ")
  fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
      console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
//      length =audioBuffer.length;
      pcmdata = (audioBuffer.getChannelData(0)) ;
      samplerate = audioBuffer.sampleRate;
      maxvals = [] ; max = 0 ;
<<<<<<< HEAD

      findPeaks(pcmdata, samplerate, done);

=======
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
      findPeaks(pcmdata, samplerate)
>>>>>>> Accuracy Improvements
    }, function(err) { throw err })
  })
  return;
}



/**
 * [findPeaks runs through pcmdata, adding every amplitude to global amps array]
 * @param  {[type]} pcmdata    [description]
 * @param  {[type]} samplerate [description]
 * @return {[type]}            [description]
 */
<<<<<<< HEAD
function findPeaks(pcmdata, samplerate, done){
=======
function findPeaks(pcmdata, samplerate){
//  offlineContext = new OfflineAudioContext(1, length, samplerate);
>>>>>>> Accuracy Improvements

  var interval = 0.05 * 1000 ; index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
<<<<<<< HEAD
=======
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
>>>>>>> Accuracy Improvements

  while(index < pcmdata.length)
  {
    for(var i = index; i < index + step ; i++){
<<<<<<< HEAD
      max = pcmdata[i] > max ? pcmdata[i] : max ;
      maxArr.push(max);
      checkAmplitude(max);
=======
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
>>>>>>> Accuracy Improvements
    }
    max = 0 ; index += step ;
  }
      countFreq(amps);
      printResults();
      loopThrough(pcmdata, samplerate, done);
      return;
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
      //console.log(" finished ");
      //micInstance.resume();
    }
  });
}

<<<<<<< HEAD
/**
 * [Magnifies the pcmdata such that it can be easily analysed]
 * @param {[float]} pcmdata [array to be magnified]
 * @return {[float]} pcmdata [modified array]
 */
function magnifySound(pcmdata){
  for(var i = 0; i < pcmdata.length; i++)
  {
    pcmdata[i] = (pcmdata[i]*2);
  }
  return pcmdata;
}

/**
 * [Checks if amplitude provided is member of global amps array, if not - add to array]
 * @param {int} value         [value to be checked]
 * @return {[type]}           [void]
 */
function checkAmplitude(value){
  var present = false;
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
// adds new frequency for each new amplitude measured
    freqs.push(0);
  }
  return;
}

/**
* [Prints array]
* @param {[float]} array     [array of floats to be printed]
* @return {[type]}           [void]
*/
function printArray(array){
  console.log("Length of Array: " + array.length);
  for(var i = 0; i < array.length; i++)
  {
    console.log((i + 1) + ". Value: " + array[i]);
  }
  return;
}

/**
 * [Counts the Frequency of each amplitude in amps array]
 * @param {[float]} amps      [array of amplitudes]
 * @return {[type]}           [void]
 */
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

/**
* [prints the total amount of frequencies measured + average amplitude]
* @param {[type]}            [void]
* @return {[type]}           [void]
*/
function printResults(){
  totalFreqs();
  weightedAverage(amps,freqs,total);
  return;
}

/**
 * [Counts total number of frequencies measured]
 * @param {[type]}            [void]
 * @return {[type]}           [void]
 */
function totalFreqs(){
  total = 0;
  for(var i = 0; i < freqs.length; i++)
  {
    total = total  + freqs[i];
  }
  console.log("Total frequencies: " + total);
}

/**
 * [calculates weighted average amplitude]
 * @param {[float]} amps        [array of amplitudes measured from pcmdata]
 * @param {[float]} freqs       [frequency of each amplitude]
 * @param {int} total           [total amount of frequencies]
 * @return {[type]}           [void]
 */
function weightedAverage(amps,freqs,total){
  average = 0;
  for(var i = 0; i < amps.length; i++)
  {
    average = average + (amps[i]*(freqs[i]/total));
  }
  console.log("Average amplitude: " + average.toFixed(3));
  return;
}

/**
 * [Removes double count for inhale and exhale]
 * @param {int} count     [total number of breaths measured]
 * @return {int} count    [new breath amount]
 */
function bpm(count){
  count = count/2;
  return count;
}

/**
 * [Calculate standard deviation of all amplitudes measured]
 * @param {[floats]} pcmdata        [all data from sound file]
 * @return {[type]}                 [void]
 */
function standardDeviation(pcmdata){
  var result = 0;
  for(var i = 0; i < amps.length; i++)
  {
    result = amps[i] - average;
    result = Math.pow(result, 2);
    result = result*freqs[i];
    deviation = deviation + (result/total);
  }
  //deviation = Math.sqrt(deviation);
  console.log("Deviation: " + deviation);
  return;
}

/**
 * [Loops through soundfile again, computes breaths per minute]
 * @param {[float]} pcmdata         [array of all data from sound file]
 * @param {float} samplerate        [sampling rate of sound file]
 * @param {[function]} done         [final BPM value to be passed to app]
 */
function loopThrough(pcmdata,samplerate,done){

    var interval = 0.05 * 1000 ; index = 0 ;
    var step = Math.round( samplerate * (interval/1000) );
    var max = 0 ;
    var prevmax = 0 ;
    var prevdiffthreshold = 0.4;
    var count = 0;
    var aboveAverage = false;
    var aboveCount = 0;
    standardDeviation(pcmdata);

    while(index < pcmdata.length) {
      for(var i = index; i < index + step ; i++){
        max = pcmdata[i] > max ? pcmdata[i] : max ;
      }

      bars = getbars(max) ;
      if(max > (average + deviation)/*0.0128(average*0.4029)/* && cooldown == 0*/)
      {
        if(!aboveAverage)
        {
          aboveAverage = true;
        }
        aboveCount++;
        bars = bars + " == peak == " ;
      }
      else
      {
        if(aboveAverage && aboveCount >= 2)
        {
          count++;
        }
        bars = bars + " == trough == ";
        aboveAverage = false;
        aboveCount = 0;
      }
      bars = bars + " -- " + count + " -- ";
      prevmax = max ; max = 0 ; index += step ;
    }
    //clearInterval(samplesound);
    finalBPM = bpm(count);
    done(finalBPM)
    console.log("finished sampling sound - total breaths: " + finalBPM + " bpm");
    console.log("Using https://github.com/victordibia/beats for soundwave analysis")
    return;
}

  // export default decodeSoundFile;
=======
function magnifySound(pcmdata){
  for(var i = 0; i < pcmdata.length; i++)
  {
    pcmdata[i] = pcmdata[i]*2;
  }
  return pcmdata;
}
>>>>>>> Accuracy Improvements
