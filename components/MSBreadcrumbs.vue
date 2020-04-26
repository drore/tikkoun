<template>
  <div class="breadcrumbs">
    <span><a href="javascript:;" @click="toggleManuscriptsSelector">{{$t('manuscripts')}}</a></span> / 
    <span v-if="$store.state.transcribe.manuscript" >{{$store.state.transcribe.manuscript.official_name}} / </span>
    <span v-if="!$store.state.transcribe.selected_line">{{$t('loading')}}</span> 
    <span v-if="$store.state.transcribe.selected_line">{{$t('page')}} {{$store.state.transcribe.selected_line.page}} / </span> 
    <span v-if="$store.state.transcribe.selected_line">{{$t('line')}} {{$store.state.transcribe.selected_line.line}}</span>
  </div>
</template>
<script>
export default {
  methods:{
    toggleManuscriptsSelector() {
      this.$store.dispatch('general/setSidebarContent','manuscripts')
    },
  }
}
</script>
<style lang="scss">
.breadcrumbs{
  padding:0.5rem 1.5rem;
  background-color:#777;
  color:white;
  span{
    a{
      color:white;
    }
  }
}
</style>
