
//初始化puppeteer
const puppeteer = require('puppeteer');
//fs用于创建json文件
const fs = require("fs");


//异步
(async () => {
    let resArr=[];
    let moonNum='';
    let pageNum='';
    let asd='01';
    let dayNum='';
    //puppeteer.launch()打开一个浏览器 浏览器的名字叫browser   
    //{headless:false}  puppeteer在默认情况下是无头模式，我们也看不见浏览器，所以我们使用headless:false 关闭无头模式，让我们能看见
  const browser = await puppeteer.launch({
      headless:false,
      defaultViewport:{height:920,width:1280}
    });
  //让browser.newPage()浏览器生成一个新的页面 这个新的页面叫page
  const page = await browser.newPage();
  for (let moon = 1; moon <= 12; moon++) {
    for (let pg = 1; pg <= 10; pg++) {
        pageNum=pg;
        
        if(moon<10){
            moonNum=`0${moon}`
        }else{
            moonNum=`${moon}`
        }

        switch(moon){
            case 1:dayNum='31'; break;
            case 2:dayNum='28'; break;
            case 3:dayNum='31'; break;
            case 4:dayNum='30'; break;
            case 5:dayNum='31'; break;
            case 6:dayNum='30'; break;
            case 7:dayNum='31'; break;
            case 8:dayNum='31'; break;
            case 9:dayNum='30'; break;
            case 10:dayNum='31'; break;
            case 11:dayNum='30'; break;
            case 12:dayNum='31'; break;
        }
       
  //page.goto让page跳转到bilibili页面
  await page.goto("https://www.bilibili.com/v/dance/otaku/?spm_id_from=333.5.b_7375626e6176.2#"+`/all/click/0/${pageNum}/2021-${moonNum}-01,2021-${moonNum}-${dayNum}`);

  await page.waitForSelector('#videolist_box > div.vd-list-cnt > ul > li> div > div.l > div > a > div > div.lazy-img > img');

//   let titleList=await page.$$('#videolist_box > div.vd-list-cnt > ul > li > div > div.r > a')

//   let tiles=titleList.map((item,index)=>{
//        return item.innerHTML
//     })


    //按100下下键
    for(var i =0;i<100;i++){
        await page.keyboard.press('ArrowDown');

    }
    await page.waitFor(3000);

       //按100下下键
       for(var i =0;i<100;i++){
        await page.keyboard.press('ArrowUp');

    }
    // //等待3s，此处是让懒加载的图片能加载出来，太快了，就是懒加载的地址了
    await page.waitFor(2000);

    //$$eval('select',function(any))
    //$$eval函数首先会执行$$('select') 然后把值返还给 function里面 也就是any，
    //所以我们一定要使用any，返回的数据是数组对象，我们需要把他遍历成单个对象，然后从单个对象中获取数据
     let resList= await page.$$eval(
      '#videolist_box > div.vd-list-cnt > ul > li> div > div.l > div > a > div > div.lazy-img > img',
     (ResObj)=>ResObj.map((res)=>{
        let resArray = res.src.split("@")
        resArray.pop()
        let resSrc = resArray.toString()
        let Obj={};
        Obj['videoTitle']=res.alt
        Obj['imgURL']=resSrc
    
        return Obj
    })
      );

  console.log(resList)

     resArr=resArr.concat(resList);
    
    }
}
    // console.log(resArr)
//   //page.screenshow 截图， path:'exampla.png' 会在当前目录下保存截图，存储为example.png
//   await page.screenshot({ path: 'bilibili.png' });
//   //关闭浏览器
//   await browser.close();
//JSON.stringify(data,replace,space) data里面放的就是数据，replace就给null就完事了,space=缩进，但是填换行符也行的
//fs.writeFile(文件名，数据，函数)
    fs.writeFile("data.json",JSON.stringify(resArr,null,"\t"),function(err){
        if(err){
            console.log(err);
        }
        console.log("传输完毕")
    })

})();
