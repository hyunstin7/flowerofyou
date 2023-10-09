$(document).ready(function(){
let windowInnerHeight = $(window).innerHeight();
let windowInnerWidth = $(window).innerWidth();

  // ----------------c1-middle Height ----------//
  if($(window).innerWidth() <= 768){
    $(".c1-middle").css("height",`${$(".p-c1").innerHeight()*1.8}px`)
  }else{
    $(".c1-middle").css("height",`${$(".p-c1").innerHeight()}px`)
  }

  let cost=0;
  console.log(cost)
  let scrollY = 0;
    $(window).scroll(function(){
    scrollY = $(window).scrollTop();
    if(scrollY>0){
        $('header').css("background-color","#fff")
        $('header').css("border-bottom","solid 1px #00000000")

    } else {
        $('header').css("background-color","transparent")
        $('header').css("border-bottom","solid 1px #000")

    }

    //  ---------cost 이벤트 ------------//
    if($('#menual-2').offset().top  <= scrollY){
      $('.cost-bar').each((i,a)=>{
          cost = $(a).attr("data-cost");
          $(a).css("transition",`all ${cost * 5 / 5.2 /2}ms linear`)
          $(a).css("width",`calc(${cost} / 5200 * 80%)`)
          $(a).children('p').css("left",`calc(100% + 15px)`)
          let m2bottomWidth =$('.m2-bottom').innerWidth()*0.8
        let counter = setInterval(()=>{
          $(a).children('p').children('span').html(parseInt(($(a).innerWidth() / m2bottomWidth) * 5200)+1);

        },1) 
        setTimeout(()=>{
          clearInterval(counter)
        },5000)         

          
      })
      
    } 
    else {
    $('.cost-bar').each((i,a)=>{
      cost = $(a).attr("data-cost");
      $(a).css("transition",`none`)
      $(a).css("width",0)
    })
    }
//-----------------Product 이벤트-----------------------//
let productsRatio = (scrollY  - ($('#products').offset().top + $('#products').offset().top - $('.product-wrap').offset().top + ($('.p-slide').offset().top - $('.product-wrap').offset().top - (($(window).innerHeight() - $('.p-slide').innerHeight())/2))))/ ($('#products').innerHeight()-100); 
productsRatio > 1 ? productsRatio = 1 : productsRatio = productsRatio
 
if(windowInnerWidth <=768){
  $('.p-sliders').css("transform",`translate(-${($('.p-sliders').width()- $('.p-slide').width()*2)*productsRatio}px,-50%)`)
 }else{
   $('.p-sliders').css("transform",`translate(-${($('.p-sliders').width()- $('.p-sliders img').eq(0).width()*2)*productsRatio}px,-50%)`)
 }

})



 



 window.onload = function() {
    // ----------------product-Height ----------//
    $('.p1-sliders').css("width",`${($('.p-sliders img').eq(0).width() +40 ) *8}px`)
    $('#products').css("height",`${$('.p-sliders').width() + windowInnerHeight}px`);
    console.log(($('.p-sliders img').eq(0).width() +40 ) *8)
    if(windowInnerWidth <= 768){
      $('.product-wrap').css("top",`-${$('.p-slide').offset().top - $('.product-wrap').offset().top - ((windowInnerHeight - $('.p-slide').innerHeight())/2) -50}px`)
    }else{
      $('.product-wrap').css("top",`${$('.p-slide').offset().top - $('.product-wrap').offset().top - (($('.product-wrap').height() - $('.p-slide').innerHeight())/2)}px`)
    }

    //----- m1 초기 변수값---- //
    let [currentIdx,translate,x1,X,X2,t,k] =[0,0,0,0,0,0,0]  
    const delay = 500;

    // --------m1 초기css값지정----------//
    const m1Slider = $('.m1-sliders');
    const m1Sliderimg = $('.m1-sliders img')
    const ImgWidth = m1Sliderimg[0].clientWidth;
    const ImgHeight = m1Sliderimg[0].clientHeight;
    const m1SliderWidth = ImgWidth * m1Sliderimg.length;
    
    $('.m1-slide').css("height",`${ImgHeight}px`)
    m1Slider.css("width",`${m1SliderWidth}px`); 

   
 

    //---------- m1 자동슬라이드 함수 -----------//
    
      console.log(ImgWidth)
    

    function move(D) {
      currentIdx += (-1 * D);
      translate = -ImgWidth * currentIdx;
      k = -ImgWidth * currentIdx;
      t = -ImgWidth * currentIdx;
      m1Slider.css("transition", `all ${delay}ms ease`);
      m1Slider.css("transform",`translateX(${translate}px)`); 
    }
    function sliding() {
      move(-1);

      if (currentIdx >= 5){
          setTimeout(() => {
            m1Slider.css("transition","none");
            translate = -currentIdx*ImgWidth;
            m1Slider.css("transform",`translateX(0px)`);
            currentIdx = 0;
            translate = 0;
            t=0;
            k=0; 
          }, delay);
        }else if(currentIdx <= -5){
          setTimeout(() => {
            m1Slider.css("transition","none");
            translate = currentIdx*ImgWidth;
            m1Slider.css("transform",`translateX(0px)`);
            currentIdx = 0;
            translate = 0;
            t=0;
            k=0; 
          }, delay);
        } 

    }

    

    let showSliding = 
    setInterval(sliding, 4000);

    // ----------m1 드래그시작-----------//
      $('.m1-sliders').on('dragstart',function(e){
          e.stopPropagation();
          e.stopImmediatePropagation();
          clearInterval(showSliding)
        x1 =e.clientX

    // ----------m1 드래그중-----------//

      $('.m1-sliders').on('drag',function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          $(this).css("transition", "none")
          X = e.clientX - x1
        m1Slider.css("transform",`translateX(${X+k}px)`)
        $('.m1-sliders').on('dragover',function(e){
          e.preventDefault();    
        })
      })
      })

      
      // -------------m1 드래그완료----------//
      $('.m1-sliders').on('dragend',function(e){
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        $(this).css("transition", ".5s")

        if($(window).innerWidth() <= 768){
          if( X > 0) {
            X = ImgWidth
          } else {
            X = -ImgWidth
          }
          k += X;
          X2 = e.clientX - x1;

          if( X2 > 0) {
            X2 = ImgWidth
            currentIdx -=1
          }else{
            X2 = -ImgWidth
            currentIdx +=1
          }
          
          t += X2;
          console.log(t,"t값임")
        } else{
          if (X < ImgWidth && X > 0) {
            X = ImgWidth
          }else if (X > -ImgWidth && X < 0) {
            X = -ImgWidth
          }else if(X > ImgWidth && X < 2*ImgWidth && X > 0) { 
            X = 2*ImgWidth
          }else if(X > 2*ImgWidth && X < 3*ImgWidth && X > 0) { 
            X = 3*ImgWidth
          }else if(X > 3*ImgWidth && X < 4*ImgWidth && X > 0) { 
            X = 4*ImgWidth
          }else if(X > 4*ImgWidth && X < 5*ImgWidth && X > 0) { 
            X = 5*ImgWidth
          }else if (X > -2*ImgWidth && X < -1*ImgWidth && X < 0) {
            X = -2*ImgWidth
          }else if (X > -3*ImgWidth && X < -2*ImgWidth && X < 0) {
            X = -3*ImgWidth
          }else if (X > -4*ImgWidth && X < -3*ImgWidth && X < 0) {
            X = -4*ImgWidth
          }else if (X > -5*ImgWidth && X < -4*ImgWidth && X < 0) {
            X = -5*ImgWidth
          }

          k += X;
          X2 = e.clientX - x1;
        
          if (X2 < ImgWidth && X2 > 0) {
            X2 = ImgWidth
            currentIdx -=1
          }else if(X2 > ImgWidth && X2 < 2*ImgWidth && X2 > 0) { 
            X2 = 2*ImgWidth
            currentIdx -=2
          }else if(X2 > 2*ImgWidth && X2 < 3*ImgWidth && X2 > 0) { 
            X2 = 3*ImgWidth
            currentIdx -=3
          }else if(X2 > 3*ImgWidth && X2 < 4*ImgWidth && X2 > 0) { 
            X2 = 4*ImgWidth
            currentIdx -=4
          }else if(X2 > 4*ImgWidth && X2 < 5*ImgWidth && X2 > 0) { 
            X2 = 5*ImgWidth
            currentIdx -=5
          }else if (X2 > -ImgWidth && X2 < 0) {
            X2 = -ImgWidth
            currentIdx += 1     
          }else if (X2 > -2*ImgWidth && X2 < -1*ImgWidth && X2 < 0) {
            X2 = -2*ImgWidth
            currentIdx += 2 
          }else if (X2 > -3*ImgWidth && X2 < -2*ImgWidth && X2 < 0) {
            X2 = -3*ImgWidth
            currentIdx += 3
          }else if (X2 > -4*ImgWidth && X2 < -3*ImgWidth && X2 < 0) {
            X2 = -4*ImgWidth
            currentIdx += 4 
          }else if (X2 > -5*ImgWidth && X2 < -4*ImgWidth && X2 < 0) {
            X2 = -5*ImgWidth
            currentIdx += 5 
          }
        t += X2;
        }
          
        console.log(currentIdx,"드래그후index임")
        m1Slider.css("transform",`translateX(${t}px)`);
        
      
        if (currentIdx >= 5){
          setTimeout(() => {

            m1Slider.css("transition","none");
            translate = (5-currentIdx)*ImgWidth;
            currentIdx =-(5-currentIdx)
            console.log(currentIdx,"현재index임")
            m1Slider.css("transform",`translateX(${translate}px)`); 
            k = translate
            t = translate 
          }, delay);
        }if(currentIdx <= -5){
          setTimeout(() => {
            m1Slider.css("transition","none");
            translate = -(5+currentIdx)*ImgWidth;
            currentIdx = (5+currentIdx)
            console.log(currentIdx,"현재index임")

            m1Slider.css("transform",`translateX(${translate}px)`); 
            k = translate
            t = translate
          }, delay);
        }
        showSliding = 
          setInterval(sliding, 4000);
      })

      //----- m3 초기 변수값---- //
    let [m3Idx,m3Translate,m3X,m3x1] =[0,0,0,0]  
    

       // --------m3 초기css값지정----------//
    const m3Slider = $('.m3-sliders');
    const m3Sliderimg = $('.m3-sliders img')
    const m3ImgWidth = m3Sliderimg[0].clientWidth;
   
    $('.m3-slide').css("height",`calc(${m3Sliderimg[0].clientHeight}px + 8vh)`)
    $('.m3-slide').css("width",`${m3ImgWidth}px`)
     // ------------m3 자동슬라이드 --------------//
     function m3move(D) {
      m3Idx += (-1 * D);
      m3Translate = -m3ImgWidth * m3Idx;
      m3Slider.css("transition", `all ${delay}ms ease`);
      m3Slider.css("transform",`translate(${m3Translate}px,-50%)`); 
    }
    function m3sliding() {
      m3move(-1);

      if (m3Idx >= 5){
          setTimeout(() => {
            m3Slider.css("transition","none");
            // m3Translate = -m3Idx*ImgWidth;
            m3Slider.css("transform",`translate(0px,-50%)`);
            m3Idx = 0;
            m3Translate = 0;
          }, delay);
        }else if(m3Idx <= -1){
          setTimeout(() => {
            m3Slider.css("transition","none");
            m3Translate = -(5+m3Idx)*m3ImgWidth;
            m3Slider.css("transform",`translate(${m3Translate}px,-50%)`);
            m3Idx = 4;
          }, delay);
        } 

    }
    let m3Autoanimate = setInterval(m3sliding,4000)

    // ---------m3 버튼 클릭이벤트 ----------//

    $('.button-l').click(()=>{
      clearInterval(m3Autoanimate);
      m3Autoanimate = setInterval(m3sliding,4000);
      m3Slider.css("transition",`all ${delay}ms ease`)
      m3Slider.css("pointer-events","none");
      m3Translate += m3ImgWidth;
      m3Slider.css("transform",`translate(${m3Translate}px,-50%)`)
      m3Idx -= 1;
      console.log(m3Idx)
      setTimeout(()=>{
        m3Slider.css("pointer-events","auto");
        },delay)

      if(m3Idx <= -1){
        setTimeout(() => {
          m3Slider.css("transition","none");
          m3Translate = -(5+m3Idx)*m3ImgWidth;
          m3Slider.css("transform",`translate(${m3Translate}px,-50%)`);
          m3Idx = 4;
        }, delay);
      } 
    })
    $('.button-r').click(()=>{
      clearInterval(m3Autoanimate);
      m3Autoanimate = setInterval(m3sliding,4000);
      m3Slider.css("transition",`all ${delay}ms ease`)
        m3Slider.css("pointer-events","none");
        m3Translate -= m3ImgWidth;
        m3Slider.css("transform",`translate(${m3Translate}px,-50%)`)
        m3Idx += 1;
        console.log(m3Idx)
        setTimeout(()=>{
        m3Slider.css("pointer-events","auto");
        },delay)
        if (m3Idx >= 5){
          setTimeout(() => {
            m3Slider.css("transition","none");
            m3Translate = -m3Idx*ImgWidth;
            m3Slider.css("transform",`translate(0px,-50%)`);
            m3Idx = 0;
            m3Translate = 0;
          }, delay);
        }

    })

    // ---------m3 드래그 이벤트 ----------//

    m3Slider.on("dragstart",(e)=>{
      clearInterval(m3Autoanimate);
      m3x1 = e.clientX;
    })
    m3Slider.on("drag",(e)=>{
      m3X = e.clientX - m3x1;
      m3Slider.on("dragover",(e)=>{
        e.preventDefault();
      })
    })
    m3Slider.on("dragend",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      m3Autoanimate = setInterval(m3sliding,4000);
      if(m3X < 0){
        m3Idx++;
        m3Translate = - m3Idx * m3ImgWidth;
        m3Slider.css("transition",`all ${delay}ms ease`)
        m3Slider.css("transform",`translate(${m3Translate}px,-50%)`)
      } else {
        m3Idx--;
        m3Translate = - m3Idx * m3ImgWidth;
        m3Slider.css("transition",`all ${delay}ms ease`)
        m3Slider.css("transform",`translate(${m3Translate}px,-50%)`)
      }

      if (m3Idx >= 5){
        setTimeout(() => {
          m3Slider.css("transition","none");
          // m3Translate = -m3Idx*ImgWidth;
          m3Slider.css("transform",`translate(0px,-50%)`);
          m3Idx = 0;
          m3Translate = 0;
        }, delay);
      }else if(m3Idx <= -1){
        setTimeout(() => {
          m3Slider.css("transition","none");
          m3Translate = -(5+m3Idx)*m3ImgWidth;
          m3Slider.css("transform",`translate(${m3Translate}px,-50%)`);
          m3Idx = 4;
        }, delay);
      } 
    })
  }



  



    // -----------observer start -------------//
    ///////////////초기값////////////////////
    let [DelayFade] =[];
    let TBfade = {};


    ////////////////옵저버생성//////////////////

    //~~~~~~~~~~~~~~~~딜레이가없는 페이드~~~~~~~~~~~~~~~~~//
    let observerFade = new IntersectionObserver((e)=>{
      e.forEach((a)=>{
          if(a.intersectionRatio > 0){
                  a.target.style.transition = ".5s ease"
                  a.target.style.transform = "scale(1)"
          } else{
                   a.target.style.transform = "scale(0)"
          }
      })
    })

    //~~~~~~~~~~~~~~~~~딜레이가있는 페이드~~~~~~~~~~~~~~~~~//
    let observerDelayFade = new IntersectionObserver((e)=>{
    let fadeDelay = 0;
      e.forEach((a)=>{
          if(a.isIntersecting){
            a.target.style.transition = ".5s ease"
              DelayFade = setTimeout(()=>{
              a.target.style.transform = "scale(1)"
            },fadeDelay)
            fadeDelay+=100
          

            a.target.classList.remove()
                
          } 
          else{
              fadeDelay = 0
              clearTimeout(DelayFade)
              a.target.style.transition = "none"
              a.target.style.transform = "scale(0)"
            
            
            
          }
      })
    },{
      root: null,
      rootMargin: "-100px 0px -100px 0px",
      threshold: 0
    })

    //~~~~~~~~~~~~~~~~~아래에서 위로~~~~~~~~~~~~~~~~~//
    let observerBT = new IntersectionObserver((e)=>{
      e.forEach((a)=>{
          if(a.intersectionRatio > 0){
                  a.target.style.transition = ".5s ease"
                  a.target.style.transform = "translateY(0)"
                  a.target.style.opacity = 1
          } else{
                  a.target.style.transition = "none"
                  a.target.style.transform = "translateY(100px)"
                  a.target.style.opacity = 0
          }
      })
    })

    //~~~~~~~~~~~~~~~~~왼쪽에서 오른쪽으로~~~~~~~~~~~~~~~~~//
    let observerLR = new IntersectionObserver((e)=>{
      e.forEach((a)=>{
          if(a.intersectionRatio > 0){
                  a.target.style.transition = ".5s ease"
                  a.target.style.transform = "translateX(0)"
                  a.target.style.opacity = 1
          } else{
                  a.target.style.transition = "none"
                  a.target.style.transform = "translateX(-200px)"
                  a.target.style.opacity = 0
          }
      })
    })

    //~~~~~~~~~~~~~~~~~오른쪽에서 왼쪽으로~~~~~~~~~~~~~~~~~//
    let observerRL = new IntersectionObserver((e)=>{
      e.forEach((a)=>{
          if(a.intersectionRatio > 0){
                  a.target.style.transition = ".5s ease"
                  a.target.style.transform = "translateX(0)"
                  a.target.style.opacity = 1
          } else{
                  a.target.style.transition = "none"
                  a.target.style.transform = "translateX(200px)"
                  a.target.style.opacity = 0
          }
      })
    })

    //~~~~~~~~~~~~~~~~~위에서 아래로(딜레이)~~~~~~~~~~~~~~~~~//
    let observerTB = new IntersectionObserver((e,ob)=>{
      let TBdelay = 0;
      e.forEach((a)=>{
        if(a.isIntersecting){
          a.target.style.transition = ".5s ease"
            TBfade[a.target.id] = setTimeout(()=>{
            a.target.style.transform = "translateY(0)"
            a.target.style.opacity = 1
          },100)
          TBdelay += 100;
        } else{
          clearTimeout(TBfade[a.target.id])
          a.target.style.transition = "none"
          a.target.style.opacity = 0
          a.target.style.transform = "translateY(-100px)"
          
          
        }
      })
    },)
    
  
  //////////////////// 요소 ///////////////////
  
  let fadeEl = [
    ".b-sub-title",
    ".b-top h2",
    ".c1-middle",
    ".m1-top img",   
    ".m1-top h2",
    ".m2-top",   
    ".p-top",   
    ".f-f-button",   
  ]

  let TBEl = [
    ".c2-b-img1",
    ".c2-b-img2",
    ".c2-b-img3",
    ".c2-b-img4",
  ]
  let BTEl = [
    ".b-bottom h2:first-child",
    ".b-bottom h2:nth-child(2)",
    ".b-bottom p",
    ".c2-top h2",  
    ".c2-top p",
    ".m2-middle",
    ".m2-bottom h2",  
    ".m3-top h2",  
    ".m3-top p",  
    ".m3-middle",  
    ".m3-bottom",  
    ".p1-top img",  
    ".p1-top h2",  
    ".p1-top span",
    ".p2-top img",  
    ".p2-top h2",  
    ".p2-top span",   
    ".f-innerbox h2:first-child",   
    ".f-innerbox p",   
    ".m-f-h2",   
  ]
  let LREl = [
    ".c1-top",   
  ]

  let RLEl = [
    ".c1-bottom",   
  ]

  let DelayfadeEl = [ 
    ".b1-m-img1",    
    ".b1-m-img2",    
    ".b1-m-img3",    
    ".b1-m-img4",    
    ".b1-m-img5",
    ".p1-box1",    
    ".p1-box2",    
    ".p1-box3",    
    ".p1-box4",    
    ".p1-box5",    
    ".p1-box6",    
    ".p2-box1",    
    ".p2-box2",    
    ".p2-box3",    
    ".p2-box4",    
  ]
  
  ////////////////요소와 옵저버배열/////////////////
    let inspector = [[fadeEl,observerFade],
                     [DelayfadeEl,observerDelayFade],       
                     [TBEl,observerTB],       
                     [BTEl,observerBT],       
                     [LREl,observerLR],       
                     [RLEl,observerRL],       
  ]
  
  /////////////////옵저버작동하기//////////////////
  
    inspector.forEach((a)=>{
        a[0].forEach((e)=>{
        a[1].observe(document.querySelector(`${e}`))
        })
      })
    
  
  //-------------observer end-----------------//










})