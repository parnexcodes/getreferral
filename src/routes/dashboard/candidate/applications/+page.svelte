<script>
  export let data;
  import SidebarCandidate from "../../../../components/SidebarCandidate.svelte";
</script>

<div class="flex">
  <SidebarCandidate />
  <div class="py-8 px-8">
    <div class="flex flex-wrap gap-4">
      {#each data.responses as job}
        <div class="flex justify-between border-2 space-x-16 p-4">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold">{job.job.title}</h1>
            <h1>{job.job.companyName}</h1>
          </div>
          <div class="flex gap-2">
            <a
              class="text-white bg-[#0428C5] p-4 rounded-md"
              href="/dashboard/candidate/apply/{job.job.id}">View</a
            >
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
