<script>
  export let data;
  import SidebarCandidate from "../../../../../components/SidebarCandidate.svelte";
  import { goto } from '$app/navigation';
  import { toast } from "svelte-sonner";
  import { Separator } from "$lib/components/ui/separator";
  async function apiReq() {
    const userid = localStorage.getItem("userid");
    const accessToken = localStorage.getItem("accessToken");
    const req = await fetch(`http://localhost:3000/api/job/apply/${data.id}`, {
      method: "POST",
      body: JSON.stringify({
        candidateId: userid
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const resp = await req.json();

    if (!req.ok) {
      toast.error(resp.error);
      setTimeout(() => {
        goto("/dashboard/candidate/applications");
      }, 1500);
    } else {
      toast.success("Applied successfully!");
      setTimeout(() => {
        goto("/dashboard/candidate/applications");
      }, 1500);
    }
  }
</script>

<div class="flex">
  <SidebarCandidate />
  <div class="py-8 px-8 flex justify-center h-full w-full">
    <div class="flex flex-col">
      <div class="text-center">
        <p class="text-4xl font-bold">{data.title}</p>
        <p>{data.companyName}</p>
        <div class="mt-4">
          <div class="flex gap-4 h-7">
            <p>{data.location}</p>
            <Separator orientation="vertical" />
            <p>{data.compensation}</p>
          </div>
        </div>
        <div class="mt-8">
          <p class="font-bold text-2xl">Job Description</p>
          <p>{data.additionalInfo}</p>
        </div>
        <div class="mt-8">
          <button
            on:click={apiReq}
            class="text-white bg-[#0428C5] pl-8 pr-8 pt-4 pb-4 rounded-lg"
            >Apply</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
