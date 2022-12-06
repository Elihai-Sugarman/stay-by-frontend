<template>
  <section class="dashboard">
    <section class="dashboard-nav">
      <ul class="clean-list">
        <router-link to="/dashboard/stay/edit">
          <li>Create listing</li>
        </router-link>
        <router-link to="/dashboard/listings">
          <li>Listings</li>
        </router-link>
        <router-link to="/dashboard/reservation">
          <li>Reservations</li>
        </router-link>
      </ul>
    </section>

    <section class="dashboard-content">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
export default {}
</script>