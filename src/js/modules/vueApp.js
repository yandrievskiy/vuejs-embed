// This is an examples of simple export.
//
// You can remove or add your own function in this file.

import data from './data';

const vueApp = () => {

  VeeValidate.extend('search', {
    validate: value => {
      const regex = new RegExp(`^[A-Za-z0-9?!.,"'\\s]*$`);
      return regex.test(value);
    },
    message: 'This is not the magic word'
  });


  Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

  if (Vue) {
    new Vue({
      el: '#app',
      template: `
      <div class="app-wrapper">
        <div class="filters">
          <form @submit="handleSubmit">
            <div class="filters__wrapper">
              <validation-provider ref="observer" v-slot="{ errors }" rules='search'>
                <div class="form-input">
                  <input type="text" name="search" v-model="search">
                  <span class="error">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <select name="userId" v-model="selected">
                <option v-for="author in authors">{{ author }}</option>
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div class="object-card-wrapper"><div class="object-card" v-for="object in filteredList">
          <img :src="object.imgUrl">
          <p class="object-card__title">{{object.title}}</p>
        </div>
        </div>
      </div>`,

      data() {
        return {
          initMessage: 'VueJS Sucessfully Started',
          objects: [],
          selected: '',
          search: '',
          filter: {},
        };
      },

      mounted() {
        this.objects = data;
        this.handleUrlParams();
        this.selected = this.filter.get('userId');
        this.search = this.filter.get('search') ? this.filter.get('search') : '';
      },

      methods: {

        handleUrlParams() {
          this.filter = new URLSearchParams(window.location.search);
        },

        handleSearch(item) {
          return item.title.indexOf(this.filter.get('search')) !== -1;
        },

        handleSubmit(e) {
          if (this.$refs.observer.errors.length) {
            e.preventDefault();
          }
        },

        objectMatchesFilters(item) {
          const paramsMatchFilters = [];

          for (const filter of Array.from(this.filter)) {
            const filterKey = filter[0];
            const filterValue = filter[1];

            if (filterKey !== 'search' && item[filterKey].toString() === filterValue) {
              paramsMatchFilters.push(filterKey);
            }

            if (filterKey === 'search' && this.handleSearch(item)) {
              paramsMatchFilters.push(filterKey);
            }
          }

          if (paramsMatchFilters.length === Array.from(this.filter).length) {
            return true;
          }

          return false;
        },
      },
      computed: {

        list() {
          return this.objects.filter((item) => item.status === 'published');
        },

        filteredList() {
          return this.list.filter((item) => this.objectMatchesFilters(item));
        },

        authors() {
          const authors = [];
          this.objects.map((item) => {
            if (!authors.includes(item.userId)) {
              authors.push(item.userId);
            }
            return true;
          });
          return authors;
        },
      },
    });
  }
};

const init = () => {
  vueApp();
};

export default init;
