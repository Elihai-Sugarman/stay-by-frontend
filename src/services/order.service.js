import { httpService } from './http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,
    getRenterOrders,
    getHostOrders
}
window.cs = orderService

async function query(filterBy = {}) {
    return httpService.get('order', filterBy)
}

async function getRenterOrders() {
    return httpService.get('order/renter')
}

async function getHostOrders() {
    return httpService.get('order/host')
}

function getById(orderId) {
    return httpService.get('order', orderId)
}

function remove(orderId) {
    return httpService.delete('order/' + orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put('order/' + order._id, order)
    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}
