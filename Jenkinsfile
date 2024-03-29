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
        TRELLO_USERNAME = "${TRELLO_USERNAME_GLOBAL}"
        TRELLO_PASSWORD = credentials('trello_ui_password')
        BUILD_TRIGGER_BY = "${currentBuild.getBuildCauses()[0].userId}"
    }

    options {
        skipDefaultCheckout(true)
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
                // sh 'printenv'
                sh 'node --version'
                sh 'npm -v'
                sh 'pwd'
                sh 'npm ci'
                sh 'npx playwright install --with-deps'    
            }
        }
        stage('Running tests') {
            steps {
                script {
                    currentBuild.description = "${BUILD_TRIGGER_BY}"
                    if (params.PROJECT == 'All tests') {
                        sh "npx playwright test --workers=${params.WORKERS}"
                    }

                    if (params.PROJECT != 'All tests') {
                        sh "npx playwright test '--project=${params.PROJECT}' --workers=${params.WORKERS}"
                    }
                }
            }
        }
    }
    post {
        // Clean after build
        always {
            // publish the build results
            junit(skipMarkingBuildUnstable: true, testResults: 'test-results/results.xml')
            archiveArtifacts 'test-results/**'
            
            // cd to target Workspace dir
            dir("${JENKINS_HOME}/workspace/${JOB_NAME}") {
                cleanWs(cleanWhenNotBuilt: true,
                        deleteDirs: true,
                        disableDeferredWipeout: true,
                        notFailBuild: true)
                        // patterns: [[pattern: 'test-results/**', type: 'EXCLUDE']])
            }

            // send an email to requestor
            emailext body: "${currentBuild.projectName} - Build # ${currentBuild.id} - ${currentBuild.result}: Check console output at ${currentBuild.absoluteUrl} to view the results.",
            recipientProviders: [requestor()],
            subject: "${currentBuild.projectName} - Build # ${currentBuild.id} - ${currentBuild.result}!"
        }
    }
}
