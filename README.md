# Setup Guide

## Initial Steps

1. Clone this repo
2. Make sure you have *Docker* and *Kubernetes* installed on your machine
[Docker setup](https://docs.docker.com/docker-for-windows/install/)

	* Kubernetes comes integrated with Docker on Windows

		[Enable Kubernetes](https://docs.docker.com/docker-for-windows/kubernetes/)

	[Kubernetes setup](https://kubernetes.io/)

3. Enable *Ingress-nginx* module on your cluster
	
	[ingress-nginx module](https://kubernetes.github.io/ingress-nginx/deploy/)

4. Install *Skaffold*

	[Skaffold Setup](https://skaffold.dev/docs/install/)

5. In your OS *`hosts`* file 

	* Windows *`C:\Windows\System32\Drivers\etc\hosts`*
	* Mac, Linux *`/etc/hosts`*

	add the following line:

	```text
	127.0.0.1 ticketing.dev
	```

	and save with admin rights.

6. Create a secret in your cluster using the following command:

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

7. Navigate to root of the project and run `skaffold dev`

8. When you navigate to *`ticketing.dev`* you will see an error from Chrome that complains about *kubernetes self-signed certificate*, just click anywhere on the page and type `thisisunsafe`.
