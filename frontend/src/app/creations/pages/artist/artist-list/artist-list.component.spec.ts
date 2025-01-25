import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtistListComponent } from './list.component'

describe('ListComponent', () => {
    let component: ArtistListComponent
    let fixture: ComponentFixture<ArtistListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArtistListComponent],
        }).compileComponents()

        fixture = TestBed.createComponent(ArtistListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
