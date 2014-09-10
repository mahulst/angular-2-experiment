import {ComponentDirective} from 'templating';
import {Inject} from 'di';
import {itemExists, getItem} from 'services';

@ComponentDirective({selector: 'detail'})
@Inject(itemExists, getItem)
export class Detail {
    constructor(itemExists, getItem) {
        this.itemExists = itemExists;
        this.getItem = getItem;
    }

    activate(params) {
        if (params.id) {
            this.item = this.getItem(params.id);
        } else {
            this.item = {
                title: '',
                body: ''
            };
        }
    }

    canActivate(params) {
        return (params.id && this.itemExists(params.id)) || !params.id;
    }
}