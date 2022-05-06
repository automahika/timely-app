<template>
    <div class="flex justify-center items-center h-screen">
        <form @submit="loginUser" class="w-[350px] border-2 border-black p-10 rounded-lg">
            <!-- Validation Errors -->
            <div v-if="Object.keys(errors).length > 0">
                <span class="text-sm font-semibold mb-3 block">Please check the following errors:</span>
                <ul class="mb-8 list-disc pl-5">
                    <li v-for="(value, index) in errors" :key="index" class="text-sm text-red-600 font-semibold mb-1">
                        {{ value }}
                    </li>
                </ul>
            </div>

            <div v-if="authErrorMsg" class="text-center mb-8">
                <span class="text-sm text-red-600 font-semibold mb-1">{{ authErrorMsg }}</span>
            </div>

            <input
                v-model="email"
                name="email"
                type="text"
                :class="{ 'border-red-500': emailError }"
                class="w-full text-sm mb-2 border-2 border-black rounded-lg py-3"
                placeholder="youremail@domain.com"
            />

            <!-- Password Field -->
            <input
                v-model="password"
                name="password"
                type="password"
                :class="{ 'border-red-500': passwordError }"
                class="w-full text-sm border-2 border-black rounded-lg py-3"
                placeholder="******"
            />

            <button
                type="submit"
                class="bg-black text-white w-full mt-5 font-semibold text-sm p-2 rounded-lg py-3"
                :disabled="isSubmitting"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script>
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'

import { useUserAccountStore } from '../../store'

export default {
    setup() {
        const userStore = useUserAccountStore()

        // Form validation schema
        const schema = yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
        })
        // Create a form context with the form validation schema
        const { errors, isSubmitting, handleSubmit, isRequired } = useForm({ validationSchema: schema })

        const authErrorMsg = ref('')

        // Input Fields
        const { value: email, errorMessage: emailError } = useField('email', isRequired, {
            validateOnValueUpdate: false,
        })
        const { value: password, errorMessage: passwordError } = useField('password', isRequired, {
            validateOnValueUpdate: false,
        })

        // Helper Functions
        const clearAuthError = () => (authErrorMsg.value = '')

        // Authenticate the user with the credentials
        const loginUser = handleSubmit(() => {
            clearAuthError()
            userStore.loginUser({ email: email.value, password: password.value })
        })

        // Listen to authentication action
        userStore.$onAction(({ name, store, args, after, onError }) => {
            after((response) => {
                if (name === 'loginUser') {
                    if (response.status == 401) {
                        authErrorMsg.value = response.data.message
                    }
                }
            })
        }, true)

        return {
            authErrorMsg,
            isSubmitting,
            emailError,
            passwordError,
            userStore,
            errors,
            email,
            password,
            loginUser,
        }
    },
}
</script>
