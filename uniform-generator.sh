#!/bin/bash

i=0
until [ $i -ge $1 ]; do
  echo uniform vec2 features$i\;
  let i+=1
done

i=0
until [ $i -ge $1 ]; do
  echo feat[$i] = features$i\;
  let i+=1
done