import {DecoratorDirective} from 'templating';
import {Inject} from 'di';

@DecoratorDirective({selector: '.cloak'})
@Inject(Node)
export class Cloak {
    constructor(element) {
        element.classList.remove('cloak');
    }
}