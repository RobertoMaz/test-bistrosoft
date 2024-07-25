<template>
  <v-container fluid class="pt-16 pa-0 ml-2">
    <v-row>
      <!-- Columna 1: 1/4 del ancho -->
      <v-col cols="4"   class="pa-0 ma-0">
        <v-card color="indigo-darken-4" class="h-screen">
          <v-row class="pt-8" justify="center">
            <v-col cols="auto" class="d-flex justify-center">
              <v-btn to="/">
                <v-icon class="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </v-icon>
                Regresar
              </v-btn>
            </v-col>
            <Button :buttonText="'Mostrar comanda'"/>
          </v-row>
          <v-row class="pa-4" justify="center">
            <v-col cols="auto">
              <v-card color="grey-lighten-1" class="pa-4 ma-2">
                <v-row no-gutters>
                  <v-col cols="auto" class="d-flex align-center">
                    <v-icon class="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    </v-icon>
                  </v-col>
                  <v-col>
                    Selecciona una mesa para comenzar una comanda
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- columna 2 3/4 del ancho-->
      <v-col cols="8"   class="pa-0 d-flex flex-column">
        <v-card color="grey-lighten-5" class="h-screen pa-8 pl-12">
          <v-row justify="start">
            <Button :buttonText="'Todos'"/>
            <Button :buttonText="'Mostrador'"/>
          </v-row>
          <v-row class="pr-8" justify="start">
            <!-- Cada CardTable ocupa 4 columnas, ajusta según sea necesario -->
            <v-col cols="12" sm="6" md="4" lg="3" xl="3" v-for="(comanda, index) in table.table" :key="index">
              <CardTable 
                :id="comanda.id"
                :table="comanda.table"
                :time="comanda.time"
                :waiter="comanda.waiter"
                :amount="comanda.amount"
                :state="comanda.state"
              />
            </v-col>
          </v-row>
            <v-row class="mr-4">
              <v-col cols="4">
                <v-btn block color="green"  @click="table.openTable">
                  Abrir Mesa
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn block color="red" @click="table.closeTable">
                  Cerrar Mesa
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn block color="blue"  @click="table.cleanTable">
                  Liberar Mesa
                </v-btn>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import Button from '@/components/Button.vue'
  import CardTable from '@/components/CardTable.vue'
  import { db } from '@/data/db'
  import { useTable } from '@/stores/table'

  const table = useTable()
  
  // Validamos que el estado tabla, del store esté vacío y se carga sólo la primera vez.
  if(table.table.length == 0){
    table.table = db
  }   
</script>