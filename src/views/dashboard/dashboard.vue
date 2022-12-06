<template>
  <section class="dashboard">
    <aside class="side-nav">
      <ul class="clean-list">
        <router-link to="/dashboard/edit">
          <li>Create listing</li>
        </router-link>
        <router-link to="/dashboard/listings">
          <li>My listings</li>
        </router-link>
        <router-link to="/dashboard/reservation">
          <li>Reservations</li>
        </router-link>
      </ul>
    </aside>

    <section class="dashboard-content">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
export default {}
</script>