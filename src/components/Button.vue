<template>
    <!-- Colocamos dinamicamente el color, la ruta y el texto. Si no tiene ruta por defecto no pone nada -->
    <v-col cols="auto">
        <v-btn :color="color" :to="to">
            {{ buttonText }}
        </v-btn>
    </v-col>
</template>

<script setup>
    defineProps({
        buttonText:{
            type: String
        },
        color: {
            type: String
        },
        to: {
            type: String,
            default: ''
        }
    })
</script>
