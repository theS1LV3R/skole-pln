<template>
  <div class="flex justify-center h-full">
    <div class="max-w-md lg:w-4/12 flex flex-col">
      <div
        class="dark:bg-dark-container bg-nord-nord6 p-4 justify-self-center rounded"
      >
        <h2 class="text-xl font-bold">{{ register ? 'Register' : 'Login' }}</h2>
        <form @submit.prevent="userLogin">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" name="username" />
          <br />
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
          />
          <label v-if="register" for="passwordRepeat">Repeat password</label>
          <input
            v-if="register"
            id="passwordRepeat"
            v-model="repeatPassword"
            type="password"
            name="passwordRepeat"
          />
          <input
            class="mt-3 button"
            type="submit"
            :value="register ? 'Register' : 'Login'"
            :disabled="processing"
            :class="{ disabled: processing }"
          />
        </form>
        <hr class="w-full border-1 border-nord-nord14 my-4" />
        <button
          class="button register-button"
          :disabled="processing"
          :class="{ disabled: processing }"
          @click.prevent="register = !register"
        >
          {{ register ? 'Login instead' : 'Register instead' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      register: false,
      isLogout: this.$route.query.logout === 'true',
      isRegister: this.$route.query.registered === 'true',
      processing: false,
    }
  },

  methods: {
    async userLogin() {
      this.processing = true
      this.$nuxt.$loading.start()

      await new Promise((resolve) => setTimeout(resolve, 50))

      const { username, password, repeatPassword } = this
      let error = false

      if (username.length < 3) {
        this.$toast.error('Username must be at least 3 characters long')
        error = true
      }

      if (password.length < 5) {
        this.$toast.error('Password must be at least 5 characters long')
        error = true
      }

      if (error) {
        this.processing = false
        this.$nuxt.$loading.finish()
        return
      }

      if (this.register) {
        if (password !== repeatPassword) {
          this.$toast.error('Passwords do not match')
          return
        }

        await this.$axios
          .$post('/auth/create', {
            username,
            password,
          })
          .then(() => {
            this.$toast.success('User successfully registered')
            this.register = false
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message)
          })
      } else {
        await this.$auth
          .loginWith('local', {
            data: {
              username,
              password,
            },
          })
          .then(() => {
            this.$toast.success('Logged in successfully')
            this.$router.push('/')
          })
          .catch((err) => {
            if (err.message.includes('401')) {
              this.$toast.error('Unauthorized')
              return
            }
            this.$toast.error(err.message)
          })
      }

      this.processing = false
      this.$nuxt.$loading.finish()
    },
  },
})
</script>

<style lang="postcss" scoped>
label {
  @apply block mb-2;
}

input[type='text'],
input[type='password'],
input[type='submit'],
.register-button {
  @apply shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-500 dark:bg-dark-background bg-nord-nord4;
}

input[type='submit'],
.register-button {
  @apply dark:text-dark-subtext text-nord-nord2 text-center;
}

input.disabled,
button.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.button {
  @apply p-1 py-0.5 dark:border-nord-nord2 cursor-pointer;
}
</style>
