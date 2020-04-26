<template>
  <aside class="side-bar d-flex">
    <div class="content">
      <ManuscriptsSelector v-if="$store.state.general.side_section === 'manuscripts'" class="p-2" />
      <InfoTabs class="d-flex flex-column p-2" v-if="$store.state.general.side_section === 'help'" />
    </div>
    <div class="nav">
      <button
        :class="getNavItemClassName(item)"
        
        @click="setContent(item.name)"
        v-for="item in items"
        :key="item.id"
        :title="item.title"
      >{{item.representation}}</button>
    </div>
  </aside>
</template>
<script>
import ManuscriptsSelector from '~/components/ManuscriptsSelector'
import InfoTabs from '~/components/InfoTabs'
export default {
  data() {
    return {
      items: [
        { class:'fas fa-question-circle', representation: '', name: 'help', title:'Help' },
        { class:'fas fa-book', representation: '', name: 'manuscripts', title:'Manuscripts' }
      ]
    }
  },
  props: ['line'],
  components: { ManuscriptsSelector, InfoTabs },
  methods: {
    showManuscriptsSelector() {},
    getNavItemClassName(item){
      let className = `nav-item ${item.class}`;
      if(this.$store.state.general.side_section === item.name){
        className += ' active'
      }
      return className;
    },
    setContent(content) {
      let contentToSet = null
      if (this.$store.state.general.side_section !== content) {
        contentToSet = content
      }

      this.$store.dispatch('general/setSidebarContent', contentToSet)
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  overflow-y: auto;
}
.side-bar {
  @media (min-width: 960px) {
  max-width:30%;
}
  
  .nav {
    width:5.5rem;
    align-content: flex-start;
    background-color: #dee2e6;
    border-left: 1px solid #6c757d;
    border-right: 1px solid #6c757d;
    color: white;
    .nav-item {
      border: 1px solid transparent;
      border-radius: 0;
      margin: -1px -1px 5px;
      background-color: transparent;
      font-size: 30px;
      width:100%;
      padding:1rem;
      cursor: pointer;
      &:hover,
      &.active {
        color:#5871b9;
        outline:none;
      }
    }
  }
}
</style>