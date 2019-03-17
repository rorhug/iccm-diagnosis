var AudioContext = require('web-audio-api').AudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');
//var length = 0;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
var pcmdata = [];
var maxArr = [];
<<<<<<< HEAD
var amps = [];
var freqs = [];
=======
var pcmdata = [] ;
<<<<<<< HEAD
var amp = [];
>>>>>>> Analysing amplitudes
=======
var pcmdata = [];
var maxArr = [];
var amps = [];
var freqs = [];
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe

var total = 0;
var average = 0;
var deviation = 0;
var finalBPM = 0;

var soundfile = "sounds/New-3Breaths.mp3"
decodeSoundFile(soundfile, (bpm) => console.log(bpm));
<<<<<<< HEAD
=======
=======
var pcmdata = [];
>>>>>>> Counting frequencies (Bugged)
=======
>>>>>>> Frequency count fixed
var amps = [];
var freqs = [];

var total = 0;
var average = 0;
var deviation = 0;
var finalBPM = 0;

var soundfile = "sounds/New-3Breaths.mp3"
decodeSoundFile(soundfile, (bpm) => console.log(bpm));
<<<<<<< HEAD
//printAmps(amps);
>>>>>>> Amplitudes measured
=======
>>>>>>> Runtime Improved + Coomments Added
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe

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
      pcmdata = (audioBuffer.getChannelData(0)) ;
      samplerate = audioBuffer.sampleRate;
      maxvals = [] ; max = 0 ;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

      findPeaks(pcmdata, samplerate, done);

=======
      playsound(soundfile)
=======
//      playsound(soundfile)
>>>>>>> Standard Deviation added
/*      var filter = context.createBiquadFilter();
      //filter.type is defined as string type in the latest API. But this is defined as number type in old API.
      filter.type = (typeof filter.type === 'string') ? 'lowpass' : 0; // LOWPASS
      filter.frequency.value = 5000;
      // Connect source to filter, filter to destination.
      source.connect(filter);
      filter.connect(context.destination);
*/
<<<<<<< HEAD
      pcmdata = magnifySound(pcmdata);
<<<<<<< HEAD
      findPeaks(pcmdata, samplerate)
>>>>>>> Accuracy Improvements
=======
=======
      //pcmdata = magnifySound(pcmdata);
<<<<<<< HEAD
>>>>>>> Analysis Improvements
      findPeaks(pcmdata, samplerate);
<<<<<<< HEAD
      findAmplitudes(pcmdata);
>>>>>>> Analysing amplitudes
=======
=======
      findPeaks(pcmdata, samplerate, done);
>>>>>>> Passing Function
      //console.log("Called print");
>>>>>>> Amplitudes measured
    }, function(err) { throw err })
  })
<<<<<<< HEAD
  return;
=======
  return; /*Integer*/
>>>>>>> Changes
=======
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe

      findPeaks(pcmdata, samplerate, done);

    }, function(err) { throw err })
  })
  return;
<<<<<<< HEAD
>>>>>>> Runtime Improved + Coomments Added
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
}



/**
 * [findPeaks runs through pcmdata, adding every amplitude to global amps array]
 * @param  {[type]} pcmdata    [description]
 * @param  {[type]} samplerate [description]
 * @return {[type]}            [description]
 */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
