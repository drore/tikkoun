<template>
  <div id="map-wrap">
    <div class="lds-dual-ring" v-if="loading"></div>
    <div id="seadragon-viewer" style></div>
  </div>
</template>
<style lang="scss">
#seadragon-viewer {
  @media (min-width: 960px) {
    height: 100%;
  }
  width: 100%;
  height: 50rem;
}
#map-wrap {
  @media (min-width: 960px) {
    height: 100%;
  }
  height: 50rem;
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.highlight {
  background-color: rgba(255, 0, 0, 0.2);
  border: 1px solid #888;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid green;
  border-color: green transparent green transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
import axios from 'axios'
import OpenSeadragon from 'openseadragon'
export default {
  data() {
    return {
      viewer: null,
      loading: true
    }
  },
  computed: {
    line() {
      return this.$store.state.transcribe.selected_line
    }
  },
  watch: {
    // whenever question changes, this function will run
    line: async function(res) {
      if (res) {
        this.loading = true
        const manuscript = this.$store.state.transcribe.manuscript

        // Now let's do this!
        let img_file_name = res.color_img_file_name || res.iiif_url
        let color_img_file_name
        let fullPageImgSrc = img_file_name

        // Now the full image
        if (!res.iiif_url) {
          // For geneva, strip the file extension
          if (img_file_name.indexOf('.jpg') != -1) {
            color_img_file_name = img_file_name.split('.jpg')[0]
          } else {
            color_img_file_name = img_file_name
          }
          const baseURL = this.$store.state.transcribe.manuscript.base_url
          fullPageImgSrc = `${baseURL}${color_img_file_name}.${
            this.$store.state.transcribe.manuscript.image_extension
          }/info.json`
        }

        const iiif_json = await axios.get(fullPageImgSrc)
        const iiif_data = iiif_json.data
        const factor = iiif_data.width

        // Fix for current cantalope implementation
        iiif_data['@id'] = iiif_data['@id'].replace(':8080', '')
        iiif_data['@id'] = iiif_data['@id'].replace('-4.0.3', '')
        iiif_data['@id'] = iiif_data['@id'].replace('http://', 'https://')

        if (this.viewer) {
          this.viewer.destroy()
        }

        this.viewer = OpenSeadragon({
          id: 'seadragon-viewer',
          tileSources: [iiif_json.data],
          overlays: [
            {
              id: 'overlay',
              x: res.left_on_page / factor,
              y: res.top_on_page / factor,
              width: res.right_on_page / factor - res.left_on_page / factor,
              height: res.bottom_on_page / factor - res.top_on_page / factor,
              className: 'highlight'
            }
          ]
        })

        this.loading = false
      }
    }
  }
}
</script>
