// deno-lint-ignore-file no-explicit-any

const copyObjectProperties = (a: object, b: object) => {
    for (const key in a) {
        if (!(key in b)) continue;

        if (typeof (a as any)[key] !== 'object') {
            (a as any)[key] = (b as any)[key];
        } else {
            copyObjectProperties((a as any)[key], (b as any)[key]);
        }
    }
};

type pushNextUnitRec = {
    target: number;
    pass: number;
};

const pushNextUnit = (rec: pushNextUnitRec, next: number | undefined, targetUnit: number): number => {
    const overflow = Math.floor(rec.target / targetUnit);

    const res = rec.target - overflow * targetUnit;

    rec.target = rec.pass + overflow;
    rec.pass = next || 0;

    return res;
};

type pushPrevUnitRec = {
    target: number;
    pass: number;
};

const pushPrevUnit = (rec: pushPrevUnitRec, prev: number | undefined, passUnit: number) => {
    const res = Math.floor(rec.target);

    const overflow = rec.target - res;

    rec.target = rec.pass + overflow * passUnit;
    rec.pass = prev || 0;

    return res;
};

export type multiTimeNotationType = {
    option: {
        millisecondPower: number;
        millisecondDigit: number;
        frameRate: number;
        frameRateDigit: number;
        samplingRate: number;
        samplingRateDigit: number;
    };
    total: {
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
        frames: number;
        samplings: number;
    };
    split: {
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
        frames: number;
        samplings: number;
    };
    display: {
        timeData: string;
        timeCodeFrames: string;
        timeCodeSamplings: string;
        frames: string;
        samplings: string;
    };
};

export class MultiTimeNotation {
    option: multiTimeNotationType['option'];
    total: multiTimeNotationType['total'];
    split: multiTimeNotationType['split'];
    display: multiTimeNotationType['display'];

