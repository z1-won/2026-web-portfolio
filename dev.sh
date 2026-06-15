#!/usr/bin/env bash
# dev.sh — Next.js dev server with auto-restart on memory threshold

PORT=3000
MEM_LIMIT_MB=1500   # restart when RSS exceeds this
CHECK_INTERVAL=30   # seconds between checks
LOG=/tmp/dev-frequency.log

start_server() {
  npm run dev -- --port "$PORT" >> "$LOG" 2>&1 &
  SERVER_PID=$!
  echo "[$(date '+%H:%M:%S')] Started (PID $SERVER_PID)"
}

stop_server() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi
  # also kill anything still on the port
  lsof -ti :"$PORT" | xargs kill -9 2>/dev/null
  sleep 2
}

cleanup() {
  echo ""
  echo "[$(date '+%H:%M:%S')] Stopping..."
  stop_server
  exit 0
}
trap cleanup INT TERM

echo "dev-frequency @ localhost:$PORT  (mem limit: ${MEM_LIMIT_MB}MB, check every ${CHECK_INTERVAL}s)"
echo "Logs: $LOG"
echo ""

> "$LOG"
start_server

while true; do
  sleep "$CHECK_INTERVAL"

  # check if process is still alive
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "[$(date '+%H:%M:%S')] Process died — restarting"
    start_server
    continue
  fi

  # check RSS memory in MB
  RSS_KB=$(ps -o rss= -p "$SERVER_PID" 2>/dev/null | tr -d ' ')
  if [[ -z "$RSS_KB" ]]; then
    continue
  fi
  RSS_MB=$(( RSS_KB / 1024 ))

  if (( RSS_MB > MEM_LIMIT_MB )); then
    echo "[$(date '+%H:%M:%S')] Memory ${RSS_MB}MB > ${MEM_LIMIT_MB}MB — restarting"
    stop_server
    start_server
  fi
done
