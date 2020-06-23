// 通过设置鼠标点击事件，点击某一块，则初始化此块动画
// 再点击则播放动画（开始->结束）
// 设置bool判断是否初始化、是否已播放动画


// 获取所有用到动画的元素，设置为对象
// 对象里面的属性值是真正用到动画的元素
// 可用forin访问对象属性值
// 对象属性值中要包含英文句号，以便querySelector能获取到元素
var screenAniEle = {
    '.header': [
        '.header',
    ],
    '.screen_1': [
        '.screen_1_title',
        '.screen_1_subtitle',
    ],
    '.screen_2': [
        '.screen_2_title',
        '.screen_2_subtitle',
        '.wordline',
        '.man',
        '.rocket',
    ],
    '.screen_3': [
        '.screen_3_title',
        '.screen_3_subtitle',
        '.wordline_3',
        '.desc_img',
        '.courses',
        '.courses_item1',
        '.courses_item2',
        '.courses_item3',
        '.courses_item4',
        '.courses_item5',
    ],
    '.screen_4': [
        '.screen_4_title',
        '.screen_4_subtitle',
        '.wordline_4',
        '.screen_4_items',
    ],
    '.screen_5': [
        '.screen_5_title',
        '.screen_5_subtitle',
        '.wordline_5',
        '.screen_5_bg',
    ],
}

function setAnimate(ele) {
    var screen = document.querySelector(ele);
    var aniEle = screenAniEle[ele];
    var isanidone = false,
        isinit = false;
    screen.onclick = function () {
        if (isinit === false) {
            for (var i = 0; i < aniEle.length; i++) {
                var tempele = document.querySelector(aniEle[i]);
                var baseclass = tempele.getAttribute('class');
                tempele.setAttribute('class', baseclass + ' ' + aniEle[i].substr(1) + '_ani_init');
            }
            isinit = true;
            return ;
        }
        if (isanidone === false) {
            for (var i = 0; i < aniEle.length; i++) {
                var tempele = document.querySelector(aniEle[i]);
                var baseclass = tempele.getAttribute('class');
                tempele.setAttribute('class', baseclass.replace('_ani_init','_ani_done'));
            }
            isanidone = true;
            return ;
        }
        if (isanidone === true) {
            for (var i = 0; i < aniEle.length; i++) {
                var tempele = document.querySelector(aniEle[i]);
                var baseclass = tempele.getAttribute('class');
                tempele.setAttribute('class', baseclass.replace('_ani_done','_ani_init'));
            }
            isanidone = false;
            return ;
        }
    }
}
for (x in screenAniEle) {
    setAnimate(x);
}