    constructor(rec?: multiTimeNotationType) {
        this.option = {
            millisecondPower: 1000,
            millisecondDigit: 4,
            frameRate: 30,
            frameRateDigit: 2,
            samplingRate: 48000,
            samplingRateDigit: 5,
        };
        this.total = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            frames: 0,
            samplings: 0,
        };
        this.split = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            frames: 0,
            samplings: 0,
        };
        this.display = {
            timeData: '00:00:00.0000',
            timeCodeFrames: '00:00:00:00',
            timeCodeSamplings: '00:00:00:00000',
            frames: '0',
            samplings: '0',
        };

        if (rec) this.copy(rec);
    }

    setMillisecondDigit(millisecondDigit: number) {
        if (millisecondDigit <= 0) return;

        this.split.milliseconds *= Math.pow(10, millisecondDigit - this.option.millisecondDigit);
        this.option.millisecondPower = Math.pow(10, millisecondDigit - 1);
        this.option.millisecondDigit = millisecondDigit;

        this.normalize(1);
        this.setTotal(1);
    }

    setFrameRate(frameRate: number) {
        if (frameRate <= 0) return;

        this.split.frames *= frameRate / this.option.frameRate;
        this.option.frameRate = frameRate;
        this.option.frameRateDigit = Math.floor(Math.log10(frameRate) + 1);

        this.normalize(2);
        this.setTotal(2);
    }

    setSamplingRate(samplingRate: number) {
        if (samplingRate <= 0) return;

        this.split.samplings *= samplingRate / this.option.samplingRate;
        this.option.samplingRate = samplingRate;
        this.option.samplingRateDigit = Math.floor(Math.log10(samplingRate) + 1);

        this.normalize(3);
        this.setTotal(3);
    }

    private setMillisecondsAndOthers(milliseconds: number) {
        this.split.milliseconds = milliseconds;
        this.split.frames = (milliseconds / this.option.millisecondPower) * this.option.frameRate;
        this.split.samplings = (milliseconds / this.option.millisecondPower) * this.option.samplingRate;
    }

    private setFramesAndOthers(frames: number) {
        this.split.frames = frames;
        this.split.milliseconds = (frames / this.option.frameRate) * this.option.millisecondPower;
        this.split.samplings = (frames / this.option.frameRate) * this.option.samplingRate;
    }

    private setSamplingsAndOthers(samplings: number) {
        this.split.samplings = samplings;
        this.split.milliseconds = (samplings / this.option.samplingRate) * this.option.millisecondPower;
        this.split.frames = (samplings / this.option.samplingRate) * this.option.frameRate;
    }

    private reset() {
        this.split.hours = 0;
        this.split.minutes = 0;
        this.split.seconds = 0;
        this.split.milliseconds = 0;
        this.split.frames = 0;
        this.split.samplings = 0;
    }

    private normalize(useFormatType: 1 | 2 | 3) {
        const decimal = () => [this.split.milliseconds, this.split.frames, this.split.samplings][useFormatType - 1];
        const decimalRate = () => [this.option.millisecondPower, this.option.frameRate, this.option.samplingRate][useFormatType - 1];

        const pushPrevUnitRem = {
            target: this.split.hours,
            pass: this.split.minutes,
        };

        this.split.hours = pushPrevUnit(pushPrevUnitRem, this.split.seconds, 60);
        this.split.minutes = pushPrevUnit(pushPrevUnitRem, decimal(), 60);
        this.split.seconds = pushPrevUnit(pushPrevUnitRem, undefined, decimalRate());

        switch (useFormatType) {
            case 1:
                this.setMillisecondsAndOthers(pushPrevUnitRem.target);
                break;
            case 2:
                this.setFramesAndOthers(pushPrevUnitRem.target);
                break;
            case 3:
                this.setSamplingsAndOthers(pushPrevUnitRem.target);
                break;
        }

        const pushNextUnitRem = {
            target: decimal(),
            pass: this.split.seconds,
        };

        switch (useFormatType) {
            case 1:
                this.setMillisecondsAndOthers(pushNextUnit(pushNextUnitRem, this.split.minutes, decimalRate()));
                break;
            case 2:
                this.setFramesAndOthers(pushNextUnit(pushNextUnitRem, this.split.minutes, decimalRate()));
                break;
            case 3:
                this.setSamplingsAndOthers(pushNextUnit(pushNextUnitRem, this.split.minutes, decimalRate()));
                break;
        }

        this.split.seconds = pushNextUnit(pushNextUnitRem, this.split.hours, 60);
        this.split.minutes = pushNextUnit(pushNextUnitRem, undefined, 60);
        this.split.hours = pushNextUnitRem.target;
    }

    private setTotal(useFormatType: 1 | 2 | 3) {
        const get = () => {
            switch (useFormatType) {
                case 1:
                    return this.split.milliseconds / this.option.millisecondPower;
                case 2:
                    return this.split.frames / this.option.frameRate;
                case 3:
                    return this.split.samplings / this.option.samplingRate;
            }
        };

        this.total.hours = this.split.hours + this.split.minutes / 60 + this.split.seconds / (60 * 60) + get() / (60 * 60);
        this.total.minutes = this.split.hours * 60 + this.split.minutes + this.split.seconds / 60 + get() / 60;
        this.total.seconds = this.split.hours * 60 * 60 + this.split.minutes * 60 + this.split.seconds + get();

        this.total.milliseconds = this.split.hours * this.option.millisecondPower * 60 * 60 +
            this.split.minutes * this.option.millisecondPower * 60 +
            this.split.seconds * this.option.millisecondPower +
            get() * this.option.millisecondPower;

        this.total.frames = this.split.hours * this.option.frameRate * 60 * 60 +
            this.split.minutes * this.option.frameRate * 60 +
            this.split.seconds * this.option.frameRate +
            get() * this.option.frameRate;

        this.total.samplings = this.split.hours * this.option.samplingRate * 60 * 60 +
            this.split.minutes * this.option.samplingRate * 60 +
            this.split.seconds * this.option.samplingRate +
            get() * this.option.samplingRate;

        this.setDisplay();
    }

    private setDisplay() {
        const set = (data: number, digit: number) => String(Math.floor(data)).padStart(digit, '0');

        this.display.timeData = `${set(this.split.hours, 2)}:${set(this.split.minutes, 2)}:${set(this.split.seconds, 2)}.${
            set(
                this.split.milliseconds,
                this.option.millisecondDigit,
            )
        }`;

        this.display.timeCodeFrames = `${set(this.split.hours, 2)}:${set(this.split.minutes, 2)}:${set(this.split.seconds, 2)}:${
            set(
                this.split.frames,
                this.option.frameRateDigit,
            )
        }`;

        this.display.timeCodeSamplings = `${set(this.split.hours, 2)}:${set(this.split.minutes, 2)}:${set(this.split.seconds, 2)}:${
            set(
                this.split.samplings,
                this.option.samplingRateDigit,
            )
        }`;

        this.display.frames = String(Math.floor(this.total.frames));
        this.display.samplings = String(Math.floor(this.total.samplings));
    }

    copy(rec: multiTimeNotationType) {
        copyObjectProperties(this.option, rec.option);
        copyObjectProperties(this.total, rec.total);
        copyObjectProperties(this.split, rec.split);
        copyObjectProperties(this.display, rec.display);
    }

    difference(rec: multiTimeNotationType): multiTimeNotationType {
        const convertMilliseconds = (milliseconds: number) => (milliseconds / rec.option.millisecondPower) * this.option.millisecondPower;
        const convertFrames = (frames: number) => (frames / rec.option.frameRate) * this.option.frameRate;
        const convertSamplings = (samplings: number) => (samplings / rec.option.samplingRate) * this.option.samplingRate;

        const res = new MultiTimeNotation({
            option: {
                millisecondPower: this.option.millisecondPower,
                millisecondDigit: this.option.millisecondDigit,
                frameRate: this.option.frameRate,
                frameRateDigit: this.option.frameRateDigit,
                samplingRate: this.option.samplingRate,
                samplingRateDigit: this.option.samplingRateDigit,
            },
            total: {
                hours: this.total.hours - rec.total.hours,
                minutes: this.total.minutes - rec.total.minutes,
                seconds: this.total.seconds - rec.total.seconds,
                milliseconds: this.total.milliseconds - convertMilliseconds(rec.total.milliseconds),
                frames: this.total.frames - convertFrames(rec.total.frames),
                samplings: this.total.samplings - convertSamplings(rec.total.samplings),
            },
            split: {
                hours: this.split.hours - rec.split.hours,
                minutes: this.split.minutes - rec.split.minutes,
                seconds: this.split.seconds - rec.split.seconds,
                milliseconds: this.split.milliseconds - convertMilliseconds(rec.split.milliseconds),
                frames: this.split.frames - convertFrames(rec.split.frames),
                samplings: this.split.samplings - convertSamplings(rec.split.samplings),
            },
            display: {
                timeData: '',
                timeCodeFrames: '',
                timeCodeSamplings: '',
                frames: '',
                samplings: '',
            },
        });

        res.setDisplay();

        return res;
    }

    private getTimeData(timeData: string) {
        const rec = timeData.split(':');

        if (rec.length !== 3) return;

        rec.push(rec[2].split('.')[1]);

        rec[2] = rec[2].split('.')[0];

        const res: number[] = [];

        for (const i in rec) {
            const buf = Number(rec[i]);

            if (isNaN(buf)) return;

            res.push(buf);
        }

        return {
            hours: res[0],
            minutes: res[1],
            seconds: res[2],
            milliseconds: res[3],
        };
    }

    private getTimeCode(timeCode: string) {
        const rec = timeCode.split(':');

        if (rec.length !== 4) return;

        const res: number[] = [];

        for (const i in rec) {
            const buf = Number(rec[i]);

            if (isNaN(buf)) return;

            res.push(buf);
        }

        return {
            hours: res[0],
            minutes: res[1],
            seconds: res[2],
            decimal: res[3],
        };
    }

    subTimeData(timeData: string) {
        const res = this.getTimeData(timeData);

        if (!res) return this.return();

        this.split.hours = res.hours;
        this.split.minutes = res.minutes;
        this.split.seconds = res.seconds;
        this.setMillisecondsAndOthers(res.milliseconds);

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    subTimeCodeFrames(timeCode: string) {
        const res = this.getTimeCode(timeCode);

        if (!res) return this.return();

        this.split.hours = res.hours;
        this.split.minutes = res.minutes;
        this.split.seconds = res.seconds;
        this.setFramesAndOthers(res.decimal);

        this.normalize(2);
        this.setTotal(2);

        return this.return();
    }

    subTimeCodeSamplings(timeCode: string) {
        const res = this.getTimeCode(timeCode);

        if (!res) return this.return();

        this.split.hours = res.hours;
        this.split.minutes = res.minutes;
        this.split.seconds = res.seconds;
        this.setSamplingsAndOthers(res.decimal);

        this.normalize(3);
        this.setTotal(3);

        return this.return();
    }

    subHours(hours: number): multiTimeNotationType {
        this.reset();

        this.split.hours = hours;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    subMinutes(minutes: number): multiTimeNotationType {
        this.reset();

        this.split.minutes = minutes;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    subSeconds(seconds: number): multiTimeNotationType {
        this.reset();

        this.split.seconds = seconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    subMilliseconds(milliseconds: number): multiTimeNotationType {
        this.reset();

        this.split.milliseconds = milliseconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    subFrames(frames: number): multiTimeNotationType {
        this.reset();

        this.split.frames = frames;

        this.normalize(2);
        this.setTotal(2);

        return this.return();
    }

    subSamplings(samplings: number): multiTimeNotationType {
        this.reset();

        this.split.samplings = samplings;

        this.normalize(3);
        this.setTotal(3);

        return this.return();
    }

    setHours(hours: number): multiTimeNotationType {
        this.split.hours = hours;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    setMinutes(minutes: number): multiTimeNotationType {
        this.split.minutes = minutes;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    setSeconds(seconds: number): multiTimeNotationType {
        this.split.seconds = seconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    setMilliseconds(milliseconds: number): multiTimeNotationType {
        this.split.milliseconds = milliseconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    setFrames(frames: number): multiTimeNotationType {
        this.split.frames = frames;

        this.normalize(2);
        this.setTotal(2);

        return this.return();
    }

    setSamplings(samplings: number): multiTimeNotationType {
        this.split.samplings = samplings;

        this.normalize(3);
        this.setTotal(3);

        return this.return();
    }

    addTimeData(timeData: string) {
        const res = this.getTimeData(timeData);

        if (!res) return this.return();

        this.split.hours += res.hours;
        this.split.minutes += res.minutes;
        this.split.seconds += res.seconds;
        this.setMillisecondsAndOthers(this.split.milliseconds + res.milliseconds);

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    addTimeCodeFrames(timeCode: string) {
        const res = this.getTimeCode(timeCode);

        if (!res) return this.return();

        this.split.hours += res.hours;
        this.split.minutes += res.minutes;
        this.split.seconds += res.seconds;
        this.setFramesAndOthers(this.split.frames + res.decimal);

        this.normalize(2);
        this.setTotal(2);

        return this.return();
    }

    addTimeCodeSamplings(timeCode: string) {
        const res = this.getTimeCode(timeCode);

        if (!res) return this.return();

        this.split.hours += res.hours;
        this.split.minutes += res.minutes;
        this.split.seconds += res.seconds;
        this.setSamplingsAndOthers(this.split.samplings + res.decimal);

        this.normalize(3);
        this.setTotal(3);

        return this.return();
    }

    addHours(hours: number): multiTimeNotationType {
        this.split.hours += hours;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    addMinutes(minutes: number): multiTimeNotationType {
        this.split.minutes += minutes;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    addSeconds(seconds: number): multiTimeNotationType {
        this.split.seconds += seconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    addMilliseconds(milliseconds: number): multiTimeNotationType {
        this.split.milliseconds += milliseconds;

        this.normalize(1);
        this.setTotal(1);

        return this.return();
    }

    addFrames(frames: number): multiTimeNotationType {
        this.split.frames += frames;

        this.normalize(2);
        this.setTotal(2);

        return this.return();
    }

    addSamplings(samplings: number): multiTimeNotationType {
        this.split.samplings += samplings;

        this.normalize(3);
        this.setTotal(3);

        return this.return();
    }

    return(): multiTimeNotationType {
        return {
            option: {
                millisecondPower: this.option.millisecondPower,
                millisecondDigit: this.option.millisecondDigit,
                frameRate: this.option.frameRate,
                frameRateDigit: this.option.frameRateDigit,
                samplingRate: this.option.samplingRate,
                samplingRateDigit: this.option.samplingRateDigit,
            },
            total: {
                hours: this.total.hours,
                minutes: this.total.minutes,
                seconds: this.total.seconds,
                milliseconds: this.total.milliseconds,
                frames: this.total.frames,
                samplings: this.total.samplings,
            },
            split: {
                hours: this.split.hours,
                minutes: this.split.minutes,
                seconds: this.split.seconds,
                milliseconds: this.split.milliseconds,
                frames: this.split.frames,
                samplings: this.split.samplings,
            },
            display: {
                timeData: this.display.timeData,
                timeCodeFrames: this.display.timeCodeFrames,
                timeCodeSamplings: this.display.timeCodeSamplings,
                frames: this.display.frames,
                samplings: this.display.samplings,
            },
        };
    }
}
