var colors = ['red', 'blue', 'orange', 'green', 'yellow'];
var app = new Vue({
    el: '#el',

    data: {
        lists: [
            {id: 0, title: '便签1', content: '内容1', top: 100, left: 10, theme: 'red'}
        ],
        moveEvent: {state: false, index: null, position: {}}
    },

    methods: {
        Addnote: function (e) {
            // if (this.lists.length) {
            //     var id = (this.lists[this.lists.length - 1]).id + 1;
            // } else {
            //     var id = 1;
            // }
            var id = (this.lists.length) ? (this.lists[this.lists.length - 1].id) + 1 : 1;
            this.lists.push({
                id: id,
                title: '便签' + (id + 1),
                content: '内容' + (id + 1),
                top: e.clientY - 25,
                left: e.clientX - 100,
                theme: colors[Math.floor(Math.random() * (colors.length))],
            });
            this.save();
        },
        md: function (i, e) {
            // console.log(e.offsetX, e.offsetY);
            this.moveEvent.index = i;
            this.moveEvent.position = {
                x: e.offsetX,
                y: e.offsetY
            };
            this.moveEvent.state = true;
        },
        mv: function (e) {
            if (this.moveEvent.state) {
                var top = e.clientY - this.moveEvent.position.y;
                var left = e.clientX - this.moveEvent.position.x;
                this.lists[this.moveEvent.index].top = top;
                this.lists[this.moveEvent.index].left = left;
                this.save();
            }
        },
        mu: function () {
            this.moveEvent.state = false;
        },

        save: function () {
            localStorage.lists = JSON.stringify(this.lists);
        }


    },

    mounted: function () {
        document.onkeyup = (function (e) {
            if (e.keyCode == 8 || e.keyCode == 46 && this.moveEvent.index != null) {
                this.lists.splice(this.moveEvent.index, 1);
                this.moveEvent.index = null;
            }
        }).bind(this);

        // document.onkeydown=function(e){
        //     alert(e.keyCode)    //测试键盘码
        // };

        if (localStorage.lists) {
            this.lists = JSON.parse(localStorage.lists);
        }
    }
});



// git init
// git add *
// git commit -m "one"
// git remote add origin https://github.com/liangxiangjun/lxj-note.git
// git push -u origin master


// 管理分支：
// git branch gh-pages新创建一个分支
// git checkout gh-pages切换到该分支
// git merge master
// git push --set-upstream origin gh-pages


// git checkout 'gh-pages'
// git add *
// git commit -m "two"
// git push