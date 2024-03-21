import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DescriptionInputComponent } from './description-input.component'

describe('DescriptionComponent', () => {
    let component: DescriptionInputComponent
    let fixture: ComponentFixture<DescriptionInputComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DescriptionInputComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(DescriptionInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
