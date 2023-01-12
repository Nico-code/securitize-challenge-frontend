import { defineStore } from 'pinia'

export const useWallet = defineStore('wallet',{
  state: () => ({
    wallet: {
      address: '',
      ethBalance: 0,
      isOld: false
    },
  }),
  actions: {
    setSelectedWallet(wallet) {
      this.wallet = wallet;
    }
  }

})
