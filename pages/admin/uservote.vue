<template>
    <div>
        <head-content>{{ $store.state.user.electionDate }}</head-content>
        <vote-content />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    middleware: 'uservote',
})
</script>
