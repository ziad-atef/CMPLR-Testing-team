pipeline {
    agent {
        label "beta"
    
    }
    environment{
        LOGIN_SERVER = "beta"
    }
    stages {
        stage("fetch"){
            steps{
                echo "========Executing Fetch========"
                sh"""
                   pwd
                """
                git branch: "main", url: "https://CMPLR-Technologies@dev.azure.com/CMPLR-Technologies/CMPLR-Technologies.Testing/_git/CMPLR-Technologies.Testing"
            }
            post{
                success{
                    echo "=======fetch executed successfully========"
                    sh"""
                    cp ~/env/testing.env/cypress.env.json ./Web/cypress.env.json
                    cp ~/env/testing.env/PersonalData.json ./Web/cypress/fixtures/PersonalData.json
                    """
                }
                failure{
                    echo "========fetch execution failed========"
                    //slackSend (color:"#FF0000", message: "Failed to pull code-base from github")
                    
                }
            }
        }

        stage('docker build') {
            steps {
                echo "========docker build ========"
                sh """
                    docker build -t $LOGIN_SERVER/testing:latest .
                """    
            }
            post {
                success {
                    echo "========docker build success ========"
                    //slackSend (color:"#00FF00",  message: "Master: Building Image success")
                }
                failure {
                    echo "========docker build failed========"
                    //slackSend (color:"#FF0000", message: "Master: Building Image failure")
                }
           }
        }
    }
}
