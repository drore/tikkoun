<template>
  <div id="map"></div>
</template>
<script>
export default {
  data() {
    return {
      map: null
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-draw@0.4.10/dist/leaflet.draw.css'
        }
      ]
    }
  },
  computed: {
    line() {
      return this.$store.state.transcribe.selected_line
    }
  },
  mounted() {
    // get line
    const self = this

    const L = window.L

    this.map = L.map('map', {
      center: [0, 0],
      minZoom: 0,
      zoom: 0,
      zoomSnap: 0,
      zoomDelta: 0.25,
      crs: L.CRS.Simple,
      dragging: !L.Browser.mobile
    })

    this.map.attributionControl.setPrefix('')
    this.map.attributionControl.addAttribution(
      self.$store.state.transcribe.manuscript.attribution
    )
  },
  watch: {
    // whenever question changes, this function will run
    line: function(res) {
      if (res) {
        const self = this
        const L = window.L

        // Clear map
        this.map.eachLayer(function(layer) {
          self.map.removeLayer(layer)
        })

        const manuscript = this.$store.state.transcribe.manuscript
        
        // No let's do this!
        const top = res.top_on_page + (manuscript.top_buffer || 0);
        const bottom = res.bottom_on_page+ (manuscript.top_buffer || 0);
        const left = res.left_on_page+ (manuscript.left_buffer || 0);
        const right = res.right_on_page+ (manuscript.left_buffer || 0);

        const height = bottom - top
        const width = right - left

        // For geneva, strip the file extension
        let color_img_file_name
        if (res.color_img_file_name.indexOf('.jpg') != -1) {
          color_img_file_name = res.color_img_file_name.split('.jpg')[0]
        } else {
          color_img_file_name = res.color_img_file_name
        }

        // Now the full image
        const baseURL = this.$store.state.transcribe.manuscript.base_url
        const fullPageImgSrc = `${baseURL}${color_img_file_name}.${
          this.$store.state.transcribe.manuscript.image_extension
        }/info.json`

        const pageTileLayer = L.tileLayer.iiif(fullPageImgSrc)
        // TODO: move to store? is this MS specific?
        const factor = this.$store.state.transcribe.manuscript.factor
        const imageLayer = pageTileLayer.addTo(this.map)

        const linePolygonLayer = L.polygon(
          [
            [-top / factor, left / factor], // top_left
            [-top / factor, right / factor], // top_right
            [-bottom / factor, right / factor], // bottom_right
            [-bottom / factor, left / factor] // bottom_left
          ],
          {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.1,
            weight: 1
          }
        ).addTo(this.map)
      }
    }
  }
}
</script>
<style scoped lang="scss">
#map {
  min-height: 500px;
  height: 35vw;
  border-radius: 10px;
  background-color: black;
}
</style>


