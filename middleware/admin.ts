import { NuxtAppOptions } from "@nuxt/types/app";

export default async ({ $axios, store, redirect, app }: NuxtAppOptions) => {
   return await $axios.get('/admin/auth', {
       headers: {
           VOTEIN: await app.$cookiz.get('votein') || ''
       }
   }).then(res => {
    store?.commit('setUser', res.data)
    store?.commit('setVoting', false)
    const verify = app.$cookiz.get('voteUser')
    if(verify) store?.commit('setContinue', true)
   })
   .catch(err => {
       app.$cookiz.remove('votein')
       app.$cookiz.remove('voteUser')
       redirect('/adminroutes/welcome')
   })
}