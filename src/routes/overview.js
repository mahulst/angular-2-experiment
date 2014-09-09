import {ComponentDirective} from 'templating';

@ComponentDirective({selector: 'overview'})
export class Overview {
    constructor() {
        console.log('[routes/overview] instantiated');
    }
}