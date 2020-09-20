#!/bin/bash
java -jar target/NCTRCBackend-0.0.1-shaded.jar &      # You send it in background
NctrcPid=$!                        # You sign it's PID
echo $NctrcPid                     # You print to terminal
echo "kill $NctrcPid" > stop.sh  # Write the the command kill pid in MyStop.sh
