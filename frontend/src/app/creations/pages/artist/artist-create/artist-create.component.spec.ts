import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtistCreateComponent } from './create.component'

describe('CreateComponent', () => {
    let component: ArtistCreateComponent
    let fixture: ComponentFixture<ArtistCreateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArtistCreateComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ArtistCreateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
