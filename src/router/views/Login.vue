<template>
    <div class="flex flex-col justify-center items-center h-screen bg-gray-100 relative">
        <form @submit="loginUser" class="w-[440px] p-14 rounded-xl bg-white shadow-md">
            <!-- Header -->
            <div class="mb-10 text-center">
                <h1 class="text-3xl font-bold">Agent Login</h1>
                <p class="mt-4 font-medium">Hey, enter your details to get sign in to your acocunt.</p>
            </div>

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
                <span class="text-sm text-red-600 font-medium mb-1">{{ authErrorMsg }}</span>
            </div>

            <div class="mb-2">
                <!-- <label for="email" class="font-medium mb-2 block text-gray-400">Email Address</label> -->
                <input
                    v-model="email"
                    name="email"
                    type="text"
                    :class="{ 'border-red-500': emailError }"
                    class="w-full mb-2 bg-gray-100 border-none rounded py-4 px-4 font-medium placeholder-gray-400 placeholder:font-medium"
                    placeholder="Enter Email / Phone No"
                />
            </div>

            <div>
                <!-- <label for="password" class="font-medium mb-2 block text-gray-400">Password</label> -->
                <input
                    v-model="password"
                    name="password"
                    type="password"
                    :class="{ 'border-red-500': passwordError }"
                    class="w-full mb-2 bg-gray-100 border-none rounded py-4 px-4 font-medium placeholder-gray-400 placeholder:font-medium"
                    placeholder="Passcode"
                />
            </div>

            <div class="mt-2 mb-4 flex items-center">
                <div class="flex-1 flex items-center">
                    <input
                        name="rememberme"
                        type="checkbox"
                        class="appearance-none checked:bg-black checked:border-transparent border-gray-300 hover:cursor-pointer"
                    />
                    <label for="rememberme" class="ml-2 font-medium text-sm">Remember me</label>
                </div>
                <div>
                    <a href="#" class="underline underline-offset-4 font-semibold text-sm">Forgot password?</a>
                </div>
            </div>

            <button
                type="submit"
                class="bg-black text-white w-full mt-5 font-semibold px-2 py-4 rounded"
                :disabled="isSubmitting"
            >
                Sign in
            </button>
        </form>

        <!-- Create account link -->
        <div class="text-center mt-12">
            <p>
                Don't have an account yet?
                <a href="#">Start using <span class="font-semibold">Thinkspace</span>.</a>
            </p>
        </div>
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
