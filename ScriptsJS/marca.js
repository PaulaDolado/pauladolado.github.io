export function setupAnimacionMarca(){
    const ItemMarca = gsap.utils.toArray(".marca h1");
    if (ItemMarca.length>0){
        const tl=horizontalLoop(ItemMarca,{
            repeat:-1,
            paddingRight:30,
        });
    }
}
function horizontalLoop(items, config){
    items = gsap.utils.toaArray(items);
    config= config || {};
    let lt = gsap.timeline({
        repeat: config.repeat,
        defaults: {ease:"none"},
    });
    let length = items.length;
    let startX = items[0].offsetLeft;
    let widths = [];
    let xPercents = [];
    let pixelsxS = (config.speed || 1)*100;
    let totalWidth, curX, distanciaInicio, distanciaLoop, item, i;
    gsap.set(items,{
        xPercent: (i, el) =>{
            let w= (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
            xPercents[i]= (parseFloat(gsap.getProperty(el, "x", "px"))/w)*100+ gsap.getProperty(el, "xPercent");
            return xPercents[i];
        },
    });
    gsap.set(items,{x:0});
    totalWidth=
    items[length-1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX + items[length-1].offsetWidth * 
    gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

    for (i=0; i< length;i++){
        item=  items[i];
        curX=(xPercents[i]/100)*widths[i];
        distanciaInicio = item.offsetLeft + curX - startX;
        distanciaLoop =
        distanciaInicio + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
            item,{
                xPercent:((curX - distanciaLoop)/widths[i])*100,
                duration: distanciaLoop/pixelsxS,
            },
            0
        ).fromTo(
            item,
            {xPercent:((curX - distanciaLoop + totalWidth)/widths[i])*100},
            {
                xPercent: xPercents[i],
                duration: (curX - distanciaLoop + totalWidth - curX) / pixelsxS,
                immediateRender: false,
            },
            distanciaLoop / pixelsxS  
        );
    }
    tl.progress(1,true),progress(0, true);
    return tl;
}