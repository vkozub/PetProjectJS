#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {nodejs "recent node"}

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'GitHub test branch')
        choice(name: 'PROJECT', choices: ['Trello Chromium e2e tests', 'Trello API tests', 'All tests'], description: 'Project to be run')
        choice(name: 'WORKERS', choices: ['1', '2', '3'], description: 'Select amount or workers')
    }
    environment {
        TRELLO_API_KEY = credentials('trello_api_key')
        TRELLO_API_TOKEN = credentials('trello_api_token')
        TRELLO_UI_CREDS = credentials('trello_ui_credentials')
        TRELLO_USERNAME = '$TRELLO_UI_CREDS_USR'
        TRELLO_PASSWORD = '$TRELLO_UI_CREDS_PSW'
    }

    stages {
        stage('Hello') {
            steps {
                echo "Hello ${params.PERSON}"
                echo "Toggle: ${params.TOGGLE}"
                echo "Choice: ${params.CHOICE}"
                echo "Running ${env.BUILD_ID}"
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'printenv'
                sh 'node --version'
                sh 'npm -v'    
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Running tests') {
            steps {
            // sh "npx playwright test --project='${params.PROJECT}' --workers=${params.WORKERS}"
            // sh 'npx playwright test'
            }
        }
        stage('Post actions') {
            steps {
            
            }
        }
    }
}
