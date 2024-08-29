import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionElementsDialogComponent } from './add-collection-elements-dialog.component';

describe('AddCollectionElementsDialogComponent', () => {
    let component: AddCollectionElementsDialogComponent;
    let fixture: ComponentFixture<AddCollectionElementsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddCollectionElementsDialogComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddCollectionElementsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
