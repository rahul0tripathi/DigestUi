if  ! [ -x "$(command -v k6)" ]; then
echo "DigestUI:: k6 not Found . Please Install From https://k6.io/docs/getting-started/installation"
exit 1
fi
OUTPUT="$(command -v k6)"
  echo "DigestUI:: k6 Found At ${OUTPUT}" >&2
  echo "DigestUI:: Finding $1 File "
  if ! [[ -e "../$1.js" ]]; then
  echo "DigestUI:: File Not Found"
  exit 1
  fi
  echo "DigestUI:: File  Found"
echo "DigestUI:: $(k6 run  --out json=../$1.json ../$1.js)"