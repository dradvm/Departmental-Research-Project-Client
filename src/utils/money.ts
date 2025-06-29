export function formatVND(amount: number): string {
    if (isNaN(amount)) return "0 VNĐ";

    return Intl.NumberFormat(`vi-VN`, {
        style: "currency",
        currency: "VND"
    }).format(amount).replace(/\u00A0₫/, ' VNĐ');
}