pipeline {
    agent any

    environment {
        VERSION = "${env.BUILD_NUMBER ?: 'dev'}"
        DOCKERHUB_CREDENTIALS = credentials('docker-creds')
        BACKEND_IMAGE = "${DOCKERHUB_CREDENTIALS_USR}/backend-teachua:${VERSION}"
        FRONTEND_IMAGE = "${DOCKERHUB_CREDENTIALS_USR}/frontend-teachua:${VERSION}"
    }
    stages {
        stage('Print version') {
            steps {
                echo "🚀 Starting release for version ${VERSION}"
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Backend compile for sonar') {
            steps {
                dir ('backend'){
                     bat 'mvn clean compile'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonar') {
                    bat 'sonar-scanner -Dsonar.projectKey=teach_ua -Dsonar.sources=backend,frontend -Dsonar.java.binaries=backend/target/classes ^ -Dsonar.exclusions=/node_modules/,/build/,/dist/'
                }
            }
        }
        stage('Java Unit Tests') {
            steps {
                dir ('backend'){
                     bat 'mvn test -Dcheckstyle.skip=true -Dtest=!VersionCreateTest'
                }
            }
        }
        stage('Prepare env file') {
            steps {
            withCredentials([
                string(credentialsId: 'my-password', variable: 'MY_PASSWORD'),
                string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET'),
                string(credentialsId: 'jwt-access-secret', variable: 'JWT_ACCESS_SECRET'),
                string(credentialsId: 'jwt-refresh-secret', variable: 'JWT_REFRESH_SECRET'),
                string(credentialsId: 'jwt-access-secret-key', variable: 'JWT_ACCESS_SECRET_KEY'),
                string(credentialsId: 'jwt-refresh-secret-key', variable: 'JWT_REFRESH_SECRET_KEY'),
                string(credentialsId: 'pivate-key', variable: 'PRIVATE_KEY'),
                string(credentialsId: 'google-map-key', variable: 'GOOGLE_MAP_KEY'),
                string(credentialsId: 'prod-base-uri', variable: 'PROD_BASE_URI'),
                string(credentialsId: 'dev2-datasource-url', variable: 'DEV2_DATASOURCE_URL'),
                string(credentialsId: 'dev2-datasourse-user', variable: 'DEV2_DATASOURCE_USER'),
                string(credentialsId: 'dev2-datasource-password', variable: 'DEV2_DATASOURCE_PASSWORD'),
                string(credentialsId: 'public-url', variable: 'PUBLIC_URL'),
                string(credentialsId: 'prod-public-url', variable: 'PROD_PUBLIC_URL'),
                string(credentialsId: 'uploadt-path', variable: 'UPLOAD_PATH'),
                string(credentialsId: 'static-folder', variable: 'STATIC_FOLDER'),
                string(credentialsId: 'base-uri', variable: 'BASE_URI'),
                string(credentialsId: 'base-url', variable: 'BASE_URL'),
                string(credentialsId: 'prod-base-url', variable: 'PROD_BASE_URL'),
                string(credentialsId: 'user-email', variable: 'USER_EMAIL'),
                string(credentialsId: 'user-pass', variable: 'USER_PASSWORD'),
                string(credentialsId: 'send-pass', variable: 'SEND_PASSWORD'),
                string(credentialsId: 'user-logs', variable: 'URL_LOGS'),
                string(credentialsId: 'oath2-google-client-id', variable: 'OAUTH2_GOOGLE_CLIENT_ID'),
                string(credentialsId: 'oath2-google-client-secret', variable: 'OAUTH2_GOOGLE_CLIENT_SECRET'),
                string(credentialsId: 'oath2-facebook-client-id', variable: 'OAUTH2_FACEBOOK_CLIENT_ID'),
                string(credentialsId: 'oath2-facebook-client-secret', variable: 'OAUTH2_FACEBOOK_CLIENT_SECRET'),
                string(credentialsId: 'datasource-url', variable: 'DATASOURCE_URL'),
                string(credentialsId: 'datasource-user', variable: 'DATASOURCE_USER'),
                string(credentialsId: 'datasource-pass', variable: 'DATASOURCE_PASSWORD'),
                string(credentialsId: 'service-acc-client-email', variable: 'SERVICE_ACCOUNT_CLIENT_EMAIL'),
                string(credentialsId: 'service-acc-private-key', variable: 'SERVICE_ACCOUNT_PRIVATE_KEY')
           ]) {
                bat '''
                    echo Creating setenv.sh ...
                    echo #!/bin/bash > backend\\setenv.sh
                    echo export MY_PASSWORD="%MY_PASSWORD%" >> backend\\setenv.sh
                    echo export JWT_SECRET="%JWT_SECRET%" >> backend\\setenv.sh
                    echo export JWT_ACCESS_SECRET="%JWT_ACCESS_SECRET%" >> backend\\setenv.sh
                    echo export JWT_REFRESH_SECRET="%JWT_REFRESH_SECRET%" >> backend\\setenv.sh
                    echo export JWT_ACCESS_SECRET_KEY="%JWT_ACCESS_SECRET_KEY%" >> backend\\setenv.sh
                    echo export JWT_REFRESH_SECRET_KEY="%JWT_REFRESH_SECRET_KEY%" >> backend\\setenv.sh
                    echo export PRIVATE_KEY="%PRIVATE_KEY%" >> backend\\setenv.sh
                    echo export GOOGLE_MAP_KEY="%GOOGLE_MAP_KEY%" >> backend\\setenv.sh
                    echo export PROD_BASE_URI="%PROD_BASE_URI%" >> backend\\setenv.sh
                    echo export DEV2_DATASOURCE_URL="${DEV2_DATASOURCE_URL:-%DEV2_DATASOURCE_URL%}" >> backend\\setenv.sh
                    echo export DEV2_DATASOURCE_USER="%DEV2_DATASOURCE_USER%" >> backend\\setenv.sh
                    echo export DEV2_DATASOURCE_PASSWORD="%DEV2_DATASOURCE_PASSWORD%" >> backend\\setenv.sh
                    echo export PUBLIC_URL="%PUBLIC_URL%" >> backend\\setenv.sh
                    echo export PROD_PUBLIC_URL="%PROD_PUBLIC_URL%" >> backend\\setenv.sh
                    echo export UPLOAD_PATH="%UPLOAD_PATH%" >> backend\\setenv.sh
                    echo export STATIC_FOLDER="%STATIC_FOLDER%" >> backend\\setenv.sh
                    echo export BASE_URI="%BASE_URI%" >> backend\\setenv.sh
                    echo export BASE_URL="%BASE_URL%" >> backend\\setenv.sh
                    echo export PROD_BASE_URL="%PROD_BASE_URL%" >> backend\\setenv.sh
                    echo export USER_EMAIL="%USER_EMAIL%" >> backend\\setenv.sh
                    echo export USER_PASSWORD="%USER_PASSWORD%" >> backend\\setenv.sh
                    echo export SEND_PASSWORD="%SEND_PASSWORD%" >> backend\\setenv.sh
                    echo export URL_LOGS="%URL_LOGS%" >> backend\\setenv.sh
                    echo export OAUTH2_GOOGLE_CLIENT_ID="%OAUTH2_GOOGLE_CLIENT_ID%" >> backend\\setenv.sh
                    echo export OAUTH2_GOOGLE_CLIENT_SECRET="%OAUTH2_GOOGLE_CLIENT_SECRET%" >> backend\\setenv.sh
                    echo export OAUTH2_FACEBOOK_CLIENT_ID="%OAUTH2_FACEBOOK_CLIENT_ID%" >> backend\\setenv.sh
                    echo export OAUTH2_FACEBOOK_CLIENT_SECRET="%OAUTH2_FACEBOOK_CLIENT_SECRET%" >> backend\\setenv.sh
                    echo export DATASOURCE_URL="%DATASOURCE_URL%" >> backend\\setenv.sh
                    echo export DATASOURCE_USER="%DATASOURCE_USER%" >> backend\\setenv.sh
                    echo export DATASOURCE_PASSWORD="%DATASOURCE_PASSWORD%" >> backend\\setenv.sh
                    echo export SERVICE_ACCOUNT_CLIENT_EMAIL="%SERVICE_ACCOUNT_CLIENT_EMAIL%" >> backend\\setenv.sh
                    echo export SERVICE_ACCOUNT_PRIVATE_KEY="%SERVICE_ACCOUNT_PRIVATE_KEY%" >> backend\\setenv.sh
                '''
              }
           }
        }
        stage("Build backend image"){
            steps{
                dir ('backend'){
                    bat "docker build --no-cache -t ${BACKEND_IMAGE} ."
                }
            }
        }
        stage("Build frontend image"){
            steps{
                dir ('frontend'){
                    bat "docker build --no-cache -t ${FRONTEND_IMAGE} ."
                }
            }
        }
        stage('Docker Login') {
            steps {
                bat "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
            }
        }
        stage("Tag backend image as latest") {
            steps {
                bat "docker tag ${BACKEND_IMAGE} ${DOCKERHUB_CREDENTIALS_USR}/backend-teachua:latest"
            }
        }
        stage("Push backend latest tag") {
            steps {
                bat "docker push ${DOCKERHUB_CREDENTIALS_USR}/backend-teachua:latest"
            }
        }
        
        stage("Tag frontend image as latest") {
            steps {
                bat "docker tag ${FRONTEND_IMAGE} ${DOCKERHUB_CREDENTIALS_USR}/frontend-teachua:latest"
            }
        }
        stage("Push frontend latest tag") {
            steps {
                bat "docker push ${DOCKERHUB_CREDENTIALS_USR}/frontend-teachua:latest"
            }
        }
    }
    post {
        success {
            build job: 'TeachUA-CICD', wait: false
        }
    }
}
