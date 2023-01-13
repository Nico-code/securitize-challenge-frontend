import axios from 'axios';

class API{

  axiosInstance;
  constructor() {
    // console.log(process.env.VUE_APP_API_URL)
    this.axiosInstance = axios.create({ baseURL: 'http://localhost:4000'});
  }

  getWallets() {
    return this.axiosInstance.get('http://localhost:3000/wallet')
  }
  addWallet(address) {
    return this.axiosInstance.post(`http://localhost:3000/wallet/${address}`)
  }
  switchFavState(address, isFav) {
    return this.axiosInstance.put(`http://localhost:3000/wallet/favorite/${address}`, {isFav})
  }
  getExchangeRates() {
    return this.axiosInstance.get('http://localhost:3000/exchange-rates/eth')
  }

  
}

export default new API()