pipeline {
    agent any
    tools{
        maven 'maven 3.5.0'
    }
    stages{
         stage('Build Maven'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: '3a44b134-0b56-453b-a560-3767a6da6a58', url: 'https://github.com/ciimst/event-map-docker-simple']])                
                sh 'mvn clean install'
            }
        }
        stage('Build docker image'){
            steps{
                script{
                    sh 'docker build -t ceylan/devops-integration .'
                }
            }
        }
        // stage('Scan') {
        //   steps {
        //         withSonarQubeEnv(installationName: 'SonarQube') {
        //             sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:main'
        //         }
        //     }
        //   }
        
    }
}
