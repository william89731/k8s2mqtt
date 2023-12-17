require('dotenv').config();
const { spawn } = require('child_process');

//console.log(process.env)
const mqtt = require('mqtt');
const { exec } = require("child_process");
const host = process.env.HOST
const port = process.env.PORT
const clientId = `k8s2mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected to mqtt broker')
});

client.on("reconnect", function () {
  console.log("Reconnection starting");
});

client.on("offline", function () {
  console.log("Currently offline. Please check internet!");
});

client.on("error", function (error) {
  console.log("Error occurred: " + error);
});

const child = spawn('kubectl', ['get','event','-A','--field-selector','type!=Normal','-o=jsonpath="{.message}"','-w', '--watch-only=true'])
const topic = 'k8s2mqtt/warning'


child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});

child.stdout.on('data', (data) => {
  console.log(`\n${data}`);
  client.publish(topic, `\n${data}`, { qos: 0, retain: false });

});
    

