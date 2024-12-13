#!/bin/bash

# Function to handle termination (Ctrl+C)
cleanup() {
    echo "Terminating background processes..."
    kill $PID1 $PID2 2>/dev/null
    wait $PID1 $PID2 2>/dev/null
    echo "Processes terminated."
    exit
}

# Trap Ctrl+C (SIGINT) and call cleanup
trap cleanup SIGINT

# Start OBS in the background
echo "Starting OBS..."
/Applications/OBS.app/Contents/MacOS/OBS --scene Scene 3 --websocket_port 4455 --websocket_password 12345678 --websocket_debug --websocketipv4only &

PID1=$!
echo "OBS started with PID $PID1."

# Wait 5 seconds
sleep 5

# Start wewbSocket controller in the background
echo "Starting NodeJS..."
npm run-script run &
PID2=$!
echo "NodeJS started with PID $PID2."

# Wait for both processes to complete
wait $PID1 $PID2
