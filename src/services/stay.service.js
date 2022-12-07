import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const labels = [
    "National-parks",
    "Campers",
    "Surfing",
    "Amazing-views",
    "Beach",
    "Castles",
    "Islands",
    "Caves",
    "OMG!",
    "Lakefront",
    "Beachfront",
    "Design",
    "Cabins"
]

const amenities = [
    "Heating",
    "Bath Essentials",
    "Kitchen",
    "Cooking Basics",
    "Bed Linens",
    "Hot Water Kettle",
    "Dishes And Silverware",
    "Washer",
    "Dryer",
    "Dishwasher",
    "Self Check In",
    "Cleaning Before Checkout",
    "Tv",
    "First Aid Kit",
    "Gym",
    "Iron",
    "Microwave",
    "Body Soap",
    "Hair Dryer",
    "Coffee Maker",
    "Travel Crib",
    "Hot Water",
    "Beachfront",
    "Beach View",
    "Essentials",
    "Bathroom Essentials",
    "Lockbox",
    "Air Conditioning",
    "Smoking Allowed",
    "Wifi",
    "Hangers",
    "Doorman",
    "Long Term Stays Allowed",
    "Stove",
    "Bathtub",
    "Extra Pillows And Blankets",
    "Free Parking On Premises",
    "Paid Parking On Premises",
    "Paid Parking Off Premises",
    "Bbq Grill",
    "Elevator",
    "Oven",
    "Fire Extinguisher",
    "Pool",
    "Pets Allowed",
    "Hot Tub",
    "Refrigerator",
    "Private Entrance",
    "Patio Or Balcony",
    "Minus",
    "Plus"
]

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getLocations,
    getEmptyStay,
    addStayMsg,
    labels,
    amenities
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var stays = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    // }
    // if (filterBy.price) {
    //     stays = stays.filter(stay => stay.price <= filterBy.price)
    // }
    // return stays

}
function getById(stayId) {
    // return storageService.get(STORAGE_KEY, stayId)
    return httpService.get(`stay/${stayId}`)
}

function getLocations(q) {
    return httpService.get('stay/locations?q=' + q)
}

async function remove(stayId) {
    // await storageService.remove(STORAGE_KEY, stayId)
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        // savedStay = await storageService.put(STORAGE_KEY, stay)
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        // Later, owner is set by the backend
        // stay.owner = userService.getLoggedinUser()
        // savedStay = await storageService.post(STORAGE_KEY, stay)
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        name: 'House -' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}