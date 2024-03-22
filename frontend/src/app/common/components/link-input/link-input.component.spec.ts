import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LinkInputComponent } from './link-input.component'

describe('LinkComponent', () => {
    let component: LinkInputComponent
    let fixture: ComponentFixture<LinkInputComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LinkInputComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LinkInputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
