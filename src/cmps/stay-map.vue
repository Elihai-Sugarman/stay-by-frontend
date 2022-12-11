<template>
    <GoogleMap
      api-key="AIzaSyCra0GSjxePg_5FSqOjkFeaqEpqrM0uONM"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="16"
      ref="googleMap"
      language="en">
      <Marker :options="marker" />

    </GoogleMap>
  </template>
  
  <script>
  import { GoogleMap, Marker } from 'vue3-google-map'
  
  export default {
    name: 'stay-map',
    props: { location: Object },
    components: { GoogleMap, Marker },
    data() {
      return {
        // the coordinates are backwards in the database provided by CODING ACADEMY, hence switching lat and lan here
        center: { lat: this.location.lan, lng: this.location.lat },
        marker: {
          position: { lat: this.location.lan, lng: this.location.lat },
        },
      }
    }
  }
  </script>
  