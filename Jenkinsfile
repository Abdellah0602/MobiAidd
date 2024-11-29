pipeline {
    agent {
        docker {
            image 'node:16'  // Choisir une image Docker qui contient Node.js et npm
            label 'docker'   // Si tu veux spécifier un label particulier pour l'agent
            args '-v /tmp:/tmp'  // Si tu veux monter des volumes
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'  // Installer les dépendances
                }
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Exécuter des tests
            }
        }
        stage('Build Application') {
            steps {
                echo 'Building application...'
                sh 'npm run build'  // Construire l'application
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Ajouter la logique de déploiement ici
            }
        }
    }
}
