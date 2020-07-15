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

    intervalType: string = "MINS";

    photoPath: string = 'assets/img/dog.jpeg';

    videoPort: string;

    isDog: boolean = true;

    isCat: boolean = false;
}