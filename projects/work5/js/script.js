// 地方
// 士大夫


// 获取元素
var getEle = function (element) {
    return document.querySelector(element);
}
var getAllElem = function (element) {
    return document.querySelectorAll(element);
}

//获取元素样式
var getClass = function (element) {
    return element.getAttribute('class');
}

//设置元素样式
var setClass = function (element, classval) {
    return element.setAttribute('class', classval);
}

//添加元素样式
var addClass = function (element, classval) {
    var baseclass = getClass(element);
    if (baseclass.indexOf(classval) === -1) {
        setClass(element, baseclass + ' ' + classval);
    }
    return;
}

//删除元素样式
var delClass = function (element, classval) {
    var baseclass = getClass(element);
    if (baseclass.indexOf(classval) != -1) {
        setClass(element, baseclass.split(classval).join(' ').replace(/\s+/g, ' '));
    }
    return;
}

// ？？？属性的英文句号能否省略
// 设置需要用到动画的元素
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

// 初始化样式，添加_animate_init样式
// screenAniEle已在上面定义
// 方法的参数ele是.header.screen_1.screen_2.screen_3.screen_4.screen_5
// screenAniEle[.screen_1]和screenAniEle[screen_1]都能获取.screen_1_title和.screen_1_subtitle
// 属性值加点是方便querySelector获取元素
// 先获取原class再修改追加_animate_init样式
function playInit(ele) {
    var aniEle = screenAniEle[ele];
    for (var i = 0; i < aniEle.length; i++) {
        var tempele = document.querySelector(aniEle[i]);
        var baseclass = tempele.getAttribute('class');
        tempele.setAttribute('class', baseclass + ' ' + aniEle[i].substr(1) + '_ani_init');
    }
}

// 动画开始->结束
// 同样获取属性值和原class
// 修改字符串即可改变样式
function playDone(ele) {
    var aniEle = screenAniEle[ele];
    for (var i = 0; i < aniEle.length; i++) {
        var tempele = document.querySelector(aniEle[i]);
        var baseclass = tempele.getAttribute('class');
        tempele.setAttribute('class', baseclass.replace('_ani_init', '_ani_done'));
    }
}
// 开始调用初始化init样式
// for跳过header和screen_1的循环主要控制其他屏的动画
// 配合下面定时器实现打开页面就自动开始header和screen_1的动画
for (x in screenAniEle) {
    if (x == '.header' || x == '.screen_1') {
        continue;
    }
    playInit(x);
}

// 设置定时器让header和第一屏的动画在页面加载完之后的100ms后完成
// 即页面打开瞬间header和第一屏就已完成动画
setTimeout(function () {
    playDone('.header');
    playDone('.screen_1');
}, 100);


var navTip = getEle('.header_nav_tip');
var navItems = getAllElem('.header_nav_item');
var slideItems = getAllElem('.slidebar_item');
// 点哪导航项激活哪导航项并让下划线跟随激活的导航项
// 方法接收一个索引index
// 当屏幕滚动达到一定高度就传入不同的index表示当前是第index屏
// 相应的导航项第index个就被激活
// navItems[index]就是选中的导航项
// 这样就能控住某一个导航项
// header_nav_item_active为导航项选中时的状态
// for遍历所有导航项清除激活状态和下划线
// for之外navItems[index]就能重设该导航项的样式
// 此时滑动门可用index加上固定值来实时变动左侧距离
// （不是鼠标滑入导航栏滑动门实时跟随鼠标）
// （是滑动屏幕显示到哪一屏滑动门自动跟随激活的导航项）
// 即实现了不用鼠标触发也能让滑动门实时跟随激活的导航项
// 激活侧边栏同理
function switchNavItemActive(index) {
    for (let i = 0; i < navItems.length; i++) {
        delClass(navItems[i], 'header_nav_item_active');
    }
    addClass(navItems[index], 'header_nav_item_active');
    navTip.style.left = index * 94 + 15 + 'px';


    for (let i = 0; i < slideItems.length; i++) {
        delClass(slideItems[i], 'slidebar_item_active');
    }
    addClass(slideItems[index], 'slidebar_item_active');
}
// 因为页面默认展示第一屏
// 所以调用该方法默认选中第一个导航项
switchNavItemActive(0);


// 导航栏滑动门
// 滑动门由专门的div设置样式而成
// for遍历所有导航项
// 方法接收索引index和导航项元素
// 鼠标滑入第index个导航项
// 滑动门就距离左边index * 94 + 15 + 'px'个像素
// 导航项宽64px单边padding15px
// 鼠标滑出第index个导航项就for遍历所有导航项
// 导航项中有激活属性的就记下这个导航项的索引activeIndex记下后终止循环
// for之外滑动门就距离左边activeIndex * 94 + 15 + 'px'个像素
// 例如导航项为3则滑动门距左为3此时滑动门就在此激活导航项之下
function setTip(index, ele) {
    ele[index].onmouseover = function () {
        navTip.style.left = index * 94 + 15 + 'px';
    }
    var activeIndex = 0;
    ele[index].onmouseout = function () {
        for (let i = 0; i < ele.length; i++) {
            if (getClass(ele[i]).indexOf('header_nav_item_active') > -1) {
                activeIndex = i;
                break;
            }
        }
        navTip.style.left = activeIndex * 94 + 15 + 'px';
    }
}
for (let i = 0; i < navItems.length; i++) {
    setTip(i, navItems);
}


// 设置屏幕滚动监听
// 到达某一高度就切换导航项并播放某屏动画
window.onscroll = function () {
    var top = document.documentElement.scrollTop;
    console.log(top);
    if (top >= 0) {
        playDone('.header');
        playDone('.screen_1');
        switchNavItemActive(0);
    }
    if (top > 560 * 1) {
        playDone('.screen_2');
        switchNavItemActive(1);
    }
    if (top > 560 * 2) {
        playDone('.screen_3');
        switchNavItemActive(2);
    }
    if (top > 560 * 3 + 80) {
        playDone('.screen_4');
        switchNavItemActive(3);
    }
    if (top > 560 * 4 + 160) {
        playDone('.screen_5');
        switchNavItemActive(4);
    }
}


// 点哪导航项跳到哪一屏
// 方法接收一个索引i和一个类型值val
// 下面的两个for遍历所有导航项
// navItems[i]即为第几个导航项
// 给导航项添加点击事件
// 点击第i个导航项
// 屏幕就向下滚动i*640个像素
function setNavJump(i, val) {
    var item = val[i];
    item.onclick = function () {
        document.documentElement.scrollTop = i * 640;
    }
}
// header导航绑定屏幕滚动
for (let i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems);
}
// slidebar侧边栏绑定屏幕滚动
for (let i = 0; i < slideItems.length; i++) {
    setNavJump(i, slideItems);
}