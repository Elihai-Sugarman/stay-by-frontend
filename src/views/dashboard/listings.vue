<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ tableData.length }} Listing<span v-if="(tableData.length>1)">s</span></div>
      <el-button plain><icon-cmp icon-type="plus" /> Create listing</el-button>
    </div>
    <el-table :data="tableData" align="center">

      <el-table-column label="LISTING" min-width="250" align="center">
        <template #default="scope">
          <div class="listing-preview">
            <img :src="scope.row.imgUrls[0]" alt="listing preview">
            <h4 class="listing-name">{{ scope.row.name }}</h4>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="capacity" label="CAPACITY" align="center" sortable min-width="100"/>
      
      <el-table-column prop="bedrooms" label="ROOMS" align="center" sortable min-width="100"/>
      
      <el-table-column prop="bathrooms" label="BATHS" align="center" sortable />
      
      <el-table-column prop="price" :formatter="formatCurrency" label="PRICE" sortable min-width="100"/>
      
      <el-table-column :formatter="formatLocation" label="LOCATION" align="center" min-width="150"/>      
      
      <el-table-column prop="createdAt" label="DATE ADDED"  min-width="100"/>

      <el-table-column label="TODO" min-width="100" align="center">
        <template #default>
          <el-button plain>Update</el-button>
        </template>
      </el-table-column>
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
      return `${address.city}, ${address.country}`
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