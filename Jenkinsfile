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
                    discordSend description: "Jenkins Pipeline Build", footer: "Fetch executed successfully", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/926441648605528114/L_GjAOFAUJGwUt0_N9Wu58T0OTR5OksSXvgiZnnWruTfVmuLJpTjDQvB7bDaaBypUxjE"
                }
                failure{
                    echo "========fetch execution failed========"
                    discordSend description: "Jenkins Pipeline Build", footer: "Fetch execution failed", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/926441648605528114/L_GjAOFAUJGwUt0_N9Wu58T0OTR5OksSXvgiZnnWruTfVmuLJpTjDQvB7bDaaBypUxjE"
                    
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
                    discordSend description: "Jenkins Pipeline Build", footer: "Docker building succeed", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/926441648605528114/L_GjAOFAUJGwUt0_N9Wu58T0OTR5OksSXvgiZnnWruTfVmuLJpTjDQvB7bDaaBypUxjE"
                }
                failure {
                    echo "========docker build failed========"
                    discordSend description: "Jenkins Pipeline Build", footer: "Docker building Failed", result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/926441648605528114/L_GjAOFAUJGwUt0_N9Wu58T0OTR5OksSXvgiZnnWruTfVmuLJpTjDQvB7bDaaBypUxjE"
                }
           }
        }
    }
}
