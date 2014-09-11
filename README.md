# Hands-On Angular 2

## Purpose

This repository is used for my "Hands-On Angular 2" workshop.

The master branch contains a minimal setup to help you get started with Angular quickly without having to install 
all the dependencies manually (there are a lot of them). 

Also included are some mockups that I created of a very simple mobile app with an overview and detail view, 
made using [Ratchet](http://goratchet.com/). This way you can focus on trying Angular instead of designing all sorts
of brilliant responsive grid systems :p.

All exercises are done in separate branches. The ones that provide useful solutions for future exercises are merged
into the master branch.


## Installation

1. `npm i`
2. `bower i`
3. `gulp watch`

Currently assuming that you run your own local server. Probably I'll add a gulp solution for it soon.


## Exercise ideas

You can create your own exercise during the workshop. If you need inspiration, here are a few ideas:

### Level 1, "Can I play, Daddy?", the easiest

- Build NgShow/NgHide (you can copy the code of the included Cloak directive to get started. basically you can rename 
  the class and create a binding to toggle it.)
- Build a directive for [Ratchet toggles](http://goratchet.com/components/#toggles)

### Level 2, "Bring 'em on!", the default

- Build NgEvents (NgClick, NgMouseenter, etc.)
- Build NgSwitch ([NgIf implementation](https://github.com/angular/templating/blob/master/src/lib/directive/ng_if.js) 
  can help you get started)
- Build directives for [Ratchet popovers](http://goratchet.com/components/#popovers)
- Build directives and/or router integration for [Ratchet modals](http://goratchet.com/components/#modals)

### Level 3, "I am Death incarnate!", the hardest

- Build NgModel 
  [Simple NgModel starting point](https://github.com/angular/templating/blob/master/src/example/ngmodel/ng-model.js)
- Build an Http service with interceptor API 
  [Simple Http starting point](https://github.com/angular/projects/blob/master/src/services/http.js)
- Improve the 
  [current implementation of NgRepeat](https://github.com/angular/templating/blob/master/src/lib/directive/ng_repeat.js) 
  with incremental view updating

(Level names taken from [Wolfenstein](https://www.youtube.com/watch?v=DnmkA8uX3Sw) :-) )