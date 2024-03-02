<script>
  import SidebarEmployer from "../../../../../components/SidebarEmployer.svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  export let data;

  const dummyData = [
    {
      email: "test123@gmail.com",
      total_exp: "2 Years",
      skills: ["React", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "3 Years",
      skills: ["Go", "NextJS", "Python"],
      prev_companies: ["Google", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "4 Years",
      skills: ["React", "Java", "Express"],
      prev_companies: ["Goldman Sachs", "Google", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "25 Years",
      skills: ["Python", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Amazon"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "15 Years",
      skills: ["React", "NextJS", "SpringBoot"],
      prev_companies: ["Amazon", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "10 Years",
      skills: ["Django", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Microsoft", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "2 Years",
      skills: ["React", "Flask", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "2 Years",
      skills: ["React", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "2 Years",
      skills: ["React", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
    {
      email: "test123@gmail.com",
      total_exp: "2 Years",
      skills: ["React", "NextJS", "Express"],
      prev_companies: ["Goldman Sachs", "Morgan Stanley", "Delloite"],
      current_company: "Facebook",
      city: "Jaipur",
    },
  ];
</script>

<div class="flex">
  <SidebarEmployer />
  <div class="py-8 px-8 flex justify-center h-full w-full">
    <div class="flex flex-col">
      <div class="text-center">
        <h1 class="text-2xl">{data.title}</h1>
        <h1>{data.companyName}</h1>
        <h1>{data.jobDescriptionLink}</h1>
      </div>
      <div class="mt-8 w-full">
        <Table.Root>
          <Table.Caption>A list of all candidates.</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Email</Table.Head>
              <Table.Head>Total exp</Table.Head>
              <Table.Head>Skills</Table.Head>
              <Table.Head>Previous Companies</Table.Head>
              <Table.Head>Current Company</Table.Head>
              <Table.Head>City</Table.Head>
            </Table.Row>
          </Table.Header>
          {#each dummyData as data}
            <Table.Body>
              <Table.Row>
                <Table.Cell class="font-medium">{data.email}</Table.Cell>
                <Table.Cell>{data.total_exp}</Table.Cell>
                <Table.Cell
                  ><div class="space-x-2 flex flex-wrap">
                    {#each data.skills as skill}
                      <Badge>{skill}</Badge>
                    {/each}
                  </div></Table.Cell
                >
                <Table.Cell
                  ><div class="space-x-2 flex flex-wrap">
                    {#each data.prev_companies as company}
                      <Badge>{company}</Badge>
                    {/each}
                  </div></Table.Cell
                >
                <Table.Cell><Badge>{data.current_company}</Badge></Table.Cell>
                <Table.Cell><Badge>{data.city}</Badge></Table.Cell>
              </Table.Row>
            </Table.Body>
          {/each}
        </Table.Root>
      </div>
    </div>
  </div>
</div>
