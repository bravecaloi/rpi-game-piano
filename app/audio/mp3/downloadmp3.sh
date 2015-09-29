#!/bin/bash
COUNTER=0
while [  $COUNTER -lt 59 ]; do

  if [ $COUNTER -ge 10 ]; then
    curl -O http://baroque.me/audio/harp_$COUNTER.mp3
  else
    curl -O http://baroque.me/audio/harp_0$COUNTER.mp3
  fi

  let COUNTER=COUNTER+1
done
