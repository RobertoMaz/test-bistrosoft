<template>
    <!-- Colocamos dinamicamente el color dependiendo del estado de la tarjeta -->
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
            <!-- El texto de mozo que atiende y el consumo actual, sólo se muestra si la mesa está ocupada -->
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
        amount: {
            type: Number,
            default: null
        },
        state:{
            type: String
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
        }
    })

    // Con este switch definimos el color de la tarjeta.
    const cardColor = computed(() => {
        switch (props.state) {
            case 'libre':
                return 'green'
            case 'ocupada':
                return 'red'
            case 'cerrada':
                return 'blue'
        }
    })
</script>
