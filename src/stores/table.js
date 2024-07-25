import { defineStore } from "pinia"
import { ref, watch, onMounted } from "vue"
import { db } from "@/data/db"
import { useRoute } from "vue-router"

export const useTable = defineStore('table', () => {

    const errorMsg = ref('')
    const table = ref({})
    const tableSelected = ref([])

    const route = useRoute()

    const STORAGE_KEY = 'tableData'

    onMounted(() =>{
        const loadStorage = loadTableData()
        if(loadStorage.length == 0){
            table.value = db
        } else {
            table.value = loadStorage
        }
    })

    // Recuperamos los datos del localStorage
    function loadTableData() {
        const storedData = localStorage.getItem(STORAGE_KEY)
        // Si no existe el ítem en el localStorage, devuelve un array vacío.
        return storedData ? JSON.parse(storedData) : []
    }

    // Pasamos al estado que seleccionamos una tarjeta.
    function cardSelected(props) {
        tableSelected.value = props
    }

    // Cambiamos el estado de la tarjeta a cerrada y la mesa queda lista para cobrar.
    function closeTable() {
        // Validamos que el usuario tenga una mesa seleccionada.
        if(tableSelected.value.length == 0) return alert("No seleccionaste una mesa")
        
        table.value.forEach(data => {

            // Validamos que el ID de la mesa seleccionada sea igual al item recorrido por el forEach.
            // Si no es igual, devuelve return y continua con el siguiente ítem.
            if(data.id !== tableSelected.value.id) return

            // Validamos que la mesa seleccionada sea igual al estado que esperamos, para editar la tarjeta.
            // Si no es igual, devolvemos un alerta, notificando el error.
            if(tableSelected.value.state == 'ocupada'){
                data.state = 'cerrada'
            } else {
                alert('Debes seleccionar unan mesa ocupada para poder cerrarla')
            }
        })
    }

    // Cambiamos el estado de la tarjeta a mesa ocupada.
    function openTable() {
        // Validamos que el usuario tenga una mesa seleccionada.
        if(tableSelected.value.length == 0) return alert("No seleccionaste una mesa")

        const min = 1000
        const max = 20000

        table.value.forEach(data => {
            // Validamos que el ID de la mesa seleccionada sea igual al ítem recorrido por el forEach.
            // Si no es igual, devuelve return y continua con el siguiente ítem.
            if(data.id !== tableSelected.value.id) return

            // Validamos que la mesa seleccionada sea igual al estado que esperamos, para editar la tarjeta.
            // Si no es igual, devolvemos un alerta, notificando el error.
            if(tableSelected.value.state == 'libre'){
                const date = new Date()
                const hours = date.getHours().toString().padStart(2, '0')
                const minutes = date.getMinutes().toString().padStart(2, '0')
                const timeString = `${hours}:${minutes}`
                
                data.state = 'ocupada'
                data.time = timeString
                data.waiter = Math.floor(Math.random() * 4) + 1
                data.amount =  Math.floor(Math.random() * (max - min + 1)) + min
            } else {
                alert("Debes seleccionar una mesa libre para poder abrir la mesa")
                return
            }  
        })
    }

    // Cambiamos el estado de la tarjeta a libre y queda lista para volver a ocupar.
    function cleanTable() {
        // Validamos que el usuario tenga una mesa seleccionada.
        if(tableSelected.value.length == 0) return alert("No seleccionaste una mesa")

        table.value.forEach(data => {
            // Validamos que el ID de la mesa seleccionada sea igual al ítem recorrido por el forEach.
            // Si no es igual, devuelve return y continua con el siguiente ítem.
            if(data.id !== tableSelected.value.id) return

            // Validamos que la mesa seleccionada sea igual al estado que esperamos, para editar la tarjeta.
            // Si no es igual, devolvemos un alerta, notificando el error.
            if(tableSelected.value.state == 'cerrada'){
                data.state = 'libre'
                data.time = ''
                data.waiter = null
                data.amount =  null
            } else {
                alert("Debes seleccionar una mesa cerrada para poder liberar la mesa")
                return
            }
        
        })
    }

    // Guardamos en LocalStorage el estado de las mesas para tener consistencias por si recargamos el navegador.
    function saveTableData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(table.value))
        tableSelected.value = []
    }

    // Con este watch hacemos seguimiento a el estado de table, si recibe alguna modificación guarda los datos.
    watch(table, saveTableData, { deep: true })

    // Con este watch limpiamos el estado de tableSelected cuando nanvegan por otras rutas.
    watch(route, () => {
        tableSelected.value = []
    })
   
    return {
        table,
        cardSelected,
        closeTable,
        openTable,
        errorMsg,
        loadTableData,
        cleanTable
    }
})