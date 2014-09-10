import {TemplateDirective, BoundViewFactory, ViewPort, AttachAware} from 'templating';
import {Inject} from 'di';

@Inject
class TitleBar {
    constructor() {
        this.viewFactories = [];
    }

    addViewFactory(viewFactory) {
        this.viewFactories.push(viewFactory);
    }

    removeViewFactory(viewFactory) {
        var index = this.viewFactories.indexOf(viewFactory);
        if (index > -1) {
            this.viewFactories.splice(index, 1);
        }
    }
}

@TemplateDirective({selector: 'title-bar-content'})
@Inject(TitleBar, BoundViewFactory)
@AttachAware
export class TitleBarContent {
    constructor(titleBar, viewFactory) {
        this.titleBar = titleBar;
        this.viewFactory = viewFactory;
    }

    diAttached() {
        this.titleBar.addViewFactory(this.viewFactory);
    }

    diDetached() {
        this.titleBar.removeViewFactory(this.viewFactory);
    }
}

@TemplateDirective({selector: 'title-bar-transclude'})
@Inject(ViewPort, BoundViewFactory, TitleBar)
export class TitleBarTransclude {
    constructor(viewPort, viewFactory, titleBar) {
        this.viewPort = viewPort;
        this.viewFactory = viewFactory;
        this.titleBar = titleBar;
        Object.observe(this.titleBar.viewFactories, () => {
            this.viewFactoriesChanged();
        });
    }

    viewFactoriesChanged() {
        if (this.attachedView) {
            this.attachedView.remove();
        }
        this.attachedViewFactory = this.titleBar.viewFactories[this.titleBar.viewFactories.length - 1];
        this.attachedViewFactory.viewPort = this.viewPort;
        this.attachedView = this.attachedViewFactory.createView();
        this.attachedView.appendTo(this.viewPort);
    }
}