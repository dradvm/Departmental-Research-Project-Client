export function getDateFormat(dateString: string): string {
    let date = new Date(dateString);
    if (isNaN(date.getTime()))
        date = new Date();
    return new Intl.DateTimeFormat("vi-VN").format(date);
}

export function getIsoStringDateFromDate(inputDate: string): string {
    let dateObj = new Date(inputDate);
    if (isNaN(dateObj.getTime()))
        dateObj = new Date();
    return dateObj.toISOString()
}
