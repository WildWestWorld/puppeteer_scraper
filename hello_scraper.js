
//初始化puppeteer
const puppeteer = require('puppeteer');



//异步
(async () => {
    //puppeteer.launch()打开一个浏览器 浏览器的名字叫browser   
    //{headless:false}  puppeteer在默认情况下是无头模式，我们也看不见浏览器，所以我们使用headless:false 关闭无头模式，让我们能看见
  const browser = await puppeteer.launch({
      headless:false,
      defaultViewport:{height:920,width:1280}
    });
  //让browser.newPage()浏览器生成一个新的页面 这个新的页面叫page
  const page = await browser.newPage();
  //page.goto让page跳转到https://example.com页面
  await page.goto('https://www.bilibili.com');
  //page.screenshow 截图， path:'exampla.png' 会在当前目录下保存截图，存储为example.png
  await page.screenshot({ path: 'bilibili.png' });
//   //关闭浏览器
//   await browser.close();
})();