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
          <div class="col-12 col-md-8 d-flex">  
              <span class="me-3"> Address </span>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="showOnlyFav" id="onlyfav">
                <label class="form-check-label" for="onlyfav">
                  Only Favorite
                </label>
              </div>

          </div>
          <div class="col-12 col-md-2"> ETH </div>
          <!-- <div class="col-12 col-md-2"> Is old </div> -->
          <div class="col-12 col-md-2"> Action </div>
        </div>

       <Draggable
        :list="walletsToShow"
        item-key="wallet"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item d-flex flex-wrap draggableRow">
            <div class="col-12 col-md-8"> {{ element.address }} </div>
            <div class="col-12 col-md-2"> {{ (element.ethBalance).toFixed(2) }} </div>
            <!-- <div class="col-12 col-md-2"> {{ element.isOld }} </div> -->
            <div class="col-12 col-md-2"> 
              <StarIcon  class="actions-icons" v-if="!element.isFav" @click="changeFavState(element.address, !element.isFav)"/>
              <FavIcon class="actions-icons" v-else @click="changeFavState(element.address, !element.isFav)" />

              <SelectIcon class="actions-icons" v-if="wallet.address !== element.address" @click="setSelectedWallet(element)" />
              <SelectedIcon class="actions-icons" v-else />
            </div>
          </div>
        </template>
      </Draggable>


    </div>

  </div>
  
</template>

<script>
import API from '../services/API'
import Draggable from "vuedraggable";
import StarIcon from '../components/icons/StarIcon.vue';
import FavIcon from '../components/icons/FavIcon.vue';
import SelectIcon from '../components/icons/SelectIcon.vue';
import SelectedIcon from '../components/icons/SelectedIcon.vue';
import { mapActions, mapState } from 'pinia';
import { useWallet } from '../stores/wallet'

export default {
  data: () => ({
    wallets: [],
    walletToAdd: '',
    showOnlyFav: false
  }),
  components: {
    Draggable,
    StarIcon,
    FavIcon,
    SelectIcon,
    SelectedIcon,
  },
  computed: {
    ...mapState( useWallet, ['wallet']),
    walletsToShow(){
      if(this.showOnlyFav) {
        return this.wallets.filter( wallet => wallet.isFav)
      } else {
        return this.wallets
      }
    }
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
    async changeFavState(address, isFav) {
      await API.switchFavState(address, isFav);
      const walletIndex = this.wallets.findIndex( wallet => wallet.address === address);
      this.wallets[walletIndex].isFav = isFav
    }
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

.actions-icons{
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.draggableRow {
  cursor: grab;
}
</style>
