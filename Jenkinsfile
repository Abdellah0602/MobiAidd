pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis le dépôt Git
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Installer les dépendances avec npm ou yarn
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Lancer les tests unitaires
                    sh 'npm run test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Compiler le projet
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Exemple de déploiement : copie des fichiers vers un serveur distant
                    sh '''
                    scp -r ./dist/* user@remote-server:/var/www/nestjs-app/
                    '''
                }
            }
        }
    }
    post {
        always {
            // Notifier si l'exécution réussit ou échoue
            echo "Pipeline terminé"
        }
        failure {
            // Action en cas d'échec
            echo "Pipeline échoué"
        }
    }
}
