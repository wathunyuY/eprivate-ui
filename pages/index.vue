<template>
  <div id="home">
    <!-- <articles>
      <banner />
    </articles> -->

    <!-- <about /> -->

    <!-- <subscribe /> -->

    <!-- <social /> -->
    <Search />
  </div>
</template>

<script>
  export default {
    head:{
        title:'ค้นหาข้อมูล'
    },
    name: 'Home',
    middleware:'authenticated',
    components: {
      About: () => import('@/components/home/About'),
      Articles: () => import('@/components/home/Articles'),
      Banner: () => import('@/components/home/Banner'),
      Social: () => import('@/components/home/Social'),
      Subscribe: () => import('@/components/home/Subscribe'),
      Search: () => import('@/components/home/Search')
    }
  }
</script>
