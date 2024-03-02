<script>
  export let data;
  import SidebarEmployer from "../../../../components/SidebarEmployer.svelte";
</script>

<div class="flex">
  <SidebarEmployer />
  <div class="py-8 px-8">
    <div class="flex flex-wrap gap-4">
      {#each data.job as job}
        <div class="flex justify-between border-2 space-x-16 p-4">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold">{job.title}</h1>
            <h1>{job.companyName}</h1>
          </div>
          <a
            class="text-white bg-[#0428C5] p-4 rounded-md"
            href="/dashboard/employer/application/{job.id}">View</a
          >
        </div>
      {/each}
    </div>
  </div>
</div>
