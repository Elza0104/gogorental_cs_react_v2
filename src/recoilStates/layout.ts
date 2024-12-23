// export enum LayoutGrade {
//   XL='xl', LG='lg', MD='md', SM='sm', XS='xs', UN='un'
// }

// export const SIZE_INFO ={
//   XS:{grade: LayoutGrade.XS, max: 360 },
//   SM:{grade: LayoutGrade.XS, max: 360 },
//   MD:{grade: LayoutGrade.XS, max: 360 },
//   LG:{grade: LayoutGrade.XS, max: 360 },
//   XL:{grade: LayoutGrade.XS, max: 360 }recoil
// }

import { atom, selector } from 'recoil';


/** README!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *  select: 접미사에 Selector가 붙은 것을 사용할 것.
 *  update: 접미사에 AsOnlySetter이 붙은 것을 사용할 것.
 *  README!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */


export const LAYOUT_INIT = {
  width: 0,
  height: 0
}
export enum LayoutGrade {
  XL='xl', LG='lg', MD='md', SM='sm', XS='xs', UN= 'un'
}
// export const SIZE_INFO = {
//   XS:{grade: LayoutGrade.XS, max: 360 },
//   SM:{grade: LayoutGrade.SM, max: 640 },
//   MD:{grade: LayoutGrade.MD, max: 960 },
//   LG:{grade: LayoutGrade.LG, max: 1921 },
//   XL:{grade: LayoutGrade.XL }
// }
export const SIZE_INFO = {
  XS:{grade: LayoutGrade.XS, max: 360 },
  SM:{grade: LayoutGrade.SM, max: 640 },
  MD:{grade: LayoutGrade.MD, max: 960 },
  LG:{grade: LayoutGrade.LG, max: 1280 },
  XL:{grade: LayoutGrade.XL }
}
export interface WindowLayout {
  width: number;
  height: number;
  // grade: LayoutGrade,
  scrollY: number;
  scrollX: number;
}
export interface WindowLayoutWithGrade extends WindowLayout{
  grade: LayoutGrade
}
export interface BasicLayout {
  position: 'absolute' | 'relative';
  width: number;
  height: number;
  x: number;
  y: number;
}
export interface BasicLayoutWithGrade extends BasicLayout{
  grade: LayoutGrade
}

export const BodyColorAtom = atom<string>({
  key: 'BodyColorAtom',
  default:"#fff"
})

export const windowLayoutAsOnlySetter = atom<WindowLayout>({
  key: 'windowLayoutAsOnlySetter',
  default: {
    ...LAYOUT_INIT,
    scrollX: 0,
    scrollY: 0
  },
})
export const windowLayoutSelector = selector<WindowLayoutWithGrade>({
  key: 'windowLayoutSelector',
  get: ({get}) => {
    const windowLayout = get(windowLayoutAsOnlySetter);
    const { width } = windowLayout;
    return {
      ...windowLayout,
      grade: getGrade(width)
    }
  }
})

export const contentHeightAtom= atom<number>({
  key:"contentHeightAtom",
  default:300
})

export const footerLayoutAtom = atom<BasicLayout>({
  key: 'footerLayoutAtom',
  default: {
    ...LAYOUT_INIT,
    position: 'relative',
    x: 0,
    y: 0
  }
})

export const headerLayoutAtom = atom<BasicLayout>({
  key: 'headerLayoutAtom',
  default: {
    ...LAYOUT_INIT,
    position: 'relative',
    x: 0,
    y: 0
  }
})

// export const headerLayoutSelector = selector<BasicLayoutWithGrade>({
//   key: 'headerLayoutSelector',
//   get: ({get}) =>{
//     const headerLayout = get(headerLayoutAsOnlySetter);
//     const {width} = headerLayout;
//     return {
//       ...headerLayout,
//       grade: getGrade(width)
//     }
//   }
// })

export const navLayoutAsOnlySetter = atom<BasicLayout>({
  key: 'navLayoutAsOnlySetter',
  default: {
    ...LAYOUT_INIT,
    position: 'relative',
    x: 0,
    y: 0
  }
})
export const navLayoutSelector = selector<BasicLayoutWithGrade>({
  key: 'navLayoutSelector',
  get: ({get}) =>{
    const navLayout = get(navLayoutAsOnlySetter);
    const {width} = navLayout;
    return {
      ...navLayout,
      grade: getGrade(width)
    }
  }
})

export const contentLayoutAsOnlySetter = atom<BasicLayout>({
  key: 'contentLayoutAsOnlySetter',
  default: {
    ...LAYOUT_INIT,
    position: 'relative',
    x: 0,
    y: 0
  }
})
export const contentLayoutSelector = selector<BasicLayoutWithGrade>({
  key: 'contentLayoutSelector',
  get: ({get}) =>{
    const contentLayout = get(contentLayoutAsOnlySetter);
    const {width} = contentLayout;
    return {
      ...contentLayout,
      grade: getGrade(width)
    }
  }
})

export const footerLayoutAsOnlySetter = atom<BasicLayout>({
  key: 'footerLayoutAsOnlySetter',
  default: {
    ...LAYOUT_INIT,
    position: 'relative',
    x: 0,
    y: 0
  }
})


export type BackColor= 'white'|'black'|'transparent'|'yellow';


export const footerLayoutSelector = selector<BasicLayoutWithGrade>({
  key: 'footerLayoutSelector',
  get: ({get}) =>{
    const footerLayout = get(footerLayoutAsOnlySetter);
    const {width} = footerLayout;
    return {
      ...footerLayout,
      grade: getGrade(width)
    }
  }
})

//
// ACTIONS
//

export const getBasicLayout = (node?: HTMLElement|null):BasicLayout => {

  if(!node)
    return {
      ...LAYOUT_INIT,
      position: 'relative',
      x: 0, y: 0
    }

  const {offsetWidth, offsetHeight} = node;
  const {position} = node.style;
  let x, y;
  // if(position === 'fixed' && node.style){
  //   const {left, top} = node.style;
  //   x = Number(left.replace(OTHER_THEN_NUMBER_AND_RELATION, EMPTY));
  //   y = Number(top.replace(OTHER_THEN_NUMBER_AND_RELATION, EMPTY));
  // }else{
  const {x: rectX, y: rectY} = node.getBoundingClientRect();
  x = rectX;
  y = rectY;
  
  return {
    width: offsetWidth, 
    height: offsetHeight,
    position: position === 'absolute' ? position : 'relative',
    x, y
  }
}
export const getWindowLayout = (window?: Window):WindowLayout => {
  if(!window) 
    return {
      ...LAYOUT_INIT,
      scrollX: 0,
      scrollY: 0
    }

  const {scrollX, scrollY} = window;
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollY, scrollX
  }
}
export const getGrade = (width?: number):LayoutGrade => {
  if(!width || width < 1)
    return LayoutGrade.UN
  else if(width <= SIZE_INFO.XS.max)
    return LayoutGrade.XS
  else if(width <= SIZE_INFO.SM.max)
    return LayoutGrade.SM
  else if(width <= SIZE_INFO.MD.max)
    return LayoutGrade.MD
  else if(width <= SIZE_INFO.LG.max)
    return LayoutGrade.LG
  else
    return LayoutGrade.XL
}