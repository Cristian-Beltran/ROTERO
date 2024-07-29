<template>
  <nav class="fixed top-0 z-50 w-full border-b bg-zinc-800 border-zinc-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            @click="utilsStore.toggleSideBar()"
            type="button"
            class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-zinc-400 hover:bg-zinc-700 focus:ring-zinc-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <Logo />
          <a class="flex ml-2 md:mr-24">
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white"
              >SITRAND</span
            >
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            ><Avatar>
              <AvatarFallback>{{ authStore.initialName }}</AvatarFallback>
            </Avatar></DropdownMenuTrigger
          >
          <DropdownMenuContent>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <router-link to="/profile">Perfil</router-link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <router-link to="/auth" v-slot="{ href, navigate }">
                <a
                  :href="href"
                  @click="
                    () => {
                      navigate
                      authStore.logout()
                    }
                  "
                >
                  Cerrar sesión
                </a>
              </router-link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/commun/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/commun/ui/avatar'
import Logo from '@/commun/me/LogoBase.vue'
import { useUtilsStore } from '@/stores/utils.stores'
import { useAuthStore } from '@/stores/auth.stores'
const authStore = useAuthStore()
const utilsStore = useUtilsStore()
</script>
