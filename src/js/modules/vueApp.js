// This is an examples of simple export.
//
// You can remove or add your own function in this file.

import data from './data';

const vueApp = () => {
  if (Vue) {
    new Vue({
      el: '#app',
      template: `<div class="object-card-wrapper"><div class="object-card" v-for="object in list">
        <img :src="object.imgUrl">
        <p class="object-card__title">{{object.title}}</p>
      </div></div>`,
      data() {
        return {
          initMessage: 'VueJS Sucessfully Started',
          objects: [],
        };
      },
      mounted() {
        this.objects = data;
      },
      computed: {
        list() {
          return this.objects.filter((item) => item.status === 'published' )
        }
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
