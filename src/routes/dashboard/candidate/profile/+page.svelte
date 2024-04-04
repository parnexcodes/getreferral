<script>
  import SidebarCandidate from "../../../../components/SidebarCandidate.svelte";
  import { toast } from "svelte-sonner";
  import { Input } from "$lib/components/ui/input";
  import { goto } from "$app/navigation";
  let totalExp = "";
  let currentCompany = "";
  let city = "";
  let skills = [];
  let skill = "";
  let companies = [];
  let company = "";

  function addSkill() {
    if (skill.trim() !== "") {
      skills = [...skills, skill.trim()];
      skill = ""; // Clear the input field after adding a skill
    }
    console.log(skills);
  }

  function removeSkill(index) {
    skills.splice(index, 1);
    skills = [...skills]; // Update skills to trigger reactivity
    console.log(skills);
  }

  function addCompany() {
    if (company.trim() !== "") {
      companies = [...companies, company.trim()];
      company = ""; // Clear the input field after adding a company
    }
  }

  function removeCompany(index) {
    companies.splice(index, 1);
    companies = [...companies]; // Update companies to trigger reactivity
  }

  async function handleSubmit() {
    const data = {
      totalExp,
      currentCompany,
      city,
      skills,
      companies,
    };

    try {
      const response = await fetch("/api/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("success"); // Redirect to success page after successful submission
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  }
</script>

<div class="flex">
  <SidebarCandidate />
  <div class="flex h-screen w-screen justify-center pt-28">
    <div class="space-y-4 px-8 py-8 flex flex-col">
      <h1
        class="text-center text-4xl font-sans font-thin tracking-wide text-white"
      >
        Edit Profile
      </h1>
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="number"
        placeholder="Total Experience"
        required
        bind:value={totalExp}
      />

      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Current Company"
        required
        bind:value={currentCompany}
      />

      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="City"
        required
        bind:value={city}
      />

      <h2>Add Skills</h2>
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Skill"
        required
        bind:value={skill}
      />
      <!-- Add Skill button is conditionally rendered based on the presence of skills -->
      <button
        class="text-white bg-[#0428C5] pl-4 pr-4 pt-2 pb-2 mt-4 rounded-full"
        on:click={addSkill}>Add Skill</button
      >

      <!-- List of skills -->
      {#if skills.length > 0}
        {#each skills as skill, index (skill)}
          <div class="mt-4" key={index}>
            <span>{skill}</span>
            <button
              class="text-white bg-[#0428C5] pl-4 pr-4 pt-2 pb-2 ml-2 rounded-full"
              on:click={() => removeSkill(index)}>Remove</button
            >
          </div>
        {/each}
      {/if}

      <h2>Add Companies</h2>
      <Input
        class="border border-black rounded-md p-4 bg-white text-black"
        size="50"
        type="text"
        placeholder="Company"
        required
        bind:value={company}
      />
      <!-- Add Company button -->
      <button
        class="text-white bg-[#0428C5] pl-4 pr-4 pt-2 pb-2 mt-4 rounded-full"
        on:click={addCompany}>Add Company</button
      >

      <!-- List of companies -->
      {#if companies.length > 0}
        <h3 class="mt-4">List of Companies:</h3>
        {#each companies as company, index (company)}
          <div class="mt-2" key={index}>
            <span>{company}</span>
            <button
              class="text-white bg-[#0428C5] pl-4 pr-4 pt-2 pb-2 ml-2 rounded-full"
              on:click={() => removeCompany(index)}>Remove</button
            >
          </div>
        {/each}
      {/if}

      <button
        on:click={handleSubmit}
        class="text-white bg-[#0428C5] pl-8 pr-8 pt-4 pb-4 rounded-full"
        >Submit</button
      >
    </div>
  </div>
</div>
