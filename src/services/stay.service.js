import { httpService } from './http.service.js'

const labels = [
    "National-parks",
    "Campers",
    "Surfing",
    "Amazing-views",
    "Beach",
    "Castles",
    "Islands",
    "Caves",
    "omg",
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

export const stayService = {
    query,
    getById,
    save,
    remove,
    getLocations,
    getEmptyStay,
    addStayMsg,
    getLikedStays,
    getListings,
    labels,
    amenities
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('stay', filterBy)
}
function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

function getLikedStays() {
    return httpService.get(`stay/liked`)
}

function getLocations(q) {
    return httpService.get('stay/locations?q=' + q)
}

function getListings() {
    return httpService.get('stay/listings')
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
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
        name: '',
        address: {
            city: '',
            country: '',
            street: '',
            location: {
                lat: 0,
                lan: 0
            }
        },
        imgUrls: [],
        capacity: 0,
        price: 0,
        roomType: '',
        summary: '',
        amenities: [],
        bathrooms: 0,
        bedrooms: 0,
        reviews: [],
        labels: []
    }
}