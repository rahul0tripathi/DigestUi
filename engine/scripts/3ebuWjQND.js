import http from "k6/http";
    import { check, sleep } from "k6";
    export let options = {
      vus:500,
      duration: "10s"
    };
    export default function() {
      let res =  http.get("http://localhost:9000/api/client/games");
      check(res, {
        "is status 200": r => r.status === 200
      });
     sleep(1)
    };
         