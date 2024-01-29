#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {nodejs "recent node"}

    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'main', name: 'BRANCH', type: 'PT_BRANCH'
        choice(name: 'PROJECT', choices: ['Trello Chromium e2e tests', 'Trello API tests', 'All tests'], description: 'Project to be run')
        choice(name: 'WORKERS', choices: ['1', '2', '3'], description: 'Select amount or workers')
    }
    environment {
        TRELLO_API_KEY = credentials('trello_api_key')
        TRELLO_API_TOKEN = credentials('trello_api_token')
        TRELLO_UI_CREDS = credentials('trello_ui_credentials')
        TRELLO_USERNAME = '$TRELLO_UI_CREDS_USR'
        TRELLO_PASSWORD = '$TRELLO_UI_CREDS_PSW'
        BUILD_TRIGGER_BY = "${currentBuild.getBuildCauses()[0].userId}"
    }

    stages {
        stage('Clonning repo') {
            steps {
                echo "Build triggered by: ${BUILD_TRIGGER_BY}"
                // clonning git repo
                echo "Git branch '${params.BRANCH}' to clone"
                git branch: "${params.BRANCH}", url: 'https://github.com/vkozub/PetProjectJS.git'
            }
        }
        stage('Build parameters') {
            steps {
                echo "Project: ${params.PROJECT}"
                echo "Numbers of workers: ${params.WORKERS}"
                echo "Running ${env.WORKSPACE}"
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'printenv'
                sh 'node --version'
                sh 'npm -v'
                dir("${JENKINS_HOME}/workspace/${JOB_NAME}/PetProjectJS") {
                    sh 'pwd'
                    // sh 'npm ci'
                    // sh 'npx playwright install --with-deps'
                }    
            }
        }
        stage('Running tests') {
            steps {
                echo "npx playwright test --project='${params.PROJECT}' --workers=${params.WORKERS}"
            // sh "npx playwright test --project='${params.PROJECT}' --workers=${params.WORKERS}"
            // sh 'npx playwright test'
            }
        }
    }
    post {
        // Clean after build
        always {
            // cd to target Workspace dir
            dir("${JENKINS_HOME}/workspace/") {
                cleanWs(cleanWhenNotBuilt: true,
                        deleteDirs: true,
                        disableDeferredWipeout: true,
                        notFailBuild: true)
            }

            // send an email to requestor
            emailext body: "${currentBuild.projectName} - Build # ${currentBuild.id} - ${currentBuild.result}: Check console output at ${currentBuild.absoluteUrl} to view the results.",
            recipientProviders: [requestor()],
            subject: "${currentBuild.projectName} - Build # ${currentBuild.id} - ${currentBuild.result}!"
        }
    }
}
