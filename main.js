// register the grid component
Vue.component('demo-grid', {
    template: '#grid-template',
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  })
  
  // bootstrap the demo
  var demo = new Vue({
    el: '#demo',
    data: {
      power: '',
      rule: '',
      wepon:'',
      stage:'',
      result:'', 
      status: '成績を入力してください',
      searchQuery: '',
      gridColumns: ['ルール', 'ガチパワー', 'ブキ', 'ステージ', '勝敗'],
      gridData: [
        { 'ルール': 'ガチヤグラ', 'ガチパワー': 2020, 'ブキ': 'スクリュースロッシャー', 'ステージ':'ハコフグ倉庫',  '勝敗': 'WIN'},
        { 'ルール': 'ガチホコ', 'ガチパワー': 2050, 'ブキ': 'スクリュースロッシャーネオ', 'ステージ':'アロワナモール', '勝敗': 'LOSE' },
        { 'ルール': 'ガチアサリ', 'ガチパワー': 2100, 'ブキ': 'スクリュースロッシャーベッチュー', 'ステージ':'バッテラストリート', '勝敗': 'LOSE' },
        { 'ルール': 'ガチエリア', 'ガチパワー': 2000, 'ブキ': 'スクリュースロッシャー', 'ステージ':'海女美術大学', '勝敗': 'WIN' }
      ]
    },
    methods: {
      addResult: function() {
        if (this.rule && this.power && this.wepon && this.stage && this.result) {
          this.gridData.push({
            'ルール': this.rule,
            'ガチパワー': this.power,
            'ブキ': this.wepon,
            'ステージ': this.stage,
            '勝敗': this.result
          })
          this.rule = ''
          this.power = ''
          this.wepon = ''
          this.stage = ''
          this.result = ''
          this.status = '登録が完了しました。成績の入力を続けてください。'
        } else {
          this.status = '未入力の場所があります'
        }
      }
    }
  })