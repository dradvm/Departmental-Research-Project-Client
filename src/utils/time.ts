export function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const padded = (n: number) => String(n).padStart(2, "0");

  if (hrs > 0) {
    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
  } else {
    return `${padded(mins)}:${padded(secs)}`;
  }
}

// getTimeAgo.ts

export function getTimeAgo(dateInput: string | Date, prefix = "trước"): string {
  const now = new Date();
  const date = new Date(dateInput);
  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // gần đúng
  const years = Math.floor(days / 365); // gần đúng

  if (years > 0) return `${years} năm ${prefix}`;
  if (months > 0) return `${months} tháng ${prefix}`;
  if (weeks > 0) return `${weeks} tuần ${prefix}`;
  if (days > 0) return `${days} ngày ${prefix}`;
  if (hours > 0) return `${hours} giờ ${prefix}`;
  if (minutes > 0) return `${minutes} phút ${prefix}`;
  return "Vừa xong";
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} giây`;

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} giờ ${remainingMinutes} phút`;
  } else if (hours > 0) {
    return `${hours} giờ`;
  } else {
    return `${minutes} phút`;
  }
}
export function formatDuration2(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} giây`;

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} giờ`;
  } else {
    return `${minutes} phút`;
  }
}
export function isWithinTwoMinutes(
  time1Str: string | Date,
  time2Str: string | Date
) {
  const time1 = new Date(time1Str);
  const time2 = new Date(time2Str);

  const diffMs: number = Math.abs(time2.getTime() - time1.getTime());
  const diffMinutes = diffMs / (1000 * 60);

  return diffMinutes <= 2;
}

export function formatMessageTime(isoString: Date | string) {
  const now = new Date();
  const date = new Date(isoString);

  date.setHours(date.getHours());
  now.setHours(now.getHours());

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const isSameDay = date.toDateString() === now.toDateString();

  const msInDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.floor((now.getTime() - date.getTime()) / msInDay);

  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (isSameDay) {
    return time;
  } else if (daysDiff < 7) {
    return `${time} ${weekday}`;
  } else {
    return `${time} ${day} Tháng ${month}, ${year}`;
  }
}

export function getHourFormSecond(s: number) {
  if (isNaN(s))
    return 0;
  return (Math.round((s / 3600) * 10)) / 10;
}
