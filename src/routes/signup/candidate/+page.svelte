<script>
  import { toast } from "svelte-sonner";
  import { Input } from "$lib/components/ui/input";
  import { goto } from "$app/navigation";
  import Header from "../../../components/Header.svelte";
  let first_name = "";
  let last_name = "";
  let email = "";
  let password = "";
  async function apiReq() {
    const req = await fetch(
      "http://localhost:3000/api/auth/candidate/register",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const resp = await req.json();

    if (!req.ok) {
      toast(resp.error);
    } else {
      localStorage.setItem("userid", resp.id);
      localStorage.setItem("accessToken", resp.accessToken);
      toast.success("Signed up successfully!");
      setTimeout(() => {
        goto("/dashboard/candidate");
      }, 1500);
    }
  }
</script>

<div class="min-h-screen bg-[#FFFFFF]">
  <Header />
  <div class="flex justify-center mt-16">
    <div class="flex flex-col gap-8">
      <h1
        class="text-center text-4xl font-sans font-thin tracking-wide text-black"
      >
        Candidate Signup
      </h1>
      <div class="space-y-4">
        <Input
          class="border border-black rounded-md p-4 bg-white text-black"
          size="50"
          type="text"
          placeholder="Enter First Name"
          name=""
          id=""
          required
          bind:value={first_name}
        />
        <Input
          class="border border-black rounded-md p-4 bg-white text-black"
          size="50"
          type="text"
          placeholder="Enter Last Name"
          name=""
          id=""
          required
          bind:value={last_name}
        />
        <Input
          class="border border-black rounded-md p-4 bg-white text-black"
          size="50"
          type="email"
          placeholder="Enter your email"
          name=""
          id=""
          required
          bind:value={email}
        />
        <Input
          class="border border-black rounded-md p-4 bg-white text-black"
          size="50"
          type="password"
          placeholder="Enter password"
          name=""
          id=""
          required
          bind:value={password}
        />
      </div>
      <button
        class="text-white bg-[#0428C5] pl-8 pr-8 pt-4 pb-4 rounded-full"
        on:click={apiReq}>Submit</button
      >
      <div class="text-black self-center">
        Already have an account? <a
          class="text-[#0428C5]"
          data-sveltekit-reload
          href="/login/candidate">Login!</a
        >
      </div>
    </div>
  </div>
</div>
