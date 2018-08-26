FROM node:10

RUN apt-get update && apt-get -y install libgtk-3-0 libgconf-2-4 libasound2 libxtst6 libxss1 libnss3 xvfb x11-apps libatk-adaptor libgail-common libcanberra-gtk-module

COPY dist_electron/linux-unpacked/ /reflectos

WORKDIR /reflectos

RUN ls -lah

ENTRYPOINT ["."]
