<template>
  <div class="container">
    <div class="body-wrapper">
      <h1 class="title is-1 has-text-white">Discord Webhook Sender</h1>
        <b-field grouped>
          <b-field label="Webhook ID" expanded>
            <b-input v-model="webhook.id" placeholder="529444570535165962"></b-input>
          </b-field>
          <b-field label="Webhook Token" expanded>
            <b-input v-model="webhook.token" placeholder="AQarZ_rbACW4bT2vK4BJGiMfzH9VjOwrQFU3gVyMO1rXzqY7xE9UDw6l7JBu5cMtKC4K"></b-input>
          </b-field>
        </b-field>
        <b-field label="Message">
            <b-input v-model="webhook.message" placeholder="Hi there Discord!" type="textarea"></b-input>
        </b-field>
        <b-field>
          <button @click.prevent="sendMessage" :class="['button is-success', { 'is-loading': isLoading }]">Send Message</button>
        </b-field>
        <b-message v-if="error" type="is-danger" has-icon>
            {{ error || 'An unexpected error occurred.' }}
        </b-message>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webhook: {
        id: '',
        token: '',
        message: ''
      },
      error: '',
      isLoading: false
    }
  },
  methods: {
    sendMessage() {
      if (this.isLoading) return;
      this.error = '';
      if (!this.webhook.id) return this.error = 'Oops! You must provide a valid webhook ID.';
      if (!this.webhook.token) return this.error = 'Oops! You must provide a valid webhook token.';
      if (!this.webhook.message) return this.error = 'Oops! You must provide a valid message.';
      if (this.webhook.message.length > 2000) return this.error = 'Oops! Message length must be under 2000 characters.';
      try {
        this.isLoading = true;
        this.$axios.$post('https://discordapp.com/api/webhooks/' + this.webhook.id + '/' + this.webhook.token, {
          content: this.webhook.message
        }).then(async(response) => {
          this.isLoading = false;
          this.error = '';
          this.$toast.open({
            message: 'Successfully sent message to webhook.',
            type: 'is-success',
            position: 'is-top-right'
          })
        }).catch(async(e) => {
          this.isLoading = false;
          this.error = 'Failed to send message to webhook.';
        })
      } catch(e) {
        this.isLoading = false;
        console.error('Error while sending message: ' + e);
        this.error = 'An unexpected error occurred.';
      }
    }
  }
}
</script>

<style lang="sass">
html, body
  background-color: #23272A
.body-wrapper
  text-align: center
  margin-top: 20px

.label
  color: #fff

.input, .textarea
  background-color: #2C2F33
  border-color: transparent
  color: #fff

.input:hover, .textarea:hover 
  border-color: transparent

.input::placeholder, .textarea::placeholder
  color: #99AAB5
</style>
