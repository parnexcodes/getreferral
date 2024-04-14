<script>
  import SidebarEmployer from "../../../../../components/SidebarEmployer.svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  export let data;
  data = data.result;
</script>

<div class="flex">
  <SidebarEmployer />
  <div class="py-8 px-8 flex justify-center h-full w-full">
    {#if data.result == 401}
      <div>
        <h1 class="text-3xl">No Candidates Found!</h1>
      </div>
    {:else}
      <div class="flex flex-col">
        <div class="text-center">
          <!-- <h1 class="text-2xl">{data.title}</h1>
          <h1>{data.companyName}</h1>
          <h1>{data.jobDescriptionLink}</h1> -->
        </div>
        <div class="mt-8 w-full">
          <Table.Root>
            <Table.Caption>A list of all candidates.</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.Head class="w-[100px]">Email</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Total exp</Table.Head>
                <Table.Head>Skills</Table.Head>
                <Table.Head>Previous Companies</Table.Head>
                <Table.Head>Current Company</Table.Head>
                <Table.Head>City</Table.Head>
              </Table.Row>
            </Table.Header>
            {#each data as data}
              <Table.Body>
                <Table.Row>
                  <Table.Cell class="font-medium"
                    >{data.candidate.email}</Table.Cell
                  >
                  <Table.Cell
                    >{data.candidate.firstName +
                      " " +
                      data.candidate.lastName}</Table.Cell
                  >
                  <Table.Cell
                    >{data.candidate.candidateProfile.totalExp}</Table.Cell
                  >
                  <Table.Cell
                    ><div class="space-x-2 flex flex-wrap">
                      {#each data.candidate.candidateProfile.skills as skill}
                        <Badge>{skill.skill.name}</Badge>
                      {/each}
                    </div></Table.Cell
                  >
                  <Table.Cell
                    ><div class="space-x-2 flex flex-wrap">
                      {#each data.candidate.candidateProfile.previousCompanies as company}
                        <Badge>{company.company.name}</Badge>
                      {/each}
                    </div></Table.Cell
                  >
                  <Table.Cell
                    ><Badge
                      >{data.candidate.candidateProfile.currentCompany}</Badge
                    ></Table.Cell
                  >
                  <Table.Cell
                    ><Badge>{data.candidate.candidateProfile.city}</Badge
                    ></Table.Cell
                  >
                </Table.Row>
              </Table.Body>
            {/each}
          </Table.Root>
        </div>
      </div>
    {/if}
  </div>
</div>
