export const pxToRem = (value: number, rootSize: number | undefined = 16) =>
  `${value / rootSize}rem`;

export function formatDateTime(input: string): string {
  const [date, time] = input.split('T'); // 날짜와 시간을 분리
  const formattedTime = time.slice(0, 5); // 시간의 "HH:MM"만 추출
  return `${date} ${formattedTime}`;
}