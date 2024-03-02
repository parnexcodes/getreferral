import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function load({ fetch }) {
  if (browser) {
    const userid = localStorage.getItem("userid");
    const accessToken = localStorage.getItem("accessToken");
    const req = await fetch(
      `http://localhost:3000/api/auth/employer/me?userid=${userid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const resp = await req.json();
    if (req.status == 401 || req.status == 409) {
      redirect(302, "/login/employer");
    }
    return {
      data: resp,
    };
  }
}
