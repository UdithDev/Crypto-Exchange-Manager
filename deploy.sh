#!/bin/bash

# Function to log messages with timestamps
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Function to deploy the Blue environment
deploy_blue() {
    log "Deploying Blue environment..."
    kubectl apply -f deployment-blue.yaml
    if ! kubectl rollout status deployment/crypto-x-blue; then
        log "Blue deployment failed. Exiting."
        exit 1
    fi

    log "Exposing Blue service..."
    kubectl apply -f service.yaml

    log "Port-forwarding service..."
    kubectl port-forward service/crypto-x 30001:80 &
    port_forward_pid=$!

    log "Testing Blue deployment..."
    if ! curl -s http://localhost:30001 >/dev/null; then
        log "Blue deployment failed. Exiting."
        kill $port_forward_pid
        exit 1
    fi
    log "Blue deployment successful!"
}

# Function to deploy the Green environment
deploy_green() {
    log "Deploying Green environment..."
    kubectl apply -f deployment-green.yaml
    if ! kubectl rollout status deployment/crypto-x-green; then
        log "Green deployment failed. Rolling back to Blue..."
        rollback_to_blue
        exit 1
    fi

    log "Switching traffic to Green..."
    sed -i 's/crypto-x-blue/crypto-x-green/' service.yaml
    kubectl apply -f service.yaml

    log "Testing Green deployment..."
    if curl -s http://localhost:30001 >/dev/null; then
        log "Green deployment successful! Traffic switched to Green."
    else
        log "Green deployment failed. Rolling back to Blue..."
        rollback_to_blue
        exit 1
    fi
}

# Function to rollback to Blue environment
rollback_to_blue() {
    sed -i 's/crypto-x-green/crypto-x-blue/' service.yaml
    kubectl apply -f service.yaml
    log "Rolled back to Blue environment."
}

# Function to clean up deployments and services
cleanup() {
    log "Should delete all the services in current configs (Y=yes/N=no): "
    read choice
    case $choice in
    [Yy]*)
        kubectl scale deployment crypto-x-blue --replicas=0
        kubectl delete deployment crypto-x-blue
        kubectl scale deployment crypto-x-green --replicas=0
        kubectl delete deployment crypto-x-green
        kubectl delete service crypto-x
        log "All services and deployments deleted."
        ;;
    [Nn]*)
        log "Warning: There may be existing pods."
        ;;
    *)
        log "Invalid input. Exiting."
        ;;
    esac
}

# Main script execution
deploy_blue
deploy_green

# Cleanup or exit prompt
cleanup

# Kill port-forwarding process to clean up
kill $port_forward_pid
log "Port forwarding process terminated."
