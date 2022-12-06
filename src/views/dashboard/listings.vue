<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ tableData.length }} Listing<span v-if="(tableData.length>1)">s</span></div>
      <router-link to="/dashboard/stay/edit">
        <el-button plain><icon-cmp icon-type="plus" /> Create listing</el-button>
      </router-link>
    </div>

    <el-table :data="tableData">

      <el-table-column label="LISTING" min-width="250" fixed>
        <template #default="scope">
          <router-link :to="('/stay/' + scope.row._id)">
            <div class="listing-preview">
              <img :src="scope.row.imgUrls[0]" alt="listing preview">
              <h3 class="listing-name">{{ scope.row.name }}</h3>
            </div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="TODO">
        <template #default="scope">
          <router-link :to="('/dashboard/stay/edit/' + scope.row._id)">
            <el-button plain>Update</el-button>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="capacity" label="CAPACITY" min-width="120" align="center" sortable />

      <el-table-column prop="bathrooms" label="ROOMS" align="center" sortable />
      
      <el-table-column prop="bedrooms" label="BEDROOMS" min-width="140" align="center" sortable />

      <el-table-column prop="price" :formatter="formatCurrency" label="PRICE" sortable />

      <el-table-column :formatter="formatLocation" label="LOCATION" align="center" />      

      <el-table-column prop="createdAt" min-width="150" label="DATE ADDED" />
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadStays' })
    .then(() => this.loadListingsData())
    
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    }
  },
  methods: {
    loadListingsData() {
      const data = this.stays.filter(stay => stay.host._id === this.user._id)
      this.tableData = data
    },
    formatLocation({ address }) {
      return [address.city, address.country].filter(_ => _).join(', ')
    },
    formatCurrency({ price }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>