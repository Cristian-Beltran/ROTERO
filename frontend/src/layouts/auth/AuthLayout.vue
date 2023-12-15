<template>
  <div
    class="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">Logo</div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <router-view />
      </div>
    </div>
  </div>
</template>