function findPeaks(pcmdata, samplerate, done){
=======
function findPeaks(pcmdata, samplerate){
<<<<<<< HEAD
//  offlineContext = new OfflineAudioContext(1, length, samplerate);
>>>>>>> Accuracy Improvements
=======
>>>>>>> Testing different breathing
=======
function findPeaks(pcmdata, samplerate, done){
>>>>>>> Passing Function
=======
function findPeaks(pcmdata, samplerate, done){
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe

  var interval = 0.05 * 1000 ; index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  var prevmax = 0 ;
  var prevdiffthreshold = 0.4;
  var count = 0;
  var aboveAverage = false;
  var aboveCount = 0;
=======
//  var prevmax = 0 ;
//  var prevdiffthreshold = 0.4;
//  var count = 0;
//  var aboveAverage = false;
//  var aboveCount = 0;
>>>>>>> Testing different breathing
//  var cooldown = 0;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
//      count = bpm(count);
//      console.log("finished sampling sound - total breaths: " + count + " bpm");
//      console.log("Using https://github.com/victordibia/beats for soundwave analysis")
    //  printArray(amps);
      countFreq(amps);
    //  printArray(freqs);
      printResults();
      playsound(soundfile);
      loopThrough(pcmdata, samplerate, done);
      return;
    }
>>>>>>> Accuracy Improvements
=======
>>>>>>> Runtime Improved + Coomments Added
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe

  while(index < pcmdata.length)
  {
    for(var i = index; i < index + step ; i++){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      max = pcmdata[i] > max ? pcmdata[i] : max ;
      maxArr.push(max);
      checkAmplitude(max);
=======
      max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
=======
      max = pcmdata[i] > max ? pcmdata[i]/*.toFixed(1)*/  : max ;
>>>>>>> Testing different breathing
      //console.log(max);
      maxArr.push(max);
      checkAmplitude(max);
    }

    // Spot a significant increase? Potential peak
/*    bars = getbars(max) ;
    if(max > average/* && cooldown == 0)
    {
/*      if(!aboveAverage)
      {
        /*if(aboveCount >= 1)
        {
          count = count + 1;
        }
        aboveAverage = true;
      }
      aboveCount++;
      bars = bars + " == peak == " ;
    }
    else/* if(max < average)*/
    {
/*      if(aboveAverage && aboveCount >= 2)
      {
        count++;
      }
<<<<<<< HEAD
      //console.log("Cooldown: " + cooldown);
>>>>>>> Accuracy Improvements
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
      max = pcmdata[i] > max ? pcmdata[i] : max ;
      maxArr.push(max);
      checkAmplitude(max);
    }
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
    max = 0 ; index += step ;
  }
      countFreq(amps);
      printResults();
      loopThrough(pcmdata, samplerate, done);
      return;
<<<<<<< HEAD
=======

=======
*/
>>>>>>> Changes
=======
      bars = bars + " == trough == (" + max + ")";
/*      aboveAverage = false;
      aboveCount = 0;*/
    }
<<<<<<< HEAD
    bars = bars + " -- " + count + " -- ";
<<<<<<< HEAD
>>>>>>> Accuracy boost
    // Print out mini equalizer on commandline
    console.log(bars, max )
    prevmax = max ; max = 0 ; index += step ;
=======
=======
/*    bars = bars + " -- " + count + " -- ";
>>>>>>> Standard Deviation added
*/    // Print out mini equalizer on commandline
//    console.log(bars, max )
//    prevmax = max ;
    max = 0 ; index += step ;
>>>>>>> Testing different breathing
  }, interval,pcmdata);
}

/**
 * TBD
 * @return {[type]} [description]
 */
function detectBeats(){

>>>>>>> Amplitudes measured
=======
      max = pcmdata[i] > max ? pcmdata[i] : max ;
      maxArr.push(max);
      checkAmplitude(max);
    }
    max = 0 ; index += step ;
  }
      countFreq(amps);
      printResults();
      loopThrough(pcmdata, samplerate, done);
      return;
>>>>>>> Runtime Improved + Coomments Added
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Runtime Improved + Coomments Added
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
/**
 * [Magnifies the pcmdata such that it can be easily analysed]
 * @param {[float]} pcmdata [array to be magnified]
 * @return {[float]} pcmdata [modified array]
 */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
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
<<<<<<< HEAD
=======
=======
>>>>>>> Runtime Improved + Coomments Added
function magnifySound(pcmdata){
  for(var i = 0; i < pcmdata.length; i++)
  {
    pcmdata[i] = (pcmdata[i]*2);
  }
  return pcmdata;
}
<<<<<<< HEAD
>>>>>>> Accuracy Improvements
=======

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
<<<<<<< HEAD
>>>>>>> Analysing amplitudes
=======

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
<<<<<<< HEAD
>>>>>>> Counting frequencies (Bugged)
=======

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
<<<<<<< HEAD
>>>>>>> Frequency changes
=======

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
<<<<<<< HEAD
>>>>>>> Analysis Improvements
=======

/**
 * [Removes double count for inhale and exhale]
 * @param {int} count     [total number of breaths measured]
 * @return {int} count    [new breath amount]
 */
function bpm(count){
  count = count/2;
  return count;
}
<<<<<<< HEAD
>>>>>>> Accuracy boost
=======

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
<<<<<<< HEAD
  }
<<<<<<< HEAD
>>>>>>> Testing different breathing
=======

=======
    //clearInterval(samplesound);
    finalBPM = bpm(count);
    done(finalBPM)
    console.log("finished sampling sound - total breaths: " + finalBPM + " bpm");
    console.log("Using https://github.com/victordibia/beats for soundwave analysis")
    return;
}
>>>>>>> Runtime Improved + Coomments Added

<<<<<<< HEAD
  export default decodeSoundFile;
>>>>>>> Passing Function
=======
  // export default decodeSoundFile;
>>>>>>> Removing multiplier
=======
>>>>>>> 02253a46fad2ac78943af58bacd99eeec12038fe
