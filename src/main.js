const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node ,index )=> {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">
                    ${simplifyUrl(node.url)}
                </div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-shanchu3"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log('这里');
            e.stopPropagation() // 阻止冒泡
            console.log(hashMap);
            hashMap.splice(index,1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('你想添加啥?')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log('url: ', url);
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url
        });
        render()
    });
window.onbeforeunload = () => {
    console.log('页面要关闭了');
    const string = JSON.stringify(hashMap)
    console.log('hashMap: ', typeof hashMap);
    console.log('string: ', typeof string);
    localStorage.setItem('x', string) // 在本地设置一个x,他的值就是string
}
$(document).on('keypress',(e)=>{
    console.log(e.key);
    const {key}=e // 相当于const key=e.key
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})