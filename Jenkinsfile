
pipeline {
    agent any
	tools{
        maven "maven 3.5.0"
    }
    stages{   
	  stage('Unit Test'){
            steps {
                sh 'chmod +x ./mvnw'
                sh './mvnw test'
            }
			
            post {
                always {
		  junit '**/target/surefire-reports/TEST-*.xml'
                    
                }	
		failure {
		    mail bcc: '', body: '''JUnit Test Failure!!!!
		    Thanks,
		    Ayse''', cc: '', from: '', replyTo: '', subject: 'JUNIT TEST', to: 'aysayparcasi@gmail.com'
		    echo 'Junit Failure!'        
		}
            }

        }
	    
          stage('Build Maven'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs:
				[[credentialsId: '13daaff0-994d-486d-8d1b-0f050daeeb26', url: 'https://github.com/ciimst/CurrencyConversionPro.git']])
		   
		sh 'mvn wrapper:wrapper'
		/*sh './mvnw clean compile'*/
                sh 'mvn clean install'
		  
		 
            }
        }

	stage('Build docker image for load kube image'){
            steps{
                script{
                    sh 'docker build -t currency-conversion .'
                }
            }
        }

	 stage('Deploy Kubernetes'){
	   steps{
	     script {
	      /*sh "sed -i 's,CURRENCY-CONVERSION,currency-conversion:$BUILD_NUMBER,' deploymentservice.yaml"*/
		sh "cat deploymentservice.yaml"
		sh "kubectl --kubeconfig=/home/imst/.kube/config get pods"
		sh "kubectl --kubeconfig=/home/imst/.kube/config apply -f deploymentservice.yaml"

	      /*sh "kubectl port-forward service/currency-exchange 8100:8100 &" --------Bunu terminalden çalıştırmalısın. Background process olarak çalışsın dediğimde çalışmadı*/ 
	}
	}
		post {
		failure {
		    mail bcc: '', body: '''Kubernetes Deploy Failure!!!!
		    Thanks,
		    Ayse''', cc: '', from: '', replyTo: '', subject: 'KUBERNETES TEST', to: 'aysayparcasi@gmail.com'
		    echo 'Kubernetes Deploy Failure!'        
		}
            }
	}

          /*stage('docker-compose') {
           steps {
              sh "docker-compose up -d"
           }
       }*/
	    
    }
}
