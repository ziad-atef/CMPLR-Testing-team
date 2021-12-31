pipeline {
    agent {
        label "beta"
    
    }
    environment{
        LOGIN_SERVER = "beta"
        WEBHOOK_URL = credentials('Beta_Discord')
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
                    discordSend description: "Jenkins Pipeline Build", thumbnail: "https://jenkins.io/images/logos/ninja/256.png" ,footer: "Fetch execution failed", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: WEBHOOK_URL
                    
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
                discordSend description: "Jenkins Pipeline Build", thumbnail: "https://jenkins.io/images/logos/ninja/256.png",footer: "Docker built successfully", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: WEBHOOK_URL
                }
                failure {
                    echo "========docker build failed========"
                    discordSend description: "Jenkins Pipeline Build", thumbnail: "https://jenkins.io/images/logos/ninja/256.png" footer: "Docker building Failed", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: WEBHOOK_URL
                }
           }
        }
    }
}
