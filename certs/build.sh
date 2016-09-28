#!/usr/bin/env bash

export ANDROID_HOME=/opt/android-sdk/

if [ "$1" = "release" ]
then
    echo "BUILDING RELEASE"
    gulp && ionic build android --release
    cd certs
    rm LesArts.apk
    echo 'iY88bR62' | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore ../platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name
    /opt/android-sdk/build-tools/23.0.1/zipalign -v 4 ../platforms/android/build/outputs/apk/android-release-unsigned.apk CaboDePlata.apk
    cd ..
else
    echo "BUILDING DEVELOP"
    gulp && ionic build android
fi