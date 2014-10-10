#!/bin/sh

jsRoot=./public/javascripts
jsSrc=$jsRoot/src

spm install -I $jsRoot

for subDirs in `ls -a $jsSrc`
do
    if [ x"$subDirs" != x"." -a x"$subDirs" != x".." ]; then
        if [ -d "$jsSrc/$subDirs" ]; then
            cd $jsSrc/$subDirs
            spm build -O ../../spm_modules
        fi
    fi
done