THIS_DIR=$(cd -P "$(dirname "$(readlink "${BASH_SOURCE[0]}" || echo "${BASH_SOURCE[0]}")")" && pwd)

echo $THIS_DIR


cd "${THIS_DIR}/../"

nodemon --inspect ./dist