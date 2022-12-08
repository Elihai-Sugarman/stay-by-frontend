import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { staysArray } from '../../temp-data/stay-demo.js'
import { httpService } from './http.service'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg,
    getRenterOrders,
    getHostOrders
}
window.cs = orderService

async function query(filterBy = {}) {
    // var orders = await storageService.query(STORAGE_KEY)
    // if (!orders.length) {
    //     orders = ordersArray
    //     utilService.saveToStorage(STORAGE_KEY, orders)
    // }
    return httpService.get('order', filterBy)
}

async function getRenterOrders() {
    return httpService.get('order/renter')
}

async function getHostOrders() {
    return httpService.get('order/host')
}

function getById(orderId) {
    // return storageService.get(STORAGE_KEY, orderId)
    return httpService.get('order', orderId)
}

function remove(orderId) {
    // storageService.remove(STORAGE_KEY, orderId)
    return httpService.delete('order/' + orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put('order/' + order._id, order)
    } else {
        // Later, renter is set by the backend
        // order.renter = userService.getLoggedinUser()
        savedOrder = await httpService.post('order', order)
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

// TEST DATA
// ;(async () => {
//     await storageService.post(STORAGE_KEY, { name: 'House 1', price: 180 })
//     await storageService.post(STORAGE_KEY, { name: 'House 2', price: 240 })
// })()
