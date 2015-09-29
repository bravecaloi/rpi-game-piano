#!/bin/bash
COUNTER=0
while [  $COUNTER -lt 59 ]; do

  if [ $COUNTER -ge 10 ]; then
    ffmpeg -i harp_$COUNTER.mp3 ../wav/harp_$COUNTER.wav
  else
    ffmpeg -i harp_0$COUNTER.mp3 ../wav/harp_0$COUNTER.wav
  fi

  let COUNTER=COUNTER+1
done
