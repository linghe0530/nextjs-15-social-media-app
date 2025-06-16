import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  //getUTCDate
  if (currentDate.getDate() - from.getDate() < 24 * 60 * 60 * 1000) {
    /*
    返回两个日期之间的距离的描述字符串，严格模式下计算。
    如果 from 是过去时间 → 添加 "ago"（例如 "2 days ago"）。
    如果 from 是未来时间 → 添加 "in"（例如 "in 3 hours"）
    */
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    //返回日期的年份
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d"); //月份缩写 + 日
    } else {
      return formatDate(from, "MMM d,yyy"); //月份缩写 + 日 + 年份（如 Jan 1, 2023)
    }
  }
}

//格式化数字 1000=>1k
export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact", //紧凑显示
    maximumFractionDigits: 1, //最大小数位数
  }).format(n);
}
