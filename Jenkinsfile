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
              sh "make up"
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