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

export function getTimeAgo(dateInput: string | Date): string {
  const now = new Date();
  const date = new Date(dateInput);
  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // gần đúng
  const years = Math.floor(days / 365); // gần đúng

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (weeks > 0) return `${weeks} tuần trước`;
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
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
