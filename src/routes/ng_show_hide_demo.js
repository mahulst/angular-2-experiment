import {ComponentDirective} from 'templating';
import {Inject} from 'di';

@ComponentDirective({selector: 'ng-show-hide-demo'})
export class Detail {
    constructor() {
        this.isShownA = false;
        this.isShownB = false;
    }

    toggleA() {
        this.isShownA = !this.isShownA;
    }

    toggleB() {
        this.isShownB = !this.isShownB;
    }
}