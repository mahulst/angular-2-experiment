import {ComponentDirective} from 'templating';
import {Inject} from 'di';
import {contentList} from 'services';

@ComponentDirective({selector: 'overview'})
@Inject(contentList)
export class Overview {
    constructor(contentList) {
        this.list = contentList;
    }
}