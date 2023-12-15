import { defineStore } from 'pinia'

export const useUtilsStore = defineStore('utils', {
  state: () => ({ sideBarShow: false }),
  actions: {
    toggleSideBar() {
      this.sideBarShow = !this.sideBarShow
    }
  }
})
