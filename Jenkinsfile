properties([pipelineTriggers([githubPush()])])
pipeline {
    agent any
    stages {
      stage('Test') {
        steps {
          sh "make tests"
        }
      }
      stage('Build') { 
        withCredentials([file(credentialsId: 'rampdefi-secret', variable: 'rampdefi-secret')]) {
            sh "echo \$rampdefi-secret "
          }
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