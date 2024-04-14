pipeline {
    agent any
    stages{
        stage('Clone App'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-credentials', url: 'git@github.com:Benuka-Punchihewa/herbal-app-api-gateway-service.git']]])
            }
        }

        stage('Build docker images'){
            steps{
                script{
                    dockerImage = docker.build("benukapunchihewa/api-gateway-service:latest")
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                script{
                   withDockerRegistry([ credentialsId: "dockerHub", url: "" ]) {
                    dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to k8s') {
            steps {
                script {
                    withKubeConfig([credentialsId: 'google-cloud-service-account', serverUrl: 'https://34.28.106.92']) {
                        dir('kubernetes_config') {
                            sh 'kubectl apply -f api-gateway-config.yaml'
                            sh 'kubectl apply -f api-gateway.yaml'
                        }
                    }
                }
            }
        }
    }
}