import { browser } from "$app/environment";
export const prerender = false
export const ssr = false

export const load = async ({ fetch, params }) => {
  if (browser) {
    const userid = localStorage.getItem("userid");
    const accessToken = localStorage.getItem("accessToken");
    const req = await fetch(
      `http://localhost:3000/api/job/employer/${params.jobid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (req.ok) {
      const resp = await req.json();
      return resp;
    }
    else {
      return {
        result: req.status
      }
    }
  }
};
