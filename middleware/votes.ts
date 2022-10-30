import { NuxtAppOptions } from "@nuxt/types/app"

export default async ({ $axios, store, redirect, app }: NuxtAppOptions) => {
    return await $axios.get('/admin/auth', {
        headers: {
            VOTEIN: await app.$cookiz.get('votein') || ''
        }
    }).then(res => {
       if(!res.data.super) redirect('/admin')
    })
    .catch(err => {
        redirect('/admin')
    })
 }