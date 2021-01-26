# NodeRED Amcrest AD110 (node-red-contrib-amcrest-ad110)

![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/bmdevx/node-red-contrib-amcrest-ad110?style=flat-square)  [![npm](https://img.shields.io/npm/dt/node-red-contrib-amcrest-ad110?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-amcrest-ad110) [![npm](https://img.shields.io/npm/v/node-red-contrib-amcrest-ad110?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-amcrest-ad110) ![GitHub](https://img.shields.io/github/license/bmdevx/node-red-contrib-amcrest-ad110?style=flat-square)

## Node that monitors Amcrest AD110 Video Doorbell

### Features

* Listens for:
  * Motion (start/stop)
  * Video Motion (start/stop)
  * Doorbell Press
  * Answer/Hangup
  * And More!
* Takes Snapshots (buffer/base64)

### Common Message Payloads from AD110 (Not Raw Codes)

#### msg.payload.code

* 'Invite' - Doorbell pressed
* 'Hangup' - Doorbell press rejected by app
* 'CallNotAnswered' - No response to doorbell by app
* 'VideoMotion' - Motioned detected by video
* 'Motion' - Motion detected via IR

#### msg.payload.action (found on VideoMotion and Motion)

* 'Start' - Motion Started
* 'Stop' - Motion Stopped

#### Note: Depending on doorbell configuration, VideoMotion can be triggered quite often, especially at night
