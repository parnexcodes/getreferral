<script>
  import SidebarEmployer from "../../../../components/SidebarEmployer.svelte";
  import { toast } from "svelte-sonner";
  import { Input } from "$lib/components/ui/input";
  import { goto } from "$app/navigation";
  let title = "";
  let company_name = "";
  let location = "";
  let compensation = "";
  let job_description_link = "";
  let additional_info = "";
  let userid = localStorage.getItem("userid");
  let accessToken = localStorage.getItem("accessToken");
  async function apiReq() {
    const req = await fetch("http://localhost:3000/api/employer/job", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        company_name: company_name,
        location: location,
        compensation: compensation,
        job_description_link: job_description_link,
        additional_info: additional_info,
        employer_id: userid,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resp = await req.json();

    if (!req.ok) {
      toast.error(resp.error);
    } else {
      toast.success("Added successfully!");
      setTimeout(() => {
        goto("/dashboard/employer/view");
      }, 1500);
    }
  }
</script>

<div class="flex">
  <SidebarEmployer />
  <div class="flex h-screen w-screen justify-center pt-28">
    <div class="space-y-4 px-8 py-8 flex flex-col">
      <h1
        class="text-center text-4xl font-sans font-thin tracking-wide text-white"
      >
        Create Job
      </h1>
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Job title"
        name=""
        id=""
        required
        bind:value={title}
      />
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Company Name"
        name=""
        id=""
        required
        bind:value={company_name}
      />
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="email"
        placeholder="Company Location"
        name=""
        id=""
        required
        bind:value={location}
      />
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Compensation"
        name=""
        id=""
        required
        bind:value={compensation}
      />
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Job Description Link"
        name=""
        id=""
        required
        bind:value={job_description_link}
      />
      <textarea
        class="border border-black rounded-md p-4 bg-white text-black"
        rows="2"
        cols="50"
        type="text"
        placeholder="Additional Info"
        name=""
        id=""
        required
        bind:value={additional_info}
      />
      <button
        on:click={apiReq}
        class="text-white bg-[#0428C5] pl-8 pr-8 pt-4 pb-4 rounded-full"
        >Submit</button
      >
    </div>
  </div>
</div>
