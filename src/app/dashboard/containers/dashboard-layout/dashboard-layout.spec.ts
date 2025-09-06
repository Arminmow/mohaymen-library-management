import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLayout } from './dashboard-layout';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { RouterModule, provideRouter } from '@angular/router';
import { UserOutline, BookOutline } from '@ant-design/icons-angular/icons';

describe('DashboardLayout', () => {
  let component: DashboardLayout;
  let fixture: ComponentFixture<DashboardLayout>;
  let iconService: NzIconService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLayout],
      imports: [
        RouterModule.forRoot([]),
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
      ],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayout);
    component = fixture.componentInstance;


    iconService = TestBed.inject(NzIconService);
    iconService.addIcon(UserOutline, BookOutline);

    fixture.detectChanges();
  });

  it('should create the DashboardLayout component', () => {
    expect(component).toBeTruthy();
  });
});
