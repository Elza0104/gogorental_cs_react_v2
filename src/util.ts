export const pxToRem = (value: number, rootSize: number | undefined = 16) =>
  `${value / rootSize}rem`;

export function formatDateTime(input: any): string {
  if(input != null && input != undefined){
    const [date, time] = input.split('T'); // 날짜와 시간을 분리
    const formattedTime = time.slice(0, 5); // 시간의 "HH:MM"만 추출
    console.log(`${date} ${formattedTime}`)
    return `${date} ${formattedTime}`;
  }
  return "오류"
}

export function extractBirthDateFromId(id: string): string {
  if (!/^\d{6}-\d{7}$/.test(id)) {
    throw new Error("Invalid 주민등록번호 format. Expected 'XXXXXX-XXXXXXX'.");
  }

  const [front, back] = id.split('-');
  const yearPrefix = back[0] === '1' || back[0] === '2' ? '19' : '20';
  const year = yearPrefix + front.slice(0, 2);
  const month = front.slice(2, 4);
  const day = front.slice(4, 6);

  return `${year}-${month}-${day}`;
}

export const formatDayjs = (date: any) => {
  if (date !== undefined && date != null) {
    let i = new Date(date);
    const year = i.getFullYear();
    const month = ("0" + (i.getMonth() + 1)).slice(-2);
    const day = ("0" + i.getDate()).slice(-2);
    return `${year}-${month}-${day} 00:00:00`;
  }
  return "";
}