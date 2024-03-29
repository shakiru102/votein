import { NuxtAppOptions } from "@nuxt/types/app";

export default async ({ $axios, store, redirect, app }: NuxtAppOptions) => {
   return await $axios.get('/admin/auth', {
       headers: {
           VOTEIN: await app.$cookiz.get('votein') || ''
       }
   }).then(res => {
    store?.commit('setUser', res.data)
    if(res.data) redirect('/admin')
   })
   .catch(err => {
       app.$cookiz.remove('votein')
   })
}