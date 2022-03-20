<template>
  <nav>
    <ul class="pagination justify-content-center" v-if="pagination && pagination.total_pages && pagination.total_pages > 1">
      <li class="page-item" :class="{'disabled': pagination.current_page === 1}">
        <a class="page-link" href="" rel="prev" v-on:click.prevent="changePage(pagination.current_page - 1)">&laquo;</a>
      </li>

      <template v-for="link in links">
        <li class="page-item disabled" v-if="link === '...'">
          <a class="page-link" href="" ><span>...</span></a>
        </li>
        <li class="page-item" :class="{'active': link === pagination.current_page}" v-else><a class="page-link" href="" v-on:click.prevent="changePage(link)">{{ link }}</a></li>
      </template>

      <li class="page-item" :class="{'disabled': pagination.current_page >= pagination.total_pages}" >
        <a class="page-link" href="" rel="next" v-on:click.prevent="changePage(pagination.current_page + 1)">&raquo;</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Paginator',

  props: {
    pagination: {
      required: true
    }
  },

  data() {
    return {};
  },

  computed: {
    links() {
      let pages = [1];
      let middle = [];

      for (let i = (this.pagination.current_page - 4 < 2 ? 2 : this.pagination.current_page - 3);
           i < (this.pagination.current_page + 4 > this.pagination.total_pages ? this.pagination.total_pages : this.pagination.current_page + 4);
           i++) {
        middle.push(i);
      }

      if (middle.length > 0) {
        if (middle[0] - 1 > 1)
          middle[0] = '...';

        if (middle[middle.length - 1] + 1 < this.pagination.total_pages)
          middle[middle.length - 1] = '...';

        middle.forEach(val => {
          pages.push(val);
        });
      }

      pages.push(this.pagination.total_pages);

      return pages;
    }
  },

  methods: {
    changePage(page) {
      this.$emit('change-page', {perPage: this.pagination.per_page, page: page});
    }
  }
}
</script>
