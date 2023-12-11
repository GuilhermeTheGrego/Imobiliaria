import { randomUUID } from "crypto"


export class DatabaseMemory{
    #Terrenos = new Map()

list(search){
    return Array.from(this.#Terrenos.entries()).map((TerrenoArray) => {
        const id = TerrenoArray[0]

        const data = TerrenoArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(terreno => {
        if (search){
        return terreno.titulo.includes(search)
        }
        return true
    })
}

    create(terreno){
        const TerrenoId = randomUUID()
        this.#Terrenos.set(TerrenoId, terreno)
    }
    
    update(id, terreno){
        this.#Terrenos.set(id, terreno)
    }

    delete(id, terreno){
        this.#Terrenos.delete(id, terreno)
    }
}

