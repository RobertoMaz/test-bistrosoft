import { defineStore } from "pinia"
import { reactive, ref, watch, onMounted } from "vue"
import { db } from "@/data/db"
import { useRoute } from "vue-router"

const STORAGE_KEY = 'tableData'

function loadTableData() {
    const storedData = localStorage.getItem(STORAGE_KEY)
    return storedData ? JSON.parse(storedData) : [];
}

export const useTable = defineStore('table', () => {

    const table = ref({})
    const tableSelected = ref([])
    const errorMsg = ref('')

    const route = useRoute()

    onMounted(() =>{
        const loadStorage = loadTableData()
        if(loadStorage.length == 0){
            console.log("esta sin datos")
            table.value = db
        } else {
            console.log("esta con datos")
            table.value = loadStorage
        }
    })



    function cardSelected(props) {
        tableSelected.value = props
    }

    function closeTable() {
        if(tableSelected.value.length == 0) return alert("No seleccionaste una mesa")
        
        table.value.forEach(data => {

            if(data.id !== tableSelected.value.id) return

            if(tableSelected.value.state == 'ocupada'){
                data.state = 'cerrada'
                saveTableData()
            } else {
                alert('Debes seleccionar unan mesa ocupada para poder cerrarla')
            }
        })
    }

    function openTable() {
        if(tableSelected.value.length == 0) return alert("No seleccionaste una mesa")

        const min = 1000
        const max = 20000

        table.value.forEach(data => {
            if(data.id !== tableSelected.value.id) return

            if(tableSelected.value.state == 'libre'){
                const date = new Date();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const timeString = `${hours}:${minutes}`;
                
                data.state = 'ocupada'
                data.time = timeString
                data.waiter = Math.floor(Math.random() * 4) + 1
                data.amount =  Math.floor(Math.random() * (max - min + 1)) + min
                saveTableData()
            } else {
                alert("Debes seleccionar una mesa libre para poder abrir la mesa")
                return
            }  
        })
    }
    
    function cleanTable() {
        if(tableSelected.value.length == 0){
            errorMsg.value = 'No seleccionaste una mesa'
            alert("No seleccionaste una mesa")
            return
        }

        table.value.forEach(data => {

            if(data.id == tableSelected.value.id ){
                if(tableSelected.value.state == 'cerrada'){
                    
                    data.state = 'libre'
                    data.time = ''
                    data.waiter = null
                    data.amount =  null
                    saveTableData()

                } else {
                    alert("Debes seleccionar una mesa cerrada para poder liberar la mesa")
                    return
                }
            }
        })
    }

    function saveTableData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(table.value));
    }

    

    watch(table, saveTableData, { deep: true })

    watch(route, () => {
        console.log("cambio de ruta", route.name)
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