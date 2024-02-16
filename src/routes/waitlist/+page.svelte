<script>
  import { toast } from "svelte-sonner";
  import { Input } from "$lib/components/ui/input";
  import Header from "../../components/Header.svelte";
  let email = "";
  let linkedinURL = "";
  async function apiReq() {
    const req = await fetch("http://localhost:3000/api/user/waitlist", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        linkedinURL: linkedinURL,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const resp = await req.json();
    toast.info(resp.message || resp.error);
  }
</script>

<div class="min-h-screen bg-[#FFFFFF]">
  <Header />
  <div class="flex justify-center mt-16">
    <div class="flex flex-col gap-8">
      <h1 class="text-center text-4xl font-sans font-thin tracking-wide text-black">
        Waitlist
      </h1>
      <div class="space-y-4">
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
        type="text"
        placeholder="Enter your LinkedIn Profile URL"
        name=""
        id=""
        required
        bind:value={linkedinURL}
      />
    </div>
      <button
        class="text-white bg-[#0428C5] pl-8 pr-8 pt-4 pb-4 rounded-full"
        on:click={apiReq}>Submit</button
      >
      <div class="text-black self-center">
        Already got approved ? <a
          class="text-[#0428C5]"
          data-sveltekit-reload
          href="/login/employer">Login!</a
        >
      </div>
    </div>
  </div>
</div>
