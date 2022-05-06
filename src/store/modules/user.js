import axios from 'axios'
import { defineStore } from 'pinia'
import { getFormData } from '../../utils/form'
import { useLocalStorage } from '@vueuse/core'
import router from '../../router'

export const useUserAccountStore = defineStore({
    id: 'user',

    state: () => ({
        token: useLocalStorage('api_token', ''),
        user: useLocalStorage('user', {}),
        isAuthenticated: false,
    }),

    getters: {
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getAuthError: (state) => state.authError,
        userActivated: (state) => !state.user.email_verified_at,
        userAuthenticated: (state) => state.isAuthenticated,
    },

    actions: {
        async loginUser(credentials) {
            return await axios
                .post(import.meta.env.API_ENDPOINT + '/login', getFormData(credentials))
                .then((response) => {
                    this.token = response.data.token
                    this.user = response.data.user
                    this.isAuthenticated = true

                    // If email is not yet verified, redirect to the activation page.
                    if (!this.user.email_verified_at) {
                        router.push('activation')
                    }

                    return response
                })
                .catch((error) => {
                    this.isAuthenticated = false

                    return error.response
                })
        },
        isUserAuthenticated() {
            if (!this.token || !this.user) return false
            else return true
        },
        validateToken() {
            return axios
                .get(import.meta.env.API_ENDPOINT + '/validate', {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => true)
                .catch((error) => {
                    localStorage.removeItem('api_token')
                    localStorage.removeItem('user')

                    return false
                })
        },
    },
})
