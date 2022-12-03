import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { staysArray } from '../../temp-data/stay-demo.js'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
}
window.cs = stayService

async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (!stays.length) {
        stays = staysArray
        utilService.saveToStorage(STORAGE_KEY, stays)
    }

    if (filterBy.label) {
        stays = stays.filter((stay) => stay.labels.includes(filterBy.label))
    }

    if (filterBy.price) {
        stays = stays.filter((stay) => stay.price <= filterBy.price)
    }

    if (filterBy?.address) {
        const { city, country } = filterBy.address
        const cityRegex = new RegExp(city, 'i')
        const countRegex = new RegExp(country, 'i')

        stays = stays.filter(({ address }) =>
            countRegex.test(address.country) ||
            cityRegex.test(address.city)
        )
    }

    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STORAGE_KEY, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)
    if (!stay.msgs) stay.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function getEmptyStay() {
    return {
        name: 'House -' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// TEST DATA
// ;(async () => {
//     await storageService.post(STORAGE_KEY, { name: 'House 1', price: 180 })
//     await storageService.post(STORAGE_KEY, { name: 'House 2', price: 240 })
// })()
