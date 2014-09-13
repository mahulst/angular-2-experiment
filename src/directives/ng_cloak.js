import {DecoratorDirective} from 'templating';
import {Inject} from 'di';

@DecoratorDirective({selector: '.ng-cloak'})
@Inject(Node)
export class NgCloak {
    constructor(element) {
        element.classList.remove('ng-cloak');
    }
}