python3 hello.py &
sleep 1
kill $! 2>/dev/null && echo "ERROR"
