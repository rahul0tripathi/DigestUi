import http from "k6/http";
    import { check, sleep } from "k6";
    export let options = {
      vus: 1,
      duration: "2s"
    };
    export default function() {
      let res =  http.get("http://localhost:5000/api/feature/helloE/abcd/:k");
      check(res, {
        "is status 200": r => r.status === 200
      });
     sleep(1)
    };
         