import { computed, onMounted, reactive, ref, useContext } from '@nuxtjs/composition-api'
import { editPosition } from '~/types/interface'

const utilty = () => {
  // Context
  const { $axios } = useContext()
    // Data
    const data = ref<object[]>([]) 
    const editDataDetail = ref<editPosition | null>(null) 
    let _fire = reactive<object>({})
    const dialog = ref<boolean>(false)
    const editDialog = ref<boolean>(false)
    const snackbar = ref<boolean>(false)
    const deleteDialog = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const tabLoading = ref<boolean>(false)
    const resType = ref<boolean>(false)
    const description = ref<string>('')
    const resMessage = ref<string>('')
    const maxVote = ref<string>('')
    const headers = ref<object[]>([
        { class: 'subtitle-1 green accent-1', align: "center", text: 'S/N', value: 'number' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Description', value: 'position' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Maximum Vote', value: 'maxVote' },
        { class: 'subtitle-1 green accent-1', align: "center", text: 'Tools', value: 'actions' },
    ])

    // Computed
const items = computed(() => {
  if(data.value) return data.value.map((item, index) => {
    return { ...item, number: ++index} 
}) 
})

      //  Hooks
      onMounted( async () => {

        try {
          tabLoading.value = true
          // @ts-ignore
          const res = await $axios.$get('/position')
         data.value = res
        tabLoading.value = false
        } catch (error: any) {
          console.log(error.response.data)
          resMessage.value = error.message
          tabLoading.value = false
          snackbar.value = true
          resType.value = false
        }
        
      })

  //  Methods
  const addNew = (): boolean => dialog.value = !dialog.value
  const editData = (data: editPosition) => {
    editDataDetail.value = data
    editDialog.value = !editDialog.value
    
  }
  const updateDetails = async () => {
    try {
       loading.value = true
       const positions = await $axios.put('/position/update', {
         position: editDataDetail.value?.position,
         maxVote: editDataDetail.value?.maxVote,
         _id: editDataDetail.value?._id
       } as editPosition)
        data.value = positions.data
     loading.value = false
     description.value = ''
     resMessage.value = 'Updated successfully'
     maxVote.value = ''
     snackbar.value  = true
     resType.value = true
     editDialog.value = false
    } catch (error: any) {
      resMessage.value = error.response.data
        loading.value = false
        snackbar.value = true
        resType.value = false

    }
  } 
  const cancelEditData = () => editDialog.value = !editDialog.value
  
  const deleteData = (data: editPosition) => {
    editDataDetail.value = data
    deleteDialog.value = !deleteDialog.value
  }

  const confirmDeleteData = async () => {
    try {
      loading.value = true
      const positions = await $axios.$delete(`/position/delete?id=${ editDataDetail.value?._id }`)
      data.value = positions
   loading.value = false
   description.value = ''
   resMessage.value = 'Position has been deleted'
   maxVote.value = ''
   snackbar.value  = true
   resType.value = true
   deleteDialog.value = false
    } catch (error:  any) {
      resMessage.value = error.message
        loading.value = false
        snackbar.value = true
        resType.value = false
    }
   
  }
  
  const cancelNewData = () =>  dialog.value = !dialog.value
  
  const savePosition = async () => {  
    loading.value = true
      try {
        const position = await $axios.$post('/position/create', {
          position: description.value,
          maxVote: maxVote.value,
        })
         data.value = position
        loading.value = false
        description.value = ''
        resMessage.value = 'Save successfully'
        maxVote.value = ''
        snackbar.value  = true
        resType.value = true
      } catch (error: any) {
        resMessage.value = error.message
        loading.value = false
        snackbar.value = true
        resType.value = false

      }
  }
    
    return {
        deleteData,
        dialog, 
        addNew, 
        data, 
        headers, 
        items, 
        description, 
        maxVote, 
        editData, 
        cancelEditData, 
        editDialog, 
        deleteDialog,
        cancelNewData,
        loading,
        snackbar,
        savePosition,
        resMessage,
        resType,
        tabLoading,
        editDataDetail,
        updateDetails,
        confirmDeleteData 
    }
}

export default utilty