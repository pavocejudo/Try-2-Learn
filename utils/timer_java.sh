java myCode &
sleep 5
kill $! 2>/dev/null && echo "ERROR"
