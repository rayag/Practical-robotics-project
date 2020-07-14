export enum IntervalType {
    MINS = 0,
    HOURS,
    DAYS
}

export class FeedingMachine {

    id: number;

    name: string;

    ip: string;

    mac: string;

    sleepTime: number;

    intervalType: string = "0";

    photoPath: string = 'assets/img/dog.jpeg';

    videoPort: string;
}