export class TimeUtil {
    static parseTimeString(timeString: string): Date {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0);
        return date;
    }

    static convertToLocalTimeAnd24HourFormat(time: string): string {
        const [hours, flag] = time.split(" ");
        console.log(`data: ${hours} and ${flag}`);
        const hourValue = parseInt(hours.split(":")[0], 10);
        const hourInUTC = flag === "PM" ? hourValue + 12 : hourValue;
        const date = new Date();
        date.setHours(hourInUTC, 0, 0);
        return date.toTimeString().split(" ")[0];
    }

    static capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}