# How To Install Patched Virt-Viewer

## Dependencies 
### From APT
```
sudo apt install debhelper libpixman-1-dev libssl-dev libgtk-3-dev libglib2.0-dev libgudev-1.0-dev libcairo2-dev libpulse-dev libusb-1.0-0-dev valac python-pyparsing libsasl2-dev libjpeg-dev gobject-introspection libgirepository1.0-dev gir1.2-gtk-2.0 libtext-csv-perl libusbredirhost-dev libacl1-dev libpolkit-agent-1-dev libpolkit-gobject-1-dev libdbus-glib-1-dev libopus-dev libsoup2.4-dev gtk-doc-tools liblz4-dev libcacard-dev libphodav-2.0-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgovirt-dev libgtk-vnc-2.0-dev libvirt-glib-1.0-dev intltool
```

### libspice-protocol-dev_0.12.14

``` 
wget http://ftp.us.debian.org/debian/pool/main/s/spice-protocol/libspice-protocol-dev_0.12.14-1_all.deb
sudo dpkg -i libspice-protocol-dev_0.12.14-1_all.deb
```

### spice-gtk_0.35-2
```
git clone https://salsa.debian.org/debian/spice-gtk.git
cd spice-gtk
git checkout debian/0.35-2
wget https://bugs.launchpad.net/raspbian/+bug/1753068/+attachment/5086500/+files/spice-gtk.patch
git apply spice-gtk.patch
dpkg-buildpackage -b -rfakeroot -us -uc
cd ..
sudo dpkg -i gir1.2-spiceclientglib-2.0_0.35-2_armhf.deb
sudo dpkg -i spice-client-glib*.deb spice-client-gtk*.deb libspice-client-glib*.deb libspice-client-gtk*.deb gir1.2-spiceclientgtk*.deb
```

### virt-viewer 8.0-1
```
git clone https://salsa.debian.org/libvirt-team/virt-viewer.git
cd virt-viewer
git checkout debian/8.0-1
wget https://bugs.launchpad.net/raspbian/+bug/1753068/+attachment/5086479/+files/virt-viewer-spice-armhf.patch
git apply virt-viewer-spice-armhf.patch
dpkg-buildpackage -b -rfakeroot -us -uc
cd ..
sudo dpkg -i virt-viewer*.deb
```