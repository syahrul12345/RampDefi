properties([pipelineTriggers([githubPush()])])
pipeline {
    agent any
    withCredentials([file(credentialsId: 'rampdefi-secret', variable: 'rampdefi-secret')]) {
      sh "echo \$rampdefi-secret "
    }
    stages {
      stage('Test') {
        steps {
          sh "make tests"
        }
      }
      stage('Build') { 
        steps {
        //   when { tag "release-*" }
          withEnv(["PATH=$PATH:~/.local/bin"]){
            sh "make build"
          }
        }
      }
      stage('deploy') { 
        steps {
        //   when { tag "release-*" }
          withEnv(["PATH=$PATH:~/.local/bin"]){
            sh "make serve"
          }
        }
      }
        
    }
    post {
       always {
           deleteDir()
       }
    }
}