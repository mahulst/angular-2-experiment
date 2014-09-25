import {ComponentDirective} from 'templating';
import {Inject} from 'di';
import {contentExists, contentItem} from 'services';

@ComponentDirective({selector: 'detail'})
@Inject(contentExists, contentItem)
export class Detail {
    constructor(contentExists, contentItem) {
        this.contentExists = contentExists;
        this.contentItem = contentItem;
    }

    activate(params) {
        if (params.id) {
            this.isNew = false;
            this.item = this.contentItem(params.id);
        } else {
            this.isNew = true;
            this.item = {
                title: '',
                body: ''
            };
        }
    }

    canActivate(params) {
        return (params.id && this.contentExists(params.id)) || !params.id;
    }
}