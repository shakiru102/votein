import { adminDetails, userDetails } from "~/types/interface"



export const state = () => ({
    
    user: null as userDetails | null | adminDetails,
    voterDetails: null as userDetails | null,
    voting: false as boolean,
    continue: false as boolean
}) 

export const actions = {
     signInUser({ commit }: any, payload: { email: string, password: string }): any{
      return new Promise(async (resolve: any, reject: any) => {
          try {
            //   @ts-ignore
              const res = await this.$axios.post('/user/signin', payload)
            //   @ts-ignore
              await this.app.$cookiz.set('votein', res.data.token)
              return resolve()
          } catch (error: any) {
              return reject(error)
          }
      })
    },

    signInAdmin({ commit }: any, payload: { email: string, password: string }): any{
      return new Promise(async (resolve: any, reject: any) => {
          try {
            //   @ts-ignore
              const res = await this.$axios.post('/admin/signin', payload)
            //   @ts-ignore
              await this.app.$cookiz.set('votein', res.data.token)
              return resolve()
          } catch (error: any) {
              return reject(error)
          }
      })
    },
    initiateVoteToken({ commit }: any, data: any){
      // @ts-ignore
      this.app.$cookiz.set('voteUser', data.token)
      return 
    },
    initiateSignUpToken({ commit }: any, data: any){
      // @ts-ignore
      this.app.$cookiz.set('votein', data.token)
      return 
    },
    removeVoteSession({ commit}: any){
      // @ts-ignore
       this.app.$cookiz.remove('voteUser')
       return
    },
    removeUserSession({ commit}: any){
      // @ts-ignore
       this.app.$cookiz.remove('votein')
      // @ts-ignore
       this.app.$cookiz.remove('voteUser')
       localStorage.removeItem('savedVotes')
       return
    }
    
}

export const mutations = {
    setUser(state: any, data: userDetails | adminDetails){
          state.user = data
    },
    setVoterDetails(state: any, payload: any){
      state.voterDetails = payload
    },
    setVoting(state: any, payload: any){
      state.voting = payload
    },
    setContinue(state: any, payload: any){
      state.continue = payload
    }

    
}