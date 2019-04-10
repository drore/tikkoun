<template>
  <div class="row">
    <div class="sidebar col-3">
      <div class="accordion" id="sidebarAccordion">
        
        <!-- <div class="card">
          <div class="card-header" id="utilitiesHeading">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target="#utilities"
                aria-expanded="true"
                aria-controls="utilities"
              >{{$t('utilities')}}</button>
            </h5>
          </div>

          <div
            id="utilities"
            class="collapse"
            aria-labelledby="utilitiesHeading"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
        <a href="javascript:;" @click="tsvJSON">{{$t('tsv_to_json')}}</a>
        <a href="javascript:;" @click="loadIntoFB">Load into firebase</a>
              <hr>
            </div>
          </div>
        </div>-->
        <div class="card">
          <div class="card-header" id="headingThree">
            <h5 class="mb-0">
              <button
                class="btn btn-link collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >{{$t('manuscript.content')}}</button>
            </h5>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#sidebarAccordion"
          >
            <div class="card-body">
              <a href="javascript:;" @click="getManuscriptContent">{{$t('get_manuscript_content')}}</a>
              <hr>
              <select name="langs" v-model="lang" @change="getManuscriptContent">
                <option
                  :value="locale.iso"
                  v-for="locale in this.$i18n.locales"
                  :key="locale.code"
                >{{ $t(`lang.${locale.code}`) }}</option>
              </select>
              <a href="javascript:;" @click="addMSContentItem">{{$t('add')}}</a>
              <div v-if="manuscript_content">
                <hr>
                <ul class="manuscript_content_tokens">
                  <li
                    v-for="(contentItem,i) in manuscript_content" :key="i"
                    @click="editMSContentItem(contentItem)"
                  >{{contentItem.token}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content col-9">
      <div class="p-2">
        <!-- <div class="edit-content" v-if="contentItem">
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="contentItem.lang">
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="contentItem.token">
            </label>
          </div>
          <div class="field">
            <label for="value">
              Content: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>)
              <wysiwyg v-model="contentItem.value" v-if="showWysiwyg"/>
              <textarea
                v-model="contentItem.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>
          <a href="javascript:;" @click="updateContentItem">{{$t('update')}}</a>
        </div> -->
        <div class="edit-manuscript-content" v-if="msContentItem">
          
          <div class="field">
            <label for="value">
              Manuscript:
              <input type="text" v-model="msContentItem.manuscript">
            </label>
          </div>
          <div class="field">
            <label for="lang">
              Lang:
              <input type="text" v-model="msContentItem.lang">
            </label>
          </div>
          <div class="field">
            <label for="token">
              Token:
              <input type="text" v-model="msContentItem.token">
            </label>
          </div>
          <div class="field">
            <label for="value">
              Content: (
              <a href="javascript:;" @click="showWysiwyg = !showWysiwyg">Html / Wysiwyg</a>) -- <a href="javascript:;" @click="updateMSContentItem">{{$t('update')}}</a>
              <wysiwyg v-model="msContentItem.value" v-if="showWysiwyg"/>
              <textarea
                v-model="msContentItem.value"
                v-if="!showWysiwyg"
                style="width:100%;min-height:400px;"
              ></textarea>
            </label>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api.js'
