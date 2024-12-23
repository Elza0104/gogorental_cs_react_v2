
export const SPACE_BAR = /\s/g;
export const KOR = /[ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g;
export const ENG = /[a-zA-Z]/g;
export const SPECIAL_CHARACTERS = /[~!@\#$%<>^&*\|\\\?\/]/g;

export const removeS = (e: string) =>{
  if (SPACE_BAR.test(e)) {
  }
  return e.replace(SPACE_BAR, "");
};

export const removeT = (e: any) =>{
  if (SPECIAL_CHARACTERS.test(e)) {
  }
  return e.replace(SPECIAL_CHARACTERS, "");
};

export const removeK = (e: any) =>{
  if (KOR.test(e)) {
    alert("한국어 금지")
  }
  alert("한국어 금지")
  console.log("qweqwe")
  return e.replace(KOR, "");
};

export const removeE = (e: any) =>{
  if (ENG.test(e)) {

  }
  return e.replace(ENG, "");
};

export const removeST = (e: any) =>{
  if (SPACE_BAR.test(e) || SPECIAL_CHARACTERS.test(e)) {
  }
  return e.replace(SPACE_BAR, "").replace(SPECIAL_CHARACTERS, "");
};

export const removeSTE = (e: any) =>{
  if (SPACE_BAR.test(e) || SPECIAL_CHARACTERS.test(e) || ENG.test(e)) {
  }
  return e.replace(SPACE_BAR, "").replace(SPECIAL_CHARACTERS, "").replace(ENG, "");
};

export const removeSTK = (e: any) =>{
  if (SPACE_BAR.test(e) || SPECIAL_CHARACTERS.test(e) || KOR.test(e)) {
    alert("영어만 입력 가능합니다.");
  }
  return e.replace(SPACE_BAR, "").replace(SPECIAL_CHARACTERS, "").replace(KOR, "");
};

export const removeSTEK = (e: any) =>{
  if (SPACE_BAR.test(e) || SPECIAL_CHARACTERS.test(e) || ENG.test(e) || KOR.test(e)) {
  }
  return e.replace(SPACE_BAR, "").replace(SPECIAL_CHARACTERS, "").replace(ENG, "").replace(KOR, "");
};