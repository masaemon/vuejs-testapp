var app = new Vue({
    el: '#app',
    data: {
        message: 'ここの文字が同期するよ。',
        wepon: '',
        lists: [
            'スプラシューター',
            'スプラローラー',
            'スプラチャージャー',
        ]
    },
    methods: {
        addWepon: function() {
            this.lists.push(this.wepon);
            this.wepon = '';
        }
    }
})