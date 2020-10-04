import http from "k6/http";
    import { check, sleep } from "k6";
    export let options = {
      vus: 0,
      duration: "1s"
    };
    export default function() {
      let res =  http.get("http://localhost:9000/api/client/streamer/getStreamingGames");
      check(res, {
        "is status 200": r => r.status === 200
      });
     sleep(1)
    };
         