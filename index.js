require('dotenv').config()
const { spawn } = require('node:child_process')
const mqtt = require('mqtt')
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
  reconnectPeriod: 1000
})

client.on('connect', () => {
  console.log('Connected to mqtt broker')
})

client.on('reconnect', function () {
  console.log('Reconnection starting')
})

client.on('offline', function () {
  console.log('Currently offline. Please check internet!')
})

client.on('error', function (error) {
  console.log('Error occurred: ' + error)
})

const kube = textToExecute => new Promise(resolve => {
  const command = spawn(textToExecute, { shell: true })

  command.stdout.on('data', (data) => {
    console.log(`${data}`)
    const topic = 'k8s2mqtt/warning'
    client.publish(topic, data, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })

  command.on('close', () => resolve(main()))
})

const main = async () => {
  await kube('kubectl get event -A --field-selector type!=Normal -o=jsonpath="namespace: {.involvedObject.namespace} \nname: {.involvedObject.name}  \nreason: {.reason}\n" -w --watch-only=true')
}

main()
