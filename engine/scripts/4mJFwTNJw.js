import http from "k6/http";
    import { check, sleep } from "k6";
    export let options = {
      vus: 1,
      duration: "10s"
    };
    export default function() {
      let res =  http.get("http://localhost:5000/abcd");
      check(res, {
        "is status 200": r => r.status === 200
      });
     sleep(1)
    };
         