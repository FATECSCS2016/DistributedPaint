# chatOpenShift
This is a real-time chat app that runs on OpenShift. 
This demo uses node.sj, socke-io, and express. Feel free to add new features 

To have this app running on your Openshift Online account you just need to follow the steps bellow:

1)Replace the url(public/js/main.js) shown bellow with your cartridge url.
var socket = io.connect('http://chatbeta-vapp1.rhcloud.com/'); //change here with your OpenShift project url

2)Upload the project files to your Openshift node.js cartridge.

