<script>
    import SidebarCandidate from "../../../components/SidebarCandidate.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import Icon from "@iconify/svelte";
  </script>
  
  <div class="flex">
    <SidebarCandidate />
    <div class="flex flex-col px-8 py-8">
      <div class="">
        <h1 class="text-3xl">Welcome back, Paranjay!</h1>
        <Separator class="mt-4" />
      </div>
      <div class="mt-4 flex gap-8">
        <div class="flex gap-4 items-center border-2 p-4 rounded-md">
          <Icon
            class="self-center h-16 w-16"
            icon="clarity:success-standard-line"
          />
          <div class="flex flex-col">
            <h1 class="font-bold text-xl">11</h1>
            <h1>Applications Sent!</h1>
          </div>
        </div>
        <div class="flex gap-4 items-center border-2 p-4 rounded-md">
          <Icon icon="mdi:account-success" class="self-center h-16 w-16" />
          <div class="flex flex-col">
            <h1 class="font-bold text-xl">2</h1>
            <h1>Successful Applications!</h1>
          </div>
        </div>
        <div class="flex gap-4 items-center border-2 p-4 rounded-md">
          <Icon icon="tdesign:user-error-1" class="self-center h-16 w-16" />
          <div class="flex flex-col">
            <h1 class="font-bold text-xl">9</h1>
            <h1>Failed Applications!</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  