import { NuxtAppOptions } from "@nuxt/types/app";

export default async ({ $axios, store, redirect, app }: NuxtAppOptions) => {
   return await $axios.get('/user/auth', {
       headers: {
           VOTEIN: await app.$cookiz.get('voteUser') || ''
       }
   }).then(res => {
    store?.commit('setVoterDetails', res.data)
    store?.commit('setVoting', true)
    store?.commit('setContinue', false)
   })
   .catch(err => {
       app.$cookiz.remove('voteUser')
       redirect('/admin')
   })
}