module.exports = {
  mode: 'universal',
  
  head: {
    title: 'Discord Webhook Sender',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A very simple Discord webhook sender.' }
    ]
  },

  loading: { color: '#3399FF', height: '4px' },

  modules: [
    '@nuxtjs/axios',
    'nuxt-buefy'
  ],

  axios: {
    
  },

  build: {
    extend(config, ctx) {
      
    }
  }
}
