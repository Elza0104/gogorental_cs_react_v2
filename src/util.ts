export const pxToRem = (value: number, rootSize: number | undefined = 16) =>
  `${value / rootSize}rem`;

export function formatDateTime(input: any): string {
  if (input != null && input != undefined) {
    const [date, time] = input.split("T"); // 날짜와 시간을 분리
    const formattedTime = time.slice(0, 5); // 시간의 "HH:MM"만 추출
    console.log(`${date} ${formattedTime}`);
    return `${date} ${formattedTime}`;
  }
  return "오류";
}

export function formatDate(input: any): string {
  if (input != null && input != undefined) {
    const [date, time] = input.split("T"); // 날짜와 시간을 분리
    return `${date}`;
  }
  return "오류";
}

export function formatBirth6th(id: string): string {
  if (!/^\d{13}$/.test(id)) {
    console.log("Invalid 주민등록번호 format. Expected 'XXXXXXXXXXXXX'.");
    return "";
  }

  const front = id.slice(0, 6);
  const back = id.slice(6);

  // const yearPrefix = back[0] === '1' || back[0] === '2' ? '19' : '20';
  const year = front.slice(0, 2);
  const month = front.slice(2, 4);
  const day = front.slice(4, 6);

  return `${year}${month}${day}`;
}

export function formatBirthAll(id: string): string {
  if (!/^\d{13}$/.test(id)) {
    console.log("Invalid 주민등록번호 format. Expected 'XXXXXXXXXXXXX'.");
    return "";
  }

  const front = id.slice(0, 6);
  const back = id.slice(6);

  const yearPrefix = back[0] === '1' || back[0] === '2' ? '19' : '20';
  const year = yearPrefix + front.slice(0, 2);
  const month = front.slice(2, 4);
  const day = front.slice(4, 6);

  return `${year}.${month}.${day}`;
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
};

export function formatPhoneNumber(phoneNumber: string): string {
  // 숫자만 추출
  const cleaned = phoneNumber.replace(/[^0-9]/g, "");

  // 유효성 검사 (한국 휴대폰 번호)
  if (!/^01[016789][0-9]{7,8}$/.test(cleaned)) {
    return "유효하지 않은 휴대폰 번호입니다.";
  }

  // 형식화: 000-0000-0000 또는 000-000-0000
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else {
    return "유효하지 않은 휴대폰 번호입니다.";
  }
}

export function formatToCustomPattern(input: string): string {
  if (!/^\w{12}$/.test(input)) {
    throw new Error("입력값은 정확히 12글자여야 합니다.");
  }

  // 형식화: 2글자-2글자-6글자-2글자
  return `${input.slice(0, 2)}-${input.slice(2, 4)}-${input.slice(4, 10)}-${input.slice(10, 12)}`;
}