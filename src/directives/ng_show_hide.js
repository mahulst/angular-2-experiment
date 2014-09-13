import {DecoratorDirective} from 'templating';
import {Inject} from 'di';

export var ngHideClassName = 'ng-hide';

@DecoratorDirective({
    selector: '[ng-show]',
    bind: {
        'ngShow': 'ngShow'
    },
    observe: {
        'ngShow': 'ngShowChanged'
    }
})
@Inject(Node)
export class NgShow {
    constructor(element) {
        this.element = element;
    }

    ngShowChanged(value) {
        this.element.classList[!value ? 'add' : 'remove'](ngHideClassName);
    }
}

@DecoratorDirective({
    selector: '[ng-hide]',
    bind: {
        'ngHide': 'ngHide'
    },
    observe: {
        'ngHide': 'ngHideChanged'
    }
})
@Inject(Node)
export class NgHide {
    constructor(element) {
        this.element = element;
    }

    ngHideChanged(value) {
        this.element.classList[!!value ? 'add' : 'remove'](ngHideClassName);
    }
}