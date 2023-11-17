case "$1" in
  "front")
    (cd frontend; npm run dev)
    ;;

  "back")
    (cd backend; python -B run.py)
    ;;

  "dev")
    (cd frontend; npm run dev) &
    (cd backend; python -B run.py)
    ;;

  "build")
    (cd frontend; npm run build)
    ;;

  "start")
    (cd frontend; npm run preview) &
    (cd backend; python run.py)
    ;;

  *)
    echo "The argument provided is not valid"
    exit 1
    ;;
esac