pipeline{
  agent any
	tools{
        maven "maven 3.5.0"
    }
  stages{
    stage('Build Maven'){
	    steps{
checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: '13daaff0-994d-486d-8d1b-0f050daeeb26', url: 'https://github.com/ciimst/event-map-docker-simple.git']])		    
	    sh 'mvn wrapper:wrapper'
	    sh 'mvn clean install'
	    }
	}
	  
	  stage('Unit Test'){
            steps {
                //sh 'chmod +x ./mvnw'
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

    stage('Build docker image for load kube image'){
      steps{
        script{
		sh 'docker build -t event_map_web -f DockerfileBased .'
		sh 'docker build -t event_map_cronjob -f DockerfileCronjob .'
		sh 'docker images'
        }
      }

	post {
	failure {
	    mail bcc: '', body: '''Docker permission denied hatası olabilir. "sudo chmod 666 /var/run/docker.sock" komut satırı ile izinleri açmanız gerekmektedir.!!!
	    Thanks,
	    Ayse''',  subject: 'Docker failure - event_map_cronjob', to: 'aysayparcasi@gmail.com'
	    echo 'Docker failure - event-map-web'        
	}
    }
    }
     stage('Deploy Kubernetes'){
	steps{
	     script {
		sh "cat eventmap-kube.yml"
		sh "kubectl --kubeconfig=/home/imst/.kube/config get pods"
		sh "kubectl --kubeconfig=/home/imst/.kube/config apply -f postgis-kube.yml"
		sh "kubectl --kubeconfig=/home/imst/.kube/config apply -f eventmap-kube.yml"
	      /*sh "kubectl port-forward service/currency-conversion 8100:8100 &" --------Bunu terminalden çalıştırmalısın. Background process olarak çalışsın dediğimde çalışmadı*/ 
	}
      }
	post {
	failure {
	    mail bcc: '', body: '''Kubernetes Deploy Failure - event_map_cronjob project!!!!
	    Thanks,
	    Ayse''',  subject: 'KUBERNETES DEPLOY - event_map_cronjob project', to: 'aysayparcasi@gmail.com'
	    echo 'Kubernetes Deploy Failure - event_map_cronjob project!'        
	}
    }
}
  }
  }
