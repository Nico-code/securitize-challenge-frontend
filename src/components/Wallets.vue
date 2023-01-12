<template>

  <div class="container" >

    <div class="title">
      WALLETS
    </div>

    <div class="input-group mb-5">
      <input type="text" class="form-control" placeholder="Wallet address" aria-label="Recipient's username" v-model="walletToAdd">
      <button class="btn btn-outline-secondary" type="button" @click="addWallet" > Add </button>
    </div>

    <div>

        <div class="d-none d-md-flex table-title">
          <div class="col-12 col-md-8"> Address </div>
          <div class="col-12 col-md-2"> ETH </div>
          <div class="col-12 col-md-2"> Is old </div>
        </div>

       <Draggable
        :list="wallets"
        
        item-key="wallet"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item d-flex flex-wrap" @click="setSelectedWallet(element)">
            <div class="col-12 col-md-8"> {{ element.address }} </div>
            <div class="col-12 col-md-2"> {{ (element.ethBalance).toFixed(2) }} </div>
            <div class="col-12 col-md-2"> {{ element.isOld }} </div>
          </div>
        </template>
      </Draggable>


    </div>

  </div>
  
</template>

<script>
import API from '../services/API'
import Draggable from "vuedraggable";
import { mapActions } from 'pinia';
import { useWallet } from '../stores/wallet'
export default {
  data: () => ({
    wallets: [],
    walletToAdd: '',
  }),
  components: {
    Draggable
  },
  methods: {
    ...mapActions(useWallet, ['setSelectedWallet']),
    async getWallets() {
      const res = await API.getWallets()
      this.wallets = res.data
    },
    async addWallet() {
      const res = await API.addWallet(this.walletToAdd);
      this.wallets.push(res.data)
    },
    // async addNewWallet( address ){
    //   const res = await addWallet( address );
    //   console.log(res.data)
    // },
    // async getWallets(){
    //   const res = await getWallets();
    //   console.log(res.data);
    //   this.wallets = res.data
    // },
  },
  created() {
    this.getWallets()
  }
}
</script>

<style scoped>

.title{
  font-size: 25px;
  text-align: center;
  padding: 10px 0px;
  font-weight: 700;
  color: #FFF;
  margin-top: 25px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.table-title{
  padding: 0.5rem 1rem;
  border: 1px solid grey;
  margin-bottom: 5px;
  border-radius: 5px;
}

</style>
