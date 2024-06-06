## Overview
This repository contains a multi-container Node.js application orchestrated using Docker and Kubernetes. The application consists of two main services: container_1 for storing files and initiating calculations, and container_2 for performing calculations on CSV files.
### Features
- File Storage: Store files in a persistent volume.
- CSV Processing: Parse and calculate sums from CSV files.
- REST API: Expose endpoints for file storage and calculation.
- Containerization: Dockerized services for easy deployment.
- Orchestration: Kubernetes manifests for deployment and service management.
### Prerequisites
- Node.js
- Docker
- Kubernetes
- Terraform
- Google Cloud SDK (for GKE deployment)
- Installation
- Clone the Repository
### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/DishaAnand/kubernetes.git
   ```
2. Setup Environment
#### Docker
Build and run containers using Docker Compose
```sh
docker-compose up --build
```
#### Kubernetes
Initialize Terraform and apply configuration
```sh
   cd terraform
   terraform init
   terraform apply
```
#### Deploy to GKE
```sh
 gcloud builds submit --config=container_1/cloud-build.yaml
 gcloud builds submit --config=container_2/cloud-build.yaml
```
### Install Dependencies
For each container, install the necessary Node.js dependencies:
```sh
cd container_1
npm install
cd ../container_2
npm install
```
### Deployment
#### Docker
1. Build and run the containers
   ```sh
    docker-compose up --build
   ```
#### Kubernetes
1. Apply Kubernetes manifests
   ```sh
   kubectl apply -f container_1/k8_manifests/
   kubectl apply -f container_2/k8_manifests/
   ```
