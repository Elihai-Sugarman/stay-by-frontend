import { orderService } from '../services/order.service'
import { socketService, SOCKET_EMIT_ORDER_ADD } from '../services/socket.service'
import { ordersArray } from '../../temp-data/order-demo.js'
export function getActionRemoveOrder(orderId) {
    return {
        type: 'removeOrder',
        orderId,
    }
}
export function getActionAddOrder(order) {
    return {
        type: 'addOrder',
        order,
    }
}
export function getActionUpdateOrder(order) {
    return {
        type: 'updateOrder',
        order,
    }
}
export function getActionAddOrderMsg(orderId) {
    return {
        type: 'addOrderMsg',
        orderId,
        txt: 'Stam txt',
    }
}

export const orderStore = {
    state: {
        orders: [],
        allOrders: [],
        filterBy: null,
    },
    getters: {
        orders(state) {
            return state.orders
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        updateOrder(state, { order }) {
            const idx = state.orders.findIndex((c) => c.id === order._id)
            state.orders.splice(idx, 1, order)
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter((order) => order._id !== orderId)
        },
    },
    actions: {
        async addOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionAddOrder(order))
                socketService.emit(SOCKET_EMIT_ORDER_ADD, order)
                return order
            } catch (err) {
                console.log('orderStore: Error in addOrder', err)
                throw err
            }
        },
        async getOrderById(context, { orderId }) {
            try {
                return orderService.getById(orderId)
            } catch (err) {
                console.log(err)
            }
        },
        async updateOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionUpdateOrder(order))
                return order
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async loadOrders(context) {
            try {
                const orders = await orderService.query()
                context.commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async removeOrder(context, { orderId }) {
            try {
                await orderService.remove(orderId)
                context.commit(getActionRemoveOrder(orderId))
            } catch (err) {
                console.log('orderStore: Error in removeOrder', err)
                throw err
            }
        },
        async addOrderMsg(context, { orderId, txt }) {
            try {
                const msg = await orderService.addOrderMsg(orderId, txt)
                context.commit({ type: 'addOrderMsg', orderId, msg })
            } catch (err) {
                console.log('orderStore: Error in addOrderMsg', err)
                throw err
            }
        },
    },
}
