<script>
  import Header from "../components/Header.svelte";
</script>

<div class="min-h-screen bg-[#FFFFFF]">
  <Header />
  <div class="flex justify-between px-24 py-16">
    <div class="flex flex-col basis-2/4 gap-8">
      <p class="text-black font-thin text-4xl">
        <span class="font-bold text-[#0428C5]">Reviewing</span> and
        <span class="font-bold text-[#0428C5]">Listing</span> job applications made
        easy for you
      </p>
      <p class="text-xl text-gray-600">
        Manage your numerous job refferals using getReferral. <span
          class="text-[#FB980D]">Free, Convenient</span
        >
        & <span class="text-[#FB980D]">Easy to Use.</span>
      </p>
      <div class="pt-16 flex gap-4">
        <a
          href="/signup/candidate"
          class="text-white bg-[#0428C5] self-start pl-8 pr-8 pt-4 pb-4 rounded-full"
          >Get Referred</a
        >
        <a
        href="/waitlist"
        class="text-black bg-[#FFFFFF] border-2 border-[#0428C5] self-start pl-8 pr-8 pt-4 pb-4 rounded-full"
        >Give Referrals</a
      >
      </div>
    </div>
    <img src="/mainLogo.svg" alt="" />
  </div>
</div>
