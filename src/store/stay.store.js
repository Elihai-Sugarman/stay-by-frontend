import { stayService } from '../services/stay.service'

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

export const stayStore = {
    state: {
        stays: [],
        totalStays: 0,
        filterBy: null,
        isLoading: false
    },
    getters: {
        stays(state) {
            return state.stays
        },
        totalStays(state) {
            return state.totalStays
        },
        filterBy(state) {
            return state.filterBy
        },
        isStaysLoading(state) {
            return state.isLoading
        }
    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        setStays(state, { stays, totalStays }) {
            state.stays = stays
            state.totalStays = totalStays
        },
        addMoreStays(state, { stays }) {
            state.stays.push(...stays)
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
            context.commit({ type: 'setIsLoading', isLoading: true })
            try {
                let filterBy = context.state.filterBy || {}
                const response = await stayService.query(filterBy)
                context.commit({ type: 'setStays', ...response })
            } catch (err) {
                console.log('stayStore: Error in loadStays', err)
                throw err
            } finally {
                context.commit({ type: 'setIsLoading', isLoading: false })
            }
        },
        async loadMoreStays(context, { skip }) {
            const { stays, totalStays } = context.getters
            if (stays.length >= totalStays) return

            context.commit({ type: 'setIsLoading', isLoading: true })
            try {
                let filterBy = context.state.filterBy || {}
                const { stays } = await stayService.query({ ...filterBy, skip })
                context.commit({ type: 'addMoreStays', stays })
            } catch (err) {
                console.log('stayStore: Error in loadMoreStays', err)
                throw err
            } finally {
                context.commit({ type: 'setIsLoading', isLoading: false })
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
        }
    }
}
