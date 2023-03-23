import {ComponentFixture, TestBed} from '@angular/core/testing';
import { FileUploaderComponent } from './file-uploader.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CourseService} from "../services/course.service";
import {MockProvider} from "ng-mocks";


describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploaderComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [ MockProvider(CourseService) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the required form elements', () => {
    const fileInput = element.querySelector('input[type=file]');
    const dateInputs = element.querySelectorAll('input[type=date]');

    expect(fileInput).toBeDefined();
    expect(dateInputs.length).toEqual(2);
  });

  it('should initially disable the submit button', () => {
    const button = element.querySelector('button');

    expect(button).toBeDefined();
    expect(button!.disabled).toBeTrue();
  });

  it('should call onSubmit when the button is clicked', () => {
    const button = element.querySelector('button')!;
    spyOn(component, 'onSubmit');

    button.disabled = false;
    button.click()

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
});
