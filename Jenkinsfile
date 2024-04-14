pipeline { 
    stages{
        stage('Clone App'){
            agent { node { label 'Built-In Node' } }
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-credentials', url: 'git@github.com:Benuka-Punchihewa/herbal-app-api-gateway-service.git']]])
            }
        }

        stage('Build docker images'){
            agent { node { label 'copper' } }
            steps{
                script{
                    dockerImage = docker.build("benukapunchihewa/api-gateway-service:latest")
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                agent { node { label 'copper' } }
                script{
                   withDockerRegistry([ credentialsId: "dockerHub", url: "" ]) {
                    dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to k8s') {
            agent { node { label 'Built-In Node' } }
            steps {
                script {
                    withKubeConfig([credentialsId: 'google-cloud-service-account', serverUrl: 'https://104.196.35.11']) {
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