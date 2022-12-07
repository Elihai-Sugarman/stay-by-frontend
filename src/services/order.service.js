import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { staysArray } from '../../temp-data/stay-demo.js'
import { ordersArray } from '../../temp-data/order-demo.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    addOrderMsg,
}
window.cs = orderService

async function query() {
    var orders = await storageService.query(STORAGE_KEY)
    if (!orders.length) {
        orders = ordersArray
        utilService.saveToStorage(STORAGE_KEY, orders)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, renter is set by the backend
        order.renter = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder() {
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
