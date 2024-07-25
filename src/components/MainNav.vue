<template>
    <div>
        <v-app-bar 
            :elevation="2"
            color="indigo-darken-4"   
        >
            <router-link to="/" class="v-app-bar-title-link">
                <v-app-bar-title class="px-5">bistrosoft</v-app-bar-title>
            </router-link>

            <v-btn to="/punto-de-venta">Punto de Venta</v-btn>
            <v-btn to="/cliente">Cliente</v-btn>
            <v-btn to="/productos">Productos</v-btn>
            <v-btn to="/proveedores">Proveedores</v-btn>
            <v-btn to="/caja">Caja</v-btn>
        </v-app-bar>
    </div>
</template>

<style scoped>
    .v-app-bar-title-link {
        text-decoration: none;
        color: inherit;
    }
</style>
