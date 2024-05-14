import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SecondaryNavigationComponent } from './secondary-navigation.component'

describe('SecondaryNavigationComponent', () => {
    let component: SecondaryNavigationComponent
    let fixture: ComponentFixture<SecondaryNavigationComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SecondaryNavigationComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(SecondaryNavigationComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
