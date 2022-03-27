import { onMounted, reactive, ref, useContext, useRouter, useStore } from "@nuxtjs/composition-api"
import { userDetails } from "~/types/interface"

export default () => {
// Utility
const router = useRouter()
const store = useStore()

//    Data
    const email = ref<string>('')
    const password = ref<string>('')
    const snackbar = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const errortext = ref<string>('')
    let _that = reactive<any>({})
// Methods

onMounted(async () => {

 })
   const signinUser = async () => {
       loading.value = true
       try {
        const user: userDetails = {
            email: email.value,
            password: password.value
        } 
        await store.dispatch('signInUser', user)
        loading.value = false
        router.push('/') 
       } catch (err: any) {
           errortext.value = err.response.data
           loading.value = false
           snackbar.value = true
       }
        
   }
  
   const initGlobal = (param: any) =>  _that = param
   

    return {
       email,
       password,
       signinUser,
       snackbar,
       errortext,
       loading,
       initGlobal
    }
}

