import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'app-informacion',
    templateUrl: './informacion.component.html'
})
export class InformacionComponent implements OnInit{
    
    constructor(
        private router: Router
    ){
        router.events.subscribe(s => {
            if(s instanceof NavigationEnd) {
                const tree = router.parseUrl(router.url);
                if(tree.fragment) {
                    
                    const element = document.querySelector("#" + tree.fragment);
                    let position = element!.getBoundingClientRect();
                    if(element) {
                        // element.scrollIntoView({block: "nearest",behavior: "smooth"});
                        window.scrollTo({top: position.top + window.scrollY - 115, behavior: "smooth"})
                    }
                }
            }
        })
    }
    ngOnInit(): void {
        window.scroll(0,0);
    }
}