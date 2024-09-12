import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';

@NgModule({
    declarations: [SearchPipe], //Pipes cannot be used as standalone units due to their integration into the Angular module engine
    exports: [SearchPipe],
})
export class PipesModule {}
