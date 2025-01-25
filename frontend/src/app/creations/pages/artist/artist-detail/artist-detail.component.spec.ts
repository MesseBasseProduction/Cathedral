import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtistDetailComponent } from './artist-detail.component'

describe('ArtistDetailComponent', () => {
    let component: ArtistDetailComponent
    let fixture: ComponentFixture<ArtistDetailComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArtistDetailComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ArtistDetailComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
