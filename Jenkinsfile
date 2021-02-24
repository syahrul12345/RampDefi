properties([pipelineTriggers([githubPush()])])
pipeline {
    agent any
    stages {
      stage('Test') {
        steps {
          withCredentials([file(credentialsId: 'rampdefi-secret', variable: 'secrets.js')]) {
            sh "echo $secrets.js"
            sh "make tests"
          }
        }
      }
      stage('Build') { 
        steps {
         sh "make build"
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