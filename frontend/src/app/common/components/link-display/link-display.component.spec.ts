import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LinkDisplayComponent } from './link-display.component'

describe('LinkDisplayComponent', () => {
    let component: LinkDisplayComponent
    let fixture: ComponentFixture<LinkDisplayComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LinkDisplayComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(LinkDisplayComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