import axios from 'axios'
import { ServerTimestamp, StoreDB, auth } from '~/plugins/firebase.js'
import manuscriptsManager from '~/manuscriptsManager'
export default {
  data() {
    return {
      contentItem: null,
      msContentItem: null,
      translation: null,
      lang: 'en-US',
      manuscript: 'bnf150',
      showWysiwyg: true
    }
  },
  computed: {
    manuscript_content() {
      const unsorted = Object.assign({},this.$store.state.content.manuscript_content)
      if (unsorted && unsorted.length) {
        return unsorted.sort((a, b) => {
          const textA = a.token.toUpperCase()
          const textB = b.token.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }
      return unsorted
    }
  },
  methods: {
    // Manuscript content
    getManuscriptContent() {
      this.showWysiwyg = true
      this.$store.dispatch('content/getManuscriptContent', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },

    //var tsv is the TSV file with headers
    //async loadIntoFB() {
    // const users = await axios.get(`/users.json`)
    // let obj = {}
    // let user = null
    // for (let i = 180; i < users.data.length; i++) {
    //   console.log(i)
    //   user = users.data[i]

    //   obj = {
    //     userid: user.userid,
    //     email: user.email,
    //     age: user.age,
    //     hebrewknowledge: user.hebrewknowledge,
    //     midrashknowledge: user.midrashknowledge,
    //     registered: new Date(user.registered),
    //     contact_allowed: user.contact_allowed,
    //     createdAt: ServerTimestamp()
    //   }
    //   if (!user.email) {
    //     if (user.userid) {
    //       user.email = user.userid + '@tikkoun.com'
    //     }
    //   }

    //   if (user.email) {
    //     const created = await api.createUser({
    //       email: user.email,
    //       password: '123456'
    //     })

    //     if (created) {
    //       await StoreDB.collection('users')
    //         .doc(created.user.uid)
    //         .set(obj, { merge: true })
    //     } else {
    //       //console.warn(obj)
    //     }
    //   }
    // }

    //   manuscriptsManager.getManuscriptJSON('bnf_150').then(res => {
    //     return false
    //     const json = res.data
    //     let obj = {}
    //     let itemProps = {}
    //     let filename = ''
    //     let item = {}
    //     for (let i = 10; i < json.length; i++) {
    //       item = json[i]

    //         obj = { views: 0, transcriptions: 0, general_index: i }
    //         Object.keys(item).forEach(key => {
    //           if (key) {
    //             itemProps[key] = item[key]
    //           }
    //         })

    //         filename = itemProps.color_img_file_name.split('.png')[0]
    //         filename = `bnf150_${filename.split('__')[1]}`

    //         obj.lineId = +itemProps.lineID
    //         obj.page = +itemProps.page
    //         obj.line = +itemProps.newLineNuAlan
    //         obj.top_on_page = +itemProps.top_on_page
    //         obj.bottom_on_page = +itemProps.bottom_on_page
    //         obj.left_on_page = +itemProps.left_on_page
    //         obj.right_on_page = +itemProps.right_on_page
    //         obj.AT = itemProps.AT
    //         obj.GT02 = itemProps.GT2
    //         obj.color_img_file_name = filename

    //         StoreDB.collection('manuscripts/KVqHkylpQFUvkQlQrP9U/lines').add(
    //           obj
    //         )

    //     }
    //   })
    // },

    //async tsvJSON() {
    // const tsv = await manuscriptsManager.getManuscriptTSV('BNF150_all_data_for_alan')
    // debugger
    // if(tsv){
    //   const lines = tsv.split('\n')
    // const result = []
    // const headers = lines[0].split('\t')
    // for (var i = 1; i < lines.length; i++) {
    //     const obj = {}
    //     const currentline = lines[i].split('\t')
    //     for (var j = 0; j < headers.length; j++) {
    //       obj[headers[j]] = currentline[j]
    //     }
    //     result.push(obj)
    //     }
    //  debugger
    //  //return result; //JavaScript object
    //   return JSON.stringify(result) //JSON
    // }
    //},
    updateMSContentItem() {
      this.$store.dispatch('content/updateMSContentItem', this.msContentItem)
    },
    addMSContentItem() {
      this.$store.dispatch('content/addMSContentItem', {
        lang: this.lang,
        manuscript: this.manuscript
      })
    },
    editMSContentItem(msContentItem) {
      this.msContentItem = Object.assign({},msContentItem)
    },
  }
}
</script>
<style scoped lang="scss">
.translation_tokens {
  list-style: none;
  padding: 0;
  max-height: 500px;
  overflow-y: auto;
  li {
  }
}
</style>
