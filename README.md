![a1fyRka](https://user-images.githubusercontent.com/68069659/215287245-b0678092-76fd-47d7-9c2e-feea20db5b64.gif)

[![platform](https://img.shields.io/badge/platform-kubernetes-blue)](https://kubernetes.io/)
[![os](https://img.shields.io/badge/os-linux-red)](https://www.linux.org/)
[![platform](https://img.shields.io/badge/platform-nodejs-blue)](https://nodejs.org/en/)
[![docker version](https://img.shields.io/badge/docker%20version-20.10-brightgreen)](https://www.docker.com/)
[![license](https://img.shields.io/badge/license-Apache--2.0-yellowgreen)](https://apache.org/licenses/LICENSE-2.0)
[![donate](https://img.shields.io/badge/donate-wango-blue)](https://www.wango.org/donate.aspx)

# k8s2mqtt
Kubernetes client listening to warning events; and publish to broker mqtt.

 ```requirements``` :
 - [kubernetes cluster](https://kubernetes.io/)
 - [broker mqtt](https://mqtt.org/)
 

 ```deploy``` :
 
 Deploy minimal configuration. check [here](https://github.com/william89731/k8s2mqtt/blob/main/k8s2mqtt.yml) 
 
 ![image](https://user-images.githubusercontent.com/68069659/215288439-36a9fd96-1583-4e73-af46-1d77137a53b2.png)

Tested the repository with trivy operator. See [here](https://github.com/william89731/trivy-operator)

![image](https://user-images.githubusercontent.com/68069659/215288554-45d63d3c-fc95-4a28-987c-5611384c3dae.png)

Payload published:

![image](https://user-images.githubusercontent.com/68069659/215288962-71db640b-4b61-4d76-bd53-0eb8aa45960d.png)

Send notification to telegram (or another service):

![image](https://user-images.githubusercontent.com/68069659/215355774-36f221ce-3945-433e-8371-9cdb36380eaa.png)





