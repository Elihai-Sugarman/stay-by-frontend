<template>
    <GoogleMap
      api-key="AIzaSyCra0GSjxePg_5FSqOjkFeaqEpqrM0uONM"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="9"
    >
      <Marker :options="marker" @click="moveMap(marker.position)" />

    </GoogleMap>
  </template>
  
  <script>
  import { GoogleMap, Marker } from 'vue3-google-map'
  
  export default {
    name: 'stay-map',
    props: {
        location: Object
    },
    components: { GoogleMap, Marker },
    created() {
      console.log('location', this.location, 'marker', this.marker);
    },
    data() {
      return {
        center: { lat: this.location.lat, lng: this.location.lan },
        marker: [
          {
            title: 'Exact location provided after booking',
            label: 'You stay here',
            position: this.center,
          },
        ],
      }
    },
    methods: {
      moveMap(pos) {
        this.center = pos
        // GoogleMap.zoom = 12
      }
    }
  }
  </script>
  