import {ComponentDirective} from 'templating';
import {Inject} from 'di';
import {items} from 'services';

@ComponentDirective({selector: 'overview'})
@Inject(items)
export class Overview {
    constructor(items) {
        this.items = items;
    }
}