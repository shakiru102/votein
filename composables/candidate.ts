import { computed, onMounted, ref, useContext } from "@nuxtjs/composition-api";
import { candidateDetails, editPosition } from "~/types/interface";

const candidate = () => {
  // Context
  const { $axios, store } = useContext()
    //    Data
    const data  = ref<candidateDetails[]>([])
    const dialog = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const editDialog = ref<boolean>(false)
    const deleteDialog = ref<boolean>(false)
    const resType = ref<boolean>(false)
    const snackbar = ref<boolean>(false)
    const tabLoading = ref<boolean>(false)
    const resMessage = ref<string>('')
    const positions = ref<string[]>([])
    const firstname = ref<string>('')
    const lastname = ref<string>('')
    const nin = ref<string>('')
    const party = ref<string>('')
    const position = ref<string>('')
    const updateData = ref<candidateDetails | null>(null)
    const headers = ref<object[]>([
        { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'First name', value: 'firstname' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Last name', value: 'lastname' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Position', value: 'position' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Platform', value: 'party' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Tools', value: 'actions' },
    ])

    const headersUser = ref<object[]>([
      { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
      { class: 'subtitle-1 green accent-1', align: "center", text: 'First name', value: 'firstname' },
      { class: 'subtitle-1 green accent-1', align: "center", text: 'Last name', value: 'lastname' },
      { class: 'subtitle-1 green accent-1', align: "center", text: 'Position', value: 'position' },
      { class: 'subtitle-1 green accent-1', align: "center", text: 'Platform', value: 'party' },
  ])
     onMounted(async () => {
        await $axios.$get('/position').then( res => res.forEach((item: editPosition) => positions.value.push(item.position)))
        tabLoading.value = !tabLoading.value
        await $axios.$get(`/candidate?electionDate=${ store.state.user.electionDate }`).then( res => data.value = res)   
        tabLoading.value = !tabLoading.value

     })
    // Computed
    const items = computed(() => data.value.map((item, index) => {
               return { ...item, number: ++index}
    }))
    //  Methods
    const addNew = (): boolean => dialog.value = !dialog.value
    const editData = (data: candidateDetails) => {
        updateData.value = data
        editDialog.value = !editDialog.value

      }
    const initiateUpdate = async () => {
      try {
        loading.value = true
        const res = await $axios.$put('/candidate/update', { 
          firstname: updateData.value?.firstname,
          lastname: updateData.value?.lastname,
          NIN: updateData.value?.NIN,
          electionDate: updateData.value?.electionDate,
          party: updateData.value?.party,
          position: updateData.value?.position,
          _id: updateData.value?._id
         } as candidateDetails)
        data.value = res
        editDialog.value = !editDialog.value
        loading.value = false
        snackbar.value = true
        resType.value = true
        resMessage.value = 'Candidate updated successfully'
      } catch (error: any) {
        loading.value = false
        snackbar.value = true
        resType.value = false
        resMessage.value = error.response.data
      }
    }  
      const cancelEditData = () => editDialog.value = !editDialog.value
      const deleteData = (data: candidateDetails) => {
        updateData.value = data
        deleteDialog.value = !deleteDialog.value 
       
      }
      const initiateDelete = async () => {
        loading.value = true
        try {
        const res = await $axios.$delete(`/candidate/delete?id=${ updateData.value?._id }`)
        data.value = res
        deleteDialog.value = !deleteDialog.value 
        loading.value = false
        snackbar.value = true
        resType.value = true
        resMessage.value = 'Candidate deleted successfully'
          
        } catch (error: any) {
          loading.value = false
          snackbar.value = true
          resType.value = false
          resMessage.value = error.response.data
        }
      }
      const cancelNewData = () => {
        firstname.value = ''
        lastname.value = ''
        position.value = ''
        party.value = ''
        nin.value = ''
        dialog.value = !dialog.value
      }

      const handleCandidate = async () => {
        try {
          loading.value = true
          const res = await $axios.$post('/candidate/create',  {
            firstname: firstname.value,
            lastname: lastname.value,
            position: position.value,
            NIN: nin.value,
            party: party.value,
            electionDate: store.state.user.electionDate
          } as candidateDetails)
          data.value = res
          firstname.value = ''
          lastname.value = ''
          position.value = ''
          party.value = ''
          nin.value = ''
          loading.value = false
          snackbar.value = true
          resType.value = true
          resMessage.value = 'Candidate created successfully'
        } catch (error: any) {
          loading.value = false
          snackbar.value = true
          resType.value = false
          resMessage.value = error.response.data
        }
         
      }
       

    return {
        data,
        headers,
        headersUser,
        items,
        dialog,
        editDialog,
        deleteDialog,
        positions,
        position,
        firstname,
        lastname,
        party,
        addNew,
        editData,
        cancelEditData,
        deleteData,
        cancelNewData,
        nin,
        updateData,
        handleCandidate,
        snackbar,
        resMessage,
        resType,
        loading,
        tabLoading,
        initiateUpdate,
        initiateDelete
    }
}

export default candidate 