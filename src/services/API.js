import axios from 'axios';

class API{

  axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_KEY || 'http://localhost:3000'});
  }

  getWallets() {
    return this.axiosInstance.get('/wallet')
  }
  addWallet(address) {
    return this.axiosInstance.post(`/wallet/${address}`)
  }
  switchFavState(address, isFav) {
    return this.axiosInstance.put(`/wallet/favorite/${address}`, {isFav})
  }
  getExchangeRates() {
    return this.axiosInstance.get('/exchange-rates/eth')
  }

  
}

export default new API()