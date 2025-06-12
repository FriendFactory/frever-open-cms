pipeline {
    agent { label 'master' }

    stages {
        stage('Notify Build Start') {
            steps {
                script {
                    wrap([$class: 'BuildUser']) {
                        slackSend color: "good", message: "CMS build started by ${env.BUILD_USER} <${env.BUILD_USER_EMAIL}> commit ${env.GIT_COMMIT} (${env.GIT_BRANCH})"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh './publish.sh'
            }

        }

    }
    post {
        success {
            script {
                wrap([$class: 'BuildUser']) {
                    slackSend color: "good", message: "CMS build completed successfully."
                }
            }
        }
        failure {
            script {
                wrap([$class: 'BuildUser']) {
                    slackSend color: "bad", message: "Build completed with error"
                }
            }
        }
    }
}