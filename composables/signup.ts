import { onMounted, reactive, ref, useContext, useRouter, useStore } from "@nuxtjs/composition-api"
import { registerBioRes, userDetails } from "~/types/interface"

export default () => {

    // Utility
   const router = useRouter()
   const { $axios } = useContext()
   const store = useStore()
// Data
   const firstname = ref<string>('')
   const lastname = ref<string>('')
   const voterID = ref<string>('')
   const phonenumber = ref<string>('')
   const email = ref<string>('')
   const password = ref<string>('')
   const dialog = ref<boolean>(false)
   const snackbar = ref<boolean>(false)
   const biometrics = ref<any>(null)
   const loading = ref<boolean>(false)
   const registered = ref<boolean>(false)
   const errortext = ref<string | undefined>('')
   let socket =  reactive<any>({})
   let _that = reactive<any>({})

   const registerUser = async () => {
       try {
           loading.value = true
        const user: userDetails = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            phonenumber: phonenumber.value,
            voterID: voterID.value,
            biometrics: biometrics.value,
            
        }
        // @ts-ignore
        const res = await $axios.$post(`/user/signup`, user)
        store.dispatch('initiateSignUpToken', res.token)
        loading.value = false
        router.push('/')
       } catch (error: any) {
             loading.value = false
             snackbar.value = true
             errortext.value = error.response.data;
             console.log(error.response.data)
             
       }
        
   }

   onMounted(() => {
       
       socket.on('registerbiometrics', (payload: registerBioRes) => {
           if(dialog.value){
            biometrics.value = payload.biometrics
            registered.value = payload.register
           }
           
       })
       socket.on('registerError', (payload: registerBioRes) => {
           if(dialog.value){
               errortext.value = payload.error
            registered.value = payload.register
            snackbar.value = !payload.register
           }
       
    })
 })
   

//    Methods
 const initIO = (param: any) => {
     _that = param
     socket = _that.$nuxtSocket({
        name: 'main'
      })
 }
 const closeDialog = () => {
     dialog.value = false
     registered.value = false
     biometrics.value = null

 }
 const openDialog = async () => {
     await $axios.post('/biometrics/initiateEnroll',{ id: 1234})
    registered.value = false
    biometrics.value = null
    dialog.value = true

 }

return {
    loading,
    registered,
    initIO,
    firstname,
    lastname,
    voterID,
    password,
    phonenumber,
    email,
    dialog,
    registerUser,
    snackbar,
    errortext,
    closeDialog,
    openDialog
    
}
    
}