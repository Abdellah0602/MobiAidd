pipeline {
    agent any

    stages {
        stage('Install Node.js & npm') {
            steps {
                script {
                    // Installer Node.js (version 16 par exemple)
                    sh 'curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -'
                    sh 'sudo apt-get install -y nodejs'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'  // Installe les dépendances après l'installation de Node.js
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Si tu as des tests à exécuter
            }
        }
        stage('Build Application') {
            steps {
                echo 'Building application...'
                sh 'npm run build'  // Si tu as un script de build
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Ajoute ta logique de déploiement ici
            }
        }
    }
}
