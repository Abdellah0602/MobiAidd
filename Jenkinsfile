pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                dir('nestjs-mongodb-crud') {
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                dir('nestjs-mongodb-crud') {
                    sh 'npm run test'
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building the application...'
                dir('nestjs-mongodb-crud') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                dir('nestjs-mongodb-crud') {
                    // Ajoute ici tes commandes de déploiement
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
