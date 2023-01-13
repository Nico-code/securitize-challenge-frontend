<template>
  <div class="container">

    <div class="title">
        EXCHANGE RATES
    </div>

    <div class="d-flex flex-wrap">

      <div class="col-12 isOld-alert" v-if="wallet.isOld">
        <div class="alert alert-danger" role="alert">
          IS OLD
        </div>
      </div>

      <div class="col-12 d-flex flex-wrap">

        <!-- rate -->
        <div class="col-12 col-md-6 p-2">

          <div class="box-container">

            <div v-if="editting">
              <div class="d-flex justify-content-end mb-2">
                <ConfirmIcon class="confirmIcon" @click="setNewRate"/>
                <CancelIcon class="cancelIcon" @click="editting = false"/>
              </div>
              <div class="input-group mb-5">
                <input type="number" class="form-control" v-model="newRate">
              </div>
            </div>
            <div v-else>
              <div class="d-flex justify-content-end">
                <EditIcon class="editIcon" @click="editting = true"/>
              </div>
              <div class="balance">
                {{currentRate}}
              </div>
            </div>

          </div>

        </div>

        <!-- currency selector & balance  -->
        <div class="col-12 col-md-6 p-2">

          <div class="box-container">

            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="currency" @change="handleCurrencyChange">
              <option value="USD" selected>USD</option>
              <option value="EUR">EUR</option>
            </select>

            <div>
              {{balance}} $
            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { mapState } from 'pinia'
import { useWallet } from '../stores/wallet'
import EditIcon from '../components/icons/IconEdit.vue';
import CancelIcon from '../components/icons/CancelIcon.vue';
import ConfirmIcon from '../components/icons/ConfirmIcon.vue';
import API from '../services/API'

export default {
  data: () => ({
    editting: false,
    currentRate: 0,
    newRate: 0,
    currency: 'USD',
    rates: {
      eth_usd: 0,
      eth_eur: 0
    }
  }),
  components: {
    EditIcon,
    CancelIcon,
    ConfirmIcon
  },
  computed: {
    ...mapState( useWallet, ['wallet']),
    balance(){
      return (this.currentRate * this.wallet.ethBalance).toFixed(2)
    }
  },
  methods: {
    async getExchangeRatesForETH(){
      const res = await API.getExchangeRates()
      this.rates = res.data;
      this.currentRate = res.data.eth_usd;
      this.newRate = res.data.eth_usd;
    },
    setNewRate() {
      this.currentRate = this.newRate;
      this.editting = false;
    },
    handleCurrencyChange(){
      if( this.currency === 'EUR' ) {
        this.currentRate = this.rates.eth_eur;
        this.newRate = this.rates.eth_eur;
      } else if (this.currency === 'USD' ) {
        this.currentRate = this.rates.eth_usd;
        this.newRate = this.rates.eth_usd;
      }
    }
  },
  created(){
    this.getExchangeRatesForETH()
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
.editIcon, .confirmIcon, .cancelIcon{
  height: 20px;
}
.box-container{
  height: 120px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 15px;
}
.balance{
  text-align: center;
  font-size: 35px;
  font-weight: 600;
}
</style>