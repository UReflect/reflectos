FROM armhf/node:latest

COPY ./qemu-arm-static /usr/bin/qemu-arm-static

RUN apt-get update && apt-get -y install libgtk-3-0 libgconf-2-4 libasound2 libxtst6 libxss1 libnss3 xvfb x11-apps libatk-adaptor libgail-common libcanberra-gtk-module

COPY . /reflectos

WORKDIR /reflectos

ENTRYPOINT ["./reflectos"]