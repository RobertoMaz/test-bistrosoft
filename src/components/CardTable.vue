<template>
    <v-card
        class="mx-auto"
        max-width="344"
        height="115"
        hover
        :color="cardColor"
        @click="tableStore.cardSelected(props)"
    >
        <v-card-title class="text-center">
            {{ table }}
        </v-card-title>

        <v-card-subtitle class="text-center pb-3">
            {{ time }}
        </v-card-subtitle>
    <v-card-text 
        class="bg-grey-lighten-5 d-flex justify-space-between pa-2" 
        :class="{'pa-5 mt-5' : state == 'libre'}"
    >
        <div v-if="state !== 'libre'">
            Mozo {{ waiter }}
        </div>
        <div v-if="state !== 'libre'">
            ${{ amount }}
        </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
    import { computed } from 'vue'
    import { useTable } from '@/stores/table'

    const tableStore = useTable()

    const props = defineProps({
        id: {
            type: Number
        },
        table: {
            type: String
        },
        time: {
            type: String,
            default: ''
        },
        waiter: {
            type: Number,
            default: null
        },
        amount: {
            type: Number,
            default: null
        },
        state:{
            type: String
        }
    })

    const cardColor = computed(() => {
        switch (props.state) {
            case 'ocupada':
                return 'red'
            case 'libre':
                return 'green'
            case 'cerrada':
                return 'blue'
        }
    })
</script>
