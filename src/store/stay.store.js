import { stayService } from '../services/stay.service.local'
import { staysArray } from '../../temp-data/stay-demo.js'

export function getActionRemoveStay(stayId) {
    return {
        type: 'removeStay',
        stayId,
    }
}
export function getActionAddStay(stay) {
    return {
        type: 'addStay',
        stay,
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: 'updateStay',
        stay,
    }
}
export function getActionAddStayMsg(stayId) {
    return {
        type: 'addStayMsg',
        stayId,
        txt: 'Stam txt',
    }
}

export const stayStore = {
    state: {
        stays: [],
        allStays: [],
        filterBy: null,
    },
    getters: {
        stays(state) {
            return state.stays
        },
        labels(state) {
            const labels = []
            state.allStays.forEach((stay) => {
                stay.labels.forEach((label) => {
                    if (!labels.includes(label)) labels.push(label)
                })
            })
            return labels
        },
        // used for autocomplete on search-bar
        locations({ allStays }) {
            return allStays.map(({ address }) => address)
        },
        filterBy(state) {
            return state.filterBy
        }
    },
    mutations: {
        setStays(state, { stays }) {
            state.stays = stays
        },
        setAllStays(state, { stays }) {
            state.allStays = stays
        },
        addStay(state, { stay }) {
            state.stays.push(stay)
        },
        updateStay(state, { stay }) {
            const idx = state.stays.findIndex((c) => c.id === stay._id)
            state.stays.splice(idx, 1, stay)
        },
        removeStay(state, { stayId }) {
            state.stays = state.stays.filter((stay) => stay._id !== stayId)
        },
        addStayMsg(state, { stayId, msg }) {
            const stay = state.stays.find((stay) => stay._id === stayId)
            if (!stay.msgs) stay.msgs = []
            stay.msgs.push(msg)
        },
        setFilterBy(state, { filterBy }) {
            if (!filterBy) state.filterBy = null
            state.filterBy = {
                ...state.filterBy,
                ...filterBy
            }
        },
    },
    actions: {
        async addStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionAddStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in addStay', err)
                throw err
            }
        },
        async getStayById(context, { stayId }) {
            try {
                return stayService.getById(stayId)
            } catch (err) {
                console.log(err)
            }
        },
        async updateStay(context, { stay }) {
            try {
                stay = await stayService.save(stay)
                context.commit(getActionUpdateStay(stay))
                return stay
            } catch (err) {
                console.log('stayStore: Error in updateStay', err)
                throw err
            }
        },
        async loadStays(context) {
            try {
                let filterBy = context.state.filterBy || ''
                const stays = await stayService.query(filterBy)
                context.commit({ type: 'setStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            }
        },
        async loadAllStays(context) {
            try {
                const stays = await stayService.query()
                context.commit({ type: 'setAllStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadAllStays', err)
                throw err
            }
        },
        async removeStay(context, { stayId }) {
            try {
                await stayService.remove(stayId)
                context.commit(getActionRemoveStay(stayId))
            } catch (err) {
                console.log('stayStore: Error in removeStay', err)
                throw err
            }
        },
        async addStayMsg(context, { stayId, txt }) {
            try {
                const msg = await stayService.addStayMsg(stayId, txt)
                context.commit({ type: 'addStayMsg', stayId, msg })
            } catch (err) {
                console.log('stayStore: Error in addStayMsg', err)
                throw err
            }
        },
    },
}
