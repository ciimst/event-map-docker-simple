pipeline{
agent any
	stages{

	stage('Build Maven'){
            steps{
checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: '13daaff0-994d-486d-8d1b-0f050daeeb26', url: 'https://github.com/ciimst/event-map-simple.git']])		   //sh 'mvn -U clean install'
		   // sh 'mvn compile'
		    sh 'mvn package -DskipTests'
                
            }
        }

   //    stage('Sonarqube Analysis') {
//            steps {
//                withSonarQubeEnv('SonarQube') {
//                    sh 'mvn clean package sonar:sonar' 
//                }
//            }
//        }
//        stage("Quality Gate"){
//            steps {
//                script{
//                  sleep 10
//                  timeout(time: 1, unit: 'HOURS') {
//                      def qg = waitForQualityGate()
//                      if (qg.status != 'OK') {
//                          error "Pipeline aborted due to quality gate failure: ${qg.status}"
//
//                      }
//                    }
//		}
//            }
//	    post{
//	      failure{
//		  mail bcc: '', body: '''event-map-admin - SonarQube Quality Gate Test Failure!!!!
//		  Thanks,
//		  Ceylan''', cc: '', from: '', replyTo: '', subject: 'SONARQUBE QUALITY GATE IS FAILED!!', to: 'aysayparcasi@gmail.com'
//		  echo 'SonarQube Quality Gate Test Failure!'  
//	      }  
//	  }  
//        }  
		
	//stage('Unit Test'){
        //    steps {
       //         sh 'chmod +x ./mvnw'
       //         sh './mvnw test'
       //     }
		//	
         //   post {
      //          always {
	//	  junit '**/target/surefire-reports/TEST-*.xml'
       //             
       //         }	
	//	failure {
	//	  mail bcc: '', body: '''JUnit Test Failure!!!!
	//	  Thanks,
	//	  Ayse''', cc: '', from: '', replyTo: '', subject: 'JUNIT TEST', to: 'aysayparcasi@gmail.com'
	//	  echo 'Junit Failure!'        
	//	}
	//}
  //      }
		
    stage('Build docker image for load kube image'){
      steps{
        script{
		sh 'docker build -t event_map_admin -f DockerfileBased .'
		sh 'docker build -t event_map_admin -f DockerfileAdmin .'
		sh 'docker images'
        }
      }

	post {
	failure {
		mail bcc: '', body: '''Docker permission denied hatası olabilir. sudo chmod 666 /var/run/docker.sock komut satırı ile izinleri açmanız gerekmektedir.!!!!
                Thanks, Ayse''', cc: '', from: '', replyTo: '', subject: 'Docker failed', to: 'aysayparcasi@gmail.com'
                echo 'e-mail OK!'

	}
    }
    }

  }
  }
