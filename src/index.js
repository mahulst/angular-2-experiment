import {ComponentDirective} from 'templating';
import {AppRouter} from 'router';

@ComponentDirective
export class App {
    constructor(router:AppRouter) {
        this.router = router;
        this.router.configure(config => {
            config.title = document.title;

            config.map([
                { pattern: '', componentUrl: 'routes/overview', title: 'Overview' },
                { pattern: 'new', componentUrl: 'routes/detail', title: 'Create new item' },
                { pattern: 'edit/:id', componentUrl: 'routes/detail', title: 'Edit item' }
            ]);
        });
    }
